import type { TimePeriod, ShopifyData } from "~/types/social-media";
import { generateComparisonTimeSeries, generateCustomerTimeSeries } from "./helpers";

export function getShopifyData(period: TimePeriod): ShopifyData {
  const multiplier = period === "7d" ? 0.25 : period === "30d" ? 1 : 3;

  return {
    // Total Sales
    totalSales: Math.round(49_241 * multiplier),
    totalSalesChange: 15,
    salesByChannel: [
      { channel: "Online Store", amount: Math.round(48_185 * multiplier), change: 34 },
      { channel: "Social Media", amount: Math.round(570 * multiplier), change: 79 },
      { channel: "Direkte Bestellungen", amount: Math.round(486 * multiplier), change: 12 },
    ],
    salesOverTime: generateComparisonTimeSeries(period, 1_640, 0.4, 0.03, 800),

    // Online Store Sessions
    sessions: Math.round(48_453 * multiplier),
    sessionsChange: 19,
    visitors: Math.round(43_791 * multiplier),
    visitorsChange: 18,
    sessionsOverTime: generateComparisonTimeSeries(period, 1_615, 0.35, 0.02, 810),

    // Returning Customer Rate
    returningCustomerRate: 10.3,
    returningCustomerRateChange: 30,
    customersOverTime: generateCustomerTimeSeries(period, 12, 4, 820),

    // Conversion
    conversionRate: 0.68,
    conversionRateChange: 40,
    conversionFunnel: [
      { label: "In den Warenkorb", sessions: Math.round(1_208 * multiplier), rate: 2.49, rateChange: 22 },
      { label: "Checkout erreicht", sessions: Math.round(608 * multiplier), rate: 1.25, rateChange: 17 },
      { label: "Kauf abgeschlossen", sessions: Math.round(329 * multiplier), rate: 0.68, rateChange: 40 },
    ],

    // Average Order Value
    avgOrderValue: 164.67,
    avgOrderValueChange: 171,
    avgOrderValueOverTime: generateComparisonTimeSeries(period, 165, 0.45, 0.01, 830),

    // Total Orders
    totalOrders: Math.round(370 * multiplier),
    totalOrdersChange: -49,
    ordersOverTime: generateComparisonTimeSeries(period, 12, 0.5, -0.01, 840),

    // Sessions by Device
    sessionsByDevice: [
      { device: "Desktop", percentage: 42 },
      { device: "Mobil", percentage: 51 },
      { device: "Tablet", percentage: 7 },
    ],

    // Top Products
    topProducts: [
      { id: "p1", title: "zzzlim Hoodie Classic Schwarz", revenue: 8_940, units: 149, avgPrice: 59.99, image: "" },
      { id: "p2", title: "zzzlim T-Shirt Logo Weiß", revenue: 7_470, units: 249, avgPrice: 29.99, image: "" },
      { id: "p3", title: "zzzlim Cap Snapback", revenue: 5_225, units: 209, avgPrice: 24.99, image: "" },
      { id: "p4", title: "zzzlim Poster A2 Limited", revenue: 3_580, units: 179, avgPrice: 19.99, image: "" },
      { id: "p5", title: "zzzlim Hoodie Oversized Grau", revenue: 4_800, units: 80, avgPrice: 64.99, image: "" },
      { id: "p6", title: "zzzlim Sticker-Pack (10er)", revenue: 2_490, units: 498, avgPrice: 4.99, image: "" },
      { id: "p7", title: "zzzlim Handy-Hülle iPhone", revenue: 2_095, units: 121, avgPrice: 17.99, image: "" },
      { id: "p8", title: "zzzlim Trinkflasche 750ml", revenue: 1_870, units: 74, avgPrice: 24.99, image: "" },
    ],

    // Recent Orders
    recentOrders: [
      { id: "o1", orderNumber: "#4892", total: 89.98, items: 2, status: "erfüllt", date: "2026-02-17" },
      { id: "o2", orderNumber: "#4891", total: 29.99, items: 1, status: "erfüllt", date: "2026-02-17" },
      { id: "o3", orderNumber: "#4890", total: 124.97, items: 3, status: "in Bearbeitung", date: "2026-02-16" },
      { id: "o4", orderNumber: "#4889", total: 59.99, items: 1, status: "erfüllt", date: "2026-02-16" },
      { id: "o5", orderNumber: "#4888", total: 44.98, items: 2, status: "erfüllt", date: "2026-02-16" },
      { id: "o6", orderNumber: "#4887", total: 17.99, items: 1, status: "ausstehend", date: "2026-02-15" },
      { id: "o7", orderNumber: "#4886", total: 154.96, items: 4, status: "erfüllt", date: "2026-02-15" },
      { id: "o8", orderNumber: "#4885", total: 29.99, items: 1, status: "storniert", date: "2026-02-15" },
      { id: "o9", orderNumber: "#4884", total: 84.98, items: 2, status: "erfüllt", date: "2026-02-14" },
      { id: "o10", orderNumber: "#4883", total: 64.99, items: 1, status: "erfüllt", date: "2026-02-14" },
    ],
  };
}
