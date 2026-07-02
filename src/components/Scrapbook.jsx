import { motion } from "framer-motion";
import Section from "./Section";

export default function Scrapbook({ images }) {
  const picks = [images[4], images[11], images[20], images[31], images[43]].filter(Boolean);

  return (
    <Section eyebrow="Scrapbook" title="Pages from our little forever">
      <div className="relative mx-auto min-h-[38rem] max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-[#fffaf3]/80 p-6 shadow-glow backdrop-blur sm:p-10">
        <div className="absolute inset-y-8 left-1/2 hidden w-px bg-rose-200 lg:block" />
        {picks.map((image, index) => (
          <motion.figure
            key={image.src}
            className={`scrapbook-photo absolute w-[46%] max-w-[20rem] rounded-2xl bg-white p-3 shadow-gold ${
              index === 0
                ? "left-6 top-10 rotate-[-5deg]"
                : index === 1
                  ? "right-8 top-16 rotate-[4deg]"
                  : index === 2
                    ? "left-[28%] top-[36%] rotate-[2deg]"
                    : index === 3
                      ? "bottom-10 left-10 rotate-[5deg]"
                      : "bottom-12 right-10 rotate-[-4deg]"
            }`}
            initial={{ opacity: 0, y: 35, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
          >
            <img src={image.src} alt={image.alt} className="aspect-[4/5] w-full rounded-xl object-cover" />
          </motion.figure>
        ))}
        <div className="relative z-20 mx-auto mt-48 max-w-md rounded-3xl bg-white/75 p-6 text-center shadow-gold backdrop-blur sm:mt-56 lg:mt-64">
          <p className="font-display text-3xl font-semibold text-rosewood">
            Some memories feel like they were made to be kept between pages.
          </p>
        </div>
      </div>
    </Section>
  );
}
