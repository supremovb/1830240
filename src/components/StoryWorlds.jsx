import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Section from "./Section";
import { Final3DScene } from "./ThreeMagic";

const jarNotes = [
  "Your laugh makes the whole day softer.",
  "You make ordinary places feel like home.",
  "You are patient with my heart.",
  "You make love feel gentle and real.",
  "You are my favorite part of every season.",
  "You turn little moments into memories.",
];

const heartStars = Array.from({ length: 42 }, (_, index) => {
  const t = (index / 42) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3;
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { id: index, left: 50 + x * 2.1, top: 48 + y * 2.15, delay: index * 0.04 };
});

export function DreamySky() {
  return (
    <Section eyebrow="Moonlight" title="A sky that feels like us">
      <div className="dreamy-sky relative mx-auto min-h-[32rem] max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/70 shadow-glow">
        <div className="moon" />
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        {Array.from({ length: 40 }, (_, index) => (
          <span
            key={index}
            className="sky-star"
            style={{
              left: `${(index * 23) % 100}%`,
              top: `${8 + ((index * 19) % 72)}%`,
              animationDelay: `${index * 0.12}s`,
            }}
          />
        ))}
        <div className="absolute bottom-8 left-8 right-8 max-w-lg text-white">
          <p className="font-display text-5xl font-semibold">Our quiet universe</p>
          <p className="mt-3 text-white/75">Soft clouds, candlelight, and the kind of peace that feels like being beside you.</p>
        </div>
      </div>
    </Section>
  );
}

export function HeartCollage({ images }) {
  const picks = images.slice(0, 18);

  return (
    <Section eyebrow="Collage" title="A heart made of memories">
      <div className="heart-collage mx-auto max-w-5xl">
        {picks.map((image, index) => (
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="heart-collage-photo"
            initial={{ opacity: 0, scale: 0.84 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08, zIndex: 10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.025 }}
          />
        ))}
      </div>
    </Section>
  );
}

export function OurUniverse() {
  return (
    <Section eyebrow="Our Universe" title="Stars forming a heart">
      <div className="universe-panel relative mx-auto min-h-[34rem] max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/70 shadow-glow">
        {heartStars.map((star) => (
          <span
            key={star.id}
            className="heart-star"
            style={{ left: `${star.left}%`, top: `${star.top}%`, animationDelay: `${star.delay}s` }}
          />
        ))}
        <div className="absolute inset-x-6 bottom-8 text-center text-white">
          <p className="font-display text-5xl font-semibold">Every star still points me back to you.</p>
        </div>
      </div>
    </Section>
  );
}

export function FilmReel({ images }) {
  return (
    <Section eyebrow="Memory Film Reel" title="Our favorite frames">
      <div className="film-reel mx-auto flex max-w-6xl gap-4 overflow-hidden rounded-[2rem] border border-champagne/70 bg-rosewood p-4 shadow-glow">
        {[...images.slice(18, 32), ...images.slice(18, 26)].map((image, index) => (
          <figure key={`${image.src}-${index}`} className="film-frame shrink-0">
            <img src={image.src} alt={image.alt} className="h-48 w-36 rounded-xl object-cover sm:h-64 sm:w-48" />
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function LoveJar() {
  return (
    <Section eyebrow="Love Jar" title="Reasons I love you">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="love-jar relative mx-auto h-[28rem] w-full max-w-sm">
          {jarNotes.map((note, index) => (
            <span key={note} className={`jar-note jar-note-${index + 1}`}>
              ♥
            </span>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {jarNotes.map((note, index) => (
            <motion.div
              key={note}
              className="glass-love-card rounded-3xl border border-champagne/60 p-5 shadow-gold"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Sparkles className="mb-4 h-5 w-5 text-champagne" />
              <p className="font-display text-2xl font-semibold text-rosewood">{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function TornLoveLetter() {
  return (
    <Section eyebrow="Envelope" title="A letter sealed with love">
      <div className="torn-paper mx-auto max-w-4xl p-8 text-center shadow-glow sm:p-12">
        <div className="wax-seal mx-auto mb-8">
          <Heart className="h-8 w-8 fill-white text-white" />
        </div>
        <p className="font-display text-4xl font-semibold leading-relaxed text-rosewood sm:text-5xl">
          If this page could hold every feeling, it would still need more room for how much I love you.
        </p>
      </div>
    </Section>
  );
}

export function ForeverScene() {
  return (
    <section className="forever-scene relative min-h-screen overflow-hidden px-5 py-24 text-center text-white">
      <Final3DScene />
      <div className="bloom-heart">♥</div>
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-champagne">Our Forever</p>
        <h2 className="font-display text-6xl font-semibold leading-none sm:text-8xl">
          I will always choose you, in every lifetime.
        </h2>
      </div>
    </section>
  );
}
