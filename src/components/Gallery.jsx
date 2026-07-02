import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Maximize2, X } from "lucide-react";
import Section from "./Section";

const categories = ["Favorite Moments", "Sweet Memories", "Funny Moments", "Forever Us"];

const distance = (touches) => {
  if (touches.length < 2) return 0;
  const [a, b] = touches;
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
};

export default function Gallery({ images }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [favoriteBursts, setFavoriteBursts] = useState([]);
  const [captionImage, setCaptionImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const touchStartRef = useRef(null);
  const lastTapRef = useRef(0);
  const longPressRef = useRef(null);
  const pinchRef = useRef({ distance: 0, zoom: 1 });

  const categorizedImages = useMemo(
    () =>
      categories.reduce((acc, category, categoryIndex) => {
        acc[category] = images.filter((_, imageIndex) => imageIndex % categories.length === categoryIndex);
        return acc;
      }, {}),
    [images],
  );

  const visibleImages = categorizedImages[activeCategory] || images;
  const selectedImage = selectedIndex === null ? null : visibleImages[selectedIndex];

  const openImage = (index) => {
    setSelectedIndex(index);
    setZoom(1);
  };

  const closeImage = () => {
    setSelectedIndex(null);
    setZoom(1);
  };

  const showPrevious = () => {
    setSelectedIndex((index) => (index === null ? 0 : (index - 1 + visibleImages.length) % visibleImages.length));
    setZoom(1);
  };

  const showNext = () => {
    setSelectedIndex((index) => (index === null ? 0 : (index + 1) % visibleImages.length));
    setZoom(1);
  };

  const fullscreenSelected = async () => {
    const element = document.getElementById("fullscreen-memory");
    if (element?.requestFullscreen) {
      await element.requestFullscreen();
    }
  };

  const createFavoriteBurst = (x, y, image) => {
    const burst = { id: `${Date.now()}-${Math.random()}`, x, y, image };
    setFavoriteBursts((items) => [...items.slice(-3), burst]);
    window.setTimeout(() => setFavoriteBursts((items) => items.filter((item) => item.id !== burst.id)), 950);
  };

  const handlePhotoPointerDown = (event, image) => {
    longPressRef.current = window.setTimeout(() => setCaptionImage(image), 520);
  };

  const handlePhotoPointerUp = (event, image) => {
    window.clearTimeout(longPressRef.current);
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      createFavoriteBurst(event.clientX, event.clientY, image);
    }
    lastTapRef.current = now;
  };

  const handleModalTouchStart = (event) => {
    if (event.touches.length === 1) {
      touchStartRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    if (event.touches.length === 2) {
      pinchRef.current = { distance: distance(event.touches), zoom };
    }
  };

  const handleModalTouchMove = (event) => {
    if (event.touches.length === 2) {
      event.preventDefault();
      const nextDistance = distance(event.touches);
      const scale = nextDistance / Math.max(pinchRef.current.distance, 1);
      setZoom(Math.min(3, Math.max(1, pinchRef.current.zoom * scale)));
    }
  };

  const handleModalTouchEnd = (event) => {
    if (!touchStartRef.current || event.changedTouches.length === 0) return;
    const end = event.changedTouches[0];
    const deltaX = end.clientX - touchStartRef.current.x;
    const deltaY = Math.abs(end.clientY - touchStartRef.current.y);
    if (Math.abs(deltaX) > 56 && deltaY < 70) {
      if (deltaX > 0) showPrevious();
      else showNext();
    }
    touchStartRef.current = null;
  };

  const handleCategoryTouchStart = (event) => {
    touchStartRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const handleCategoryTouchEnd = (event) => {
    if (!touchStartRef.current) return;
    const deltaX = event.changedTouches[0].clientX - touchStartRef.current.x;
    if (Math.abs(deltaX) > 54) {
      const current = categories.indexOf(activeCategory);
      const next = deltaX < 0 ? current + 1 : current - 1;
      setActiveCategory(categories[(next + categories.length) % categories.length]);
    }
    touchStartRef.current = null;
  };

  return (
    <Section eyebrow="Gallery" title="Fifty little treasures">
      <div
        className="mb-8 flex touch-pan-y flex-wrap justify-center gap-3"
        onTouchStart={handleCategoryTouchStart}
        onTouchEnd={handleCategoryTouchEnd}
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`sparkle-button min-h-12 rounded-full px-5 py-3 text-sm font-semibold transition active:scale-95 ${
              activeCategory === category
                ? "bg-rosewood text-white shadow-gold"
                : "border border-white/80 bg-white/65 text-rosewood backdrop-blur hover:bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {visibleImages.map((image, index) => (
          <motion.figure
            key={image.src}
            className="interactive-photo group relative mb-5 break-inside-avoid overflow-hidden rounded-[1.75rem] border border-white/85 bg-white/65 p-2 shadow-gold backdrop-blur active:scale-[0.985]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (index % 8) * 0.04 }}
            onPointerDown={(event) => handlePhotoPointerDown(event, image)}
            onPointerUp={(event) => handlePhotoPointerUp(event, image)}
            onPointerCancel={() => window.clearTimeout(longPressRef.current)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full rounded-[1.35rem] object-cover transition duration-500 hover:scale-[1.025]"
            />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-3 rounded-2xl bg-rosewood/74 px-4 py-3 text-sm font-semibold text-white opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
              {image.caption}
            </div>
            <button
              type="button"
              onClick={() => openImage(index)}
              aria-label="Open photo"
              className="sparkle-button absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/82 text-rosewood opacity-0 shadow-gold backdrop-blur transition group-hover:opacity-100"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
            onTouchEnd={handleModalTouchEnd}
          >
            <motion.div
              id="fullscreen-memory"
              className="relative max-h-full w-full max-w-6xl overflow-hidden rounded-[2rem] bg-black"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[86vh] w-full touch-none object-contain transition-transform duration-150"
                style={{ transform: `scale(${zoom})` }}
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/48 px-4 py-3 text-white backdrop-blur">
                <p className="font-display text-2xl font-semibold">{selectedImage.caption}</p>
                <p className="text-xs text-white/70">Swipe to browse, pinch to zoom, double-tap any gallery photo to favorite it.</p>
              </div>
              <button
                type="button"
                onClick={showPrevious}
                className="sparkle-button absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-rosewood"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="sparkle-button absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-rosewood"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  type="button"
                  onClick={fullscreenSelected}
                  className="sparkle-button flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-rosewood"
                  aria-label="Fullscreen photo"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={closeImage}
                  className="sparkle-button flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-rosewood"
                  aria-label="Close photo"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {captionImage && (
          <motion.div
            className="fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+6rem)] z-[60] mx-auto max-w-md rounded-3xl border border-white/70 bg-white/82 p-5 text-center text-rosewood shadow-glow backdrop-blur-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            onClick={() => setCaptionImage(null)}
          >
            <p className="font-display text-3xl font-semibold">{captionImage.caption}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-rosewood/55">Tap to close</p>
          </motion.div>
        )}
      </AnimatePresence>

      {favoriteBursts.map((burst) => (
        <span key={burst.id} className="favorite-burst fixed z-[70]" style={{ left: burst.x, top: burst.y }}>
          <Heart className="h-12 w-12 fill-petal text-petal" />
        </span>
      ))}
    </Section>
  );
}
