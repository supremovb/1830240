import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {(eyebrow || title) && (
        <div className="mx-auto mb-9 max-w-3xl text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-rosewood/70">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-4xl font-semibold text-rosewood sm:text-5xl">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
}
