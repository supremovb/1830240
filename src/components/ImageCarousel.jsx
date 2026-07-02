import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Section from "./Section";

export default function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const activeImage = images[activeIndex];
  const previous = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const next = () => setActiveIndex((index) => (index + 1) % images.length);
  const onTouchStart = (event) => {
    touchStartRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const onTouchEnd = (event) => {
    if (!touchStartRef.current) return;
    const deltaX = event.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = Math.abs(event.changedTouches[0].clientY - touchStartRef.current.y);
    if (Math.abs(deltaX) > 52 && deltaY < 70) {
      if (deltaX > 0) previous();
      else next();
    }
    touchStartRef.current = null;
  };
  const fullscreen = async () => {
    const element = document.getElementById("carousel-photo-frame");
    if (element?.requestFullscreen) {
      await element.requestFullscreen();
    }
  };

  return (
    <Section eyebrow="Slideshow" title="Soft moments on repeat">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/60 p-3 shadow-glow backdrop-blur">
        <div
          id="carousel-photo-frame"
          className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[2rem] bg-black sm:aspect-[16/9]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.25, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-rosewood/55 via-rosewood/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-white">
            <div>
              <p className="font-display text-3xl font-semibold">Memory {activeIndex + 1}</p>
              <p className="text-sm text-white/85">A gentle fade, like a song changing verses.</p>
            </div>
            <div className="hidden rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur sm:block">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={fullscreen}
          aria-label="Fullscreen slideshow photo"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/78 text-rosewood shadow-gold backdrop-blur transition hover:bg-white"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={previous}
          aria-label="Previous image"
          className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/78 text-rosewood shadow-gold backdrop-blur transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/78 text-rosewood shadow-gold backdrop-blur transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Section>
  );
}
