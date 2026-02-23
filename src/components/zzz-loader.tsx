import { motion } from "framer-motion";

export function ZzzLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative flex items-end gap-0.5">
        {/* Sleeping face */}
        <div className="text-muted-foreground/40 text-4xl font-display select-none">
          &#x1F4A4;
        </div>
        {/* Z letters floating up */}
        {["z", "Z", "Z"].map((letter, i) => (
          <motion.span
            key={i}
            className="font-display font-bold text-primary"
            style={{ fontSize: `${1.2 + i * 0.6}rem` }}
            initial={{ opacity: 0, y: 8, x: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [8, -4 - i * 12, -12 - i * 16, -20 - i * 20],
              x: [0, 4 + i * 3, 8 + i * 5, 12 + i * 6],
              rotate: [0, -5 - i * 3, 5 + i * 2, -3],
            }}
            transition={{
              duration: 2.2,
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
