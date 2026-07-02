import { motion } from "framer-motion";
import Section from "./Section";

const milestones = [
  {
    date: "December 3, 2022",
    title: "The beginning",
    text: "A Saturday that quietly became the first page of our favorite story.",
  },
  {
    date: "2023",
    title: "First full year",
    text: "New routines, little adventures, deeper trust, and a love that kept finding new ways to grow.",
  },
  {
    date: "2024",
    title: "More memories",
    text: "Photos, dates, ordinary days, and private jokes became a collection only we understand.",
  },
  {
    date: "2025",
    title: "Still us",
    text: "Another year of choosing each other through every season and every change.",
  },
  {
    date: "July 2, 2026",
    title: "1,271 days together",
    text: "3 years, 6 months, and 29 days of love, patience, laughter, and becoming home.",
  },
];

export default function Timeline() {
  return (
    <Section eyebrow="Since day one" title="Our timeline">
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-rose-200 via-champagne to-rose-200 sm:left-1/2" />
        <div className="space-y-8">
          {milestones.map((item, index) => (
            <motion.article
              key={item.date}
              className={`relative grid gap-5 sm:grid-cols-2 ${index % 2 ? "" : "sm:[&>div]:col-start-2"}`}
              initial={{ opacity: 0, x: index % 2 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <span className="absolute left-[0.55rem] top-7 h-4 w-4 rounded-full border-4 border-cream bg-rose-400 shadow-[0_0_0_8px_rgba(251,207,232,0.5)] sm:left-[calc(50%-0.5rem)]" />
              <div className="ml-10 rounded-3xl border border-white/80 bg-white/70 p-6 shadow-gold backdrop-blur sm:ml-0">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rosewood/55">{item.date}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-rosewood">{item.title}</h3>
                <p className="mt-3 leading-7 text-rosewood/70">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
