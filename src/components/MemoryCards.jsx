import { Camera, Flower2, MessageCircleHeart, Stars } from "lucide-react";
import Section from "./Section";

const memories = [
  {
    icon: Flower2,
    title: "The first day",
    text: "December 3, 2022, a Saturday that turned into the start of everything.",
  },
  {
    icon: Camera,
    title: "The photos",
    text: "Thirty-four pieces of us, saved like pressed flowers inside this page.",
  },
  {
    icon: MessageCircleHeart,
    title: "The little things",
    text: "The talks, smiles, check-ins, and quiet moments that made love feel steady.",
  },
  {
    icon: Stars,
    title: "The promise",
    text: "To keep growing together, gently and honestly, one beautiful day at a time.",
  },
];

export default function MemoryCards() {
  return (
    <Section eyebrow="Keepsakes" title="What I treasure">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {memories.map(({ icon: Icon, title, text }) => (
          <article key={title} className="flip-card min-h-[18rem]">
            <div className="flip-card-inner">
              <div className="flip-card-face rounded-[2rem] border border-white/80 bg-white/68 p-7 shadow-gold backdrop-blur">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rosewood">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl font-semibold text-rosewood">{title}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-rosewood/45">Hover or tap</p>
              </div>
              <div className="flip-card-face flip-card-back rounded-[2rem] border border-champagne/70 bg-rosewood p-7 text-white shadow-gold">
                <p className="font-display text-3xl font-semibold">{title}</p>
                <p className="mt-4 leading-7 text-white/78">{text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
