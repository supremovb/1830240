import { useMemo } from "react";
import { CalendarHeart, Shuffle } from "lucide-react";
import Section from "./Section";

export default function TodayMemory({ images, onShuffle, shuffleCount }) {
  const memory = useMemo(() => {
    const dateSeed = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const index = (Number(dateSeed) + shuffleCount * 17) % images.length;
    return { ...images[index], number: index + 1 };
  }, [images, shuffleCount]);

  return (
    <Section eyebrow="Today's Memory" title="One photo for this moment">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 shadow-glow backdrop-blur lg:grid-cols-[0.95fr_1fr]">
        <div className="relative min-h-[28rem]">
          <img src={memory.src} alt={memory.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rosewood/55 via-transparent to-white/10" />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rosewood">
            <CalendarHeart className="h-7 w-7" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosewood/55">
            Highlighted memory {memory.number}
          </p>
          <h3 className="mt-3 font-display text-5xl font-semibold leading-none text-rosewood">
            A little piece of us, chosen for today.
          </h3>
          <p className="mt-5 leading-8 text-rosewood/70">
            Tap shuffle when you want the page to surprise you with another memory from our collection.
          </p>
          <button
            type="button"
            onClick={onShuffle}
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-rosewood px-6 py-3 font-semibold text-white shadow-gold transition hover:-translate-y-0.5"
          >
            <Shuffle className="h-5 w-5" />
            Random Memory Shuffle
          </button>
        </div>
      </div>
    </Section>
  );
}
