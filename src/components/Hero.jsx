import { CalendarHeart, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Hero3DAccent } from "./ThreeMagic";

export default function Hero({ heroImage }) {
  return (
    <section className="relative mx-auto grid min-h-[92vh] w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-20 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 text-sm font-semibold text-rosewood shadow-gold backdrop-blur">
          <CalendarHeart className="h-4 w-4 text-rose-500" />
          December 3, 2022
        </div>
        <h1 className="max-w-3xl font-display text-6xl font-semibold leading-[0.95] text-rosewood sm:text-7xl lg:text-8xl">
          Our Beautiful Monthsary
        </h1>
        <Hero3DAccent />
        <p className="mt-6 max-w-2xl text-lg leading-8 text-rosewood/75 sm:text-xl">
          A little garden of memories for the love that began on a Saturday, the 337th day of 2022.
        </p>

        <div className="mt-9 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
          <motion.div
            className="rounded-[2rem] border border-white/75 bg-white/70 px-7 py-6 shadow-glow backdrop-blur"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosewood/55">
              Forever counting
            </p>
            <p className="mt-2 font-display text-5xl font-bold text-rosewood sm:text-6xl">
              1,271
            </p>
            <p className="text-xl font-semibold text-rose-500">Days Together</p>
          </motion.div>
          <div className="flex items-center justify-center gap-3 rounded-[2rem] border border-white/70 bg-rosewood px-6 py-5 text-white shadow-glow sm:flex-col">
            <Heart className="h-8 w-8 fill-petal text-petal" />
            <span className="text-center font-display text-2xl leading-tight">3 years, 6 months, 29 days</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[34rem]"
      >
        <div className="absolute inset-x-7 top-10 h-[32rem] rotate-3 rounded-[3rem] bg-champagne/60 blur-sm" />
        <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/80 bg-white/55 p-3 shadow-glow backdrop-blur">
          <img
            src={heroImage}
            alt="A treasured memory together"
            className="h-full w-full rounded-[2.4rem] object-cover"
          />
          <div className="absolute inset-3 rounded-[2.4rem] bg-gradient-to-t from-rosewood/45 via-transparent to-white/10" />
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="font-display text-3xl font-semibold">Still choosing you</p>
              <p className="text-sm text-white/85">Every day, every hour, every minute.</p>
            </div>
            <Sparkles className="h-8 w-8 text-champagne" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
