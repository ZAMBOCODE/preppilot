import { useState, useCallback, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatCompactNumber } from "~/lib/mock-data/helpers";
import { IconPlus, IconMinus, IconFocus2 } from "@tabler/icons-react";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric → code mapping for DACH highlight
const DACH_NUMERIC = new Set(["276", "040", "756"]); // DE, AT, CH

// City coordinates [lon, lat]
const CITY_COORDS: Record<string, [number, number]> = {
  Berlin: [13.405, 52.52],
  Hamburg: [9.993, 53.551],
  Munich: [11.576, 48.137],
  Cologne: [6.96, 50.938],
  Frankfurt: [8.682, 50.111],
  Düsseldorf: [6.773, 51.228],
  Stuttgart: [9.183, 48.776],
  Vienna: [16.373, 48.209],
  Zurich: [8.541, 47.377],
  London: [-0.118, 51.509],
};

const DEFAULT_CENTER: [number, number] = [10.5, 51];
const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 4;

interface ViewsByLocationProps {
  countries: {
    country: string;
    code: string;
    views: number;
    percentage: number;
  }[];
  cities: {
    city: string;
    country: string;
    views: number;
    percentage: number;
  }[];
  accentColor?: string;
}

export function ViewsByLocation({
  countries,
  cities,
  accentColor = "#851330",
}: ViewsByLocationProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);

  const maxViews = useMemo(
    () => Math.max(...countries.map((c) => c.views)),
    [countries],
  );
  const maxCityViews = useMemo(
    () => Math.max(...cities.map((c) => c.views)),
    [cities],
  );

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z * 1.4, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z / 1.4, MIN_ZOOM));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
    setCenter(DEFAULT_CENTER);
  }, []);

  const handleMoveEnd = useCallback(
    (position: { coordinates: [number, number]; zoom: number }) => {
      setCenter(position.coordinates);
      setZoom(position.zoom);
    },
    [],
  );

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
      {/* Map — Germany / DACH focused */}
      <Card className="border-0 bg-secondary/50 shadow-none xl:col-span-3">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading text-base font-semibold">
                Views nach Standort
              </CardTitle>
              <p className="text-muted-foreground text-xs">
                Top-Städte nach Aufrufen · DACH-Region
              </p>
            </div>
            {/* Zoom controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleZoomOut}
                className="flex size-7 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Herauszoomen"
              >
                <IconMinus className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex size-7 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Zurücksetzen"
              >
                <IconFocus2 className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="flex size-7 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Hineinzoomen"
              >
                <IconPlus className="size-3.5" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <div className="map-container relative h-[420px] w-full overflow-hidden rounded-b-xl">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: [10.5, 51], scale: 2800 }}
              width={600}
              height={420}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                center={center}
                zoom={zoom}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                onMoveEnd={handleMoveEnd}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isDACH = DACH_NUMERIC.has(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: isDACH
                                ? `color-mix(in oklch, ${accentColor} 12%, oklch(0.92 0 0))`
                                : "oklch(0.92 0.005 60)",
                              stroke: isDACH
                                ? `color-mix(in oklch, ${accentColor} 30%, oklch(0.8 0 0))`
                                : "oklch(0.82 0.005 60)",
                              strokeWidth: isDACH ? 0.6 : 0.3,
                              outline: "none",
                            },
                            hover: {
                              fill: isDACH
                                ? `color-mix(in oklch, ${accentColor} 20%, oklch(0.88 0 0))`
                                : "oklch(0.88 0.008 60)",
                              stroke: "oklch(0.7 0.01 60)",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* City markers — largest first for z-ordering */}
                {cities
                  .filter((c) => CITY_COORDS[c.city])
                  .sort((a, b) => b.views - a.views)
                  .map((city) => {
                    const coords = CITY_COORDS[city.city];
                    if (!coords) return null;
                    const ratio = city.views / maxCityViews;
                    const r = 3 + ratio * 12;
                    return (
                      <Marker key={city.city} coordinates={coords}>
                        {/* Outer glow */}
                        <circle
                          r={r + 5}
                          style={{
                            fill: accentColor,
                            fillOpacity: 0.06,
                          }}
                        />
                        {/* Pulse ring */}
                        <circle
                          r={r + 2}
                          style={{
                            fill: "none",
                            stroke: accentColor,
                            strokeWidth: 0.8,
                            strokeOpacity: 0.25,
                          }}
                        />
                        {/* Main bubble */}
                        <circle
                          r={r}
                          style={{
                            fill: accentColor,
                            fillOpacity: 0.2 + ratio * 0.45,
                            stroke: accentColor,
                            strokeWidth: 1.5,
                            strokeOpacity: 0.85,
                          }}
                        />
                        {/* Center dot */}
                        <circle
                          r={1.8}
                          style={{
                            fill: accentColor,
                            fillOpacity: 0.95,
                          }}
                        />
                        {/* City label */}
                        <text
                          textAnchor="middle"
                          y={-r - 5}
                          style={{
                            fontSize: ratio > 0.6 ? "7px" : "6px",
                            fontWeight: 700,
                            fontFamily: "var(--font-heading, sans-serif)",
                            fill: "oklch(0.2 0.02 45)",
                            paintOrder: "stroke",
                            stroke: "oklch(1 0 0)",
                            strokeWidth: 2.5,
                            strokeLinejoin: "round",
                          }}
                        >
                          {city.city}
                        </text>
                        {/* View count under label */}
                        {ratio > 0.4 && (
                          <text
                            textAnchor="middle"
                            y={-r - 5 + 8}
                            style={{
                              fontSize: "5px",
                              fontWeight: 600,
                              fill: accentColor,
                              paintOrder: "stroke",
                              stroke: "oklch(1 0 0)",
                              strokeWidth: 2,
                              strokeLinejoin: "round",
                            }}
                          >
                            {formatCompactNumber(city.views)}
                          </text>
                        )}
                      </Marker>
                    );
                  })}
              </ZoomableGroup>
            </ComposableMap>

            {/* Zoom indicator */}
            <div className="absolute bottom-2 left-3 rounded bg-background/80 px-1.5 py-0.5 text-[10px] text-muted-foreground backdrop-blur-sm">
              {Math.round(zoom * 100)}%
            </div>
          </div>

          {/* Inline legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 pt-2 text-[11px]">
            <span className="text-muted-foreground">
              Scrollen zum Zoomen · Ziehen zum Bewegen
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Right side — Countries + Cities */}
      <div className="space-y-6 xl:col-span-2">
        {/* Top Countries */}
        <Card className="border-0 bg-secondary/50 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-base font-semibold">
              Top Länder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {countries.slice(0, 6).map((c, i) => (
                <div key={c.code}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground w-4 text-right text-xs tabular-nums">
                        {i + 1}
                      </span>
                      <span className="font-medium">{c.country}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-muted-foreground text-xs tabular-nums">
                        {formatCompactNumber(c.views)}
                      </span>
                      <span
                        className="rounded-sm px-1 py-0.5 text-[10px] font-semibold tabular-nums"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${accentColor} 15%, transparent)`,
                          color: accentColor,
                        }}
                      >
                        {c.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(c.views / maxViews) * 100}%`,
                        backgroundColor: accentColor,
                        opacity: 0.5 + (c.views / maxViews) * 0.4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card className="border-0 bg-secondary/50 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-base font-semibold">
              Top Städte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {cities.slice(0, 8).map((city, i) => {
                const ratio = city.views / maxCityViews;
                return (
                  <div
                    key={city.city}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/60"
                  >
                    <span className="text-muted-foreground w-4 text-right text-xs tabular-nums">
                      {i + 1}
                    </span>
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: accentColor,
                        opacity: 0.35 + ratio * 0.65,
                      }}
                    />
                    <div className="flex flex-1 items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-1 truncate">
                        <span className="text-sm font-medium">{city.city}</span>
                        <span className="text-muted-foreground text-[10px]">
                          {city.country}
                        </span>
                      </div>
                      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {formatCompactNumber(city.views)} ·{" "}
                        {city.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dark-mode override for SVG text */}
      <style>{`
        .dark .map-container text {
          fill: oklch(0.92 0.005 60) !important;
          stroke: oklch(0.17 0.012 45) !important;
        }
      `}</style>
    </div>
  );
}
