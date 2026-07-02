import { motion } from "framer-motion";

const petals = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 9) * 0.9,
  duration: 9 + (index % 7),
  drift: `${index % 2 === 0 ? 60 + index * 2 : -70 - index * 2}px`,
  size: 10 + (index % 5) * 4,
}));

const lights = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${(index * 19) % 100}%`,
  top: `${10 + ((index * 23) % 78)}%`,
  delay: index * 0.35,
}));

const butterflies = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  top: `${14 + index * 14}%`,
  delay: index * 4.2,
}));

const fireflies = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 31) % 100}%`,
  top: `${35 + ((index * 13) % 58)}%`,
  delay: index * 0.28,
}));

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,205,218,0.9),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(244,209,136,0.46),transparent_38%),linear-gradient(135deg,#fff8ef_0%,#ffeaf0_48%,#fffdf8_100%)]" />
      <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />
      <div className="rose-garden absolute inset-x-0 bottom-0 h-48 opacity-70" />
      <div className="candle-glow absolute bottom-10 left-[12%] h-24 w-24 rounded-full bg-champagne/30 blur-2xl" />
      <div className="candle-glow absolute bottom-16 right-[14%] h-28 w-28 rounded-full bg-petal/25 blur-2xl" />

      {lights.map((light) => (
        <motion.span
          key={light.id}
          className="absolute h-2 w-2 rounded-full bg-champagne shadow-[0_0_24px_rgba(244,209,136,0.95)]"
          style={{ left: light.left, top: light.top }}
          animate={{ opacity: [0.15, 0.85, 0.2], scale: [0.8, 1.45, 0.9] }}
          transition={{ duration: 3.8, delay: light.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal absolute top-0 rounded-[100%_0_100%_0] bg-gradient-to-br from-white via-petal to-rose-300"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.35,
            "--drift": petal.drift,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}

      {fireflies.map((firefly) => (
        <span
          key={firefly.id}
          className="firefly absolute h-1.5 w-1.5 rounded-full bg-champagne"
          style={{ left: firefly.left, top: firefly.top, animationDelay: `${firefly.delay}s` }}
        />
      ))}

      {butterflies.map((butterfly) => (
        <span
          key={butterfly.id}
          className="butterfly absolute text-2xl text-rose-300/70"
          style={{ top: butterfly.top, animationDelay: `${butterfly.delay}s` }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
