import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function AutoStoryControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.16);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle("is-auto-story", isPlaying);
    return () => document.documentElement.classList.remove("is-auto-story");
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollSpeed = reducedMotion ? Math.min(speed, 0.08) : speed;

    const step = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min(time - lastTimeRef.current, 48);
      lastTimeRef.current = time;

      programmaticScrollRef.current = true;
      window.scrollTo({
        top: Math.min(window.scrollY + delta * scrollSpeed, document.documentElement.scrollHeight),
        behavior: "auto",
      });
      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 90);

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setIsPlaying(false);
        return;
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      lastTimeRef.current = 0;
    };
  }, [isPlaying, speed]);

  useEffect(() => {
    const pauseForUser = (event) => {
      if (event?.target?.closest?.(".auto-story-control")) return;
      if (!programmaticScrollRef.current) setIsPlaying(false);
    };

    window.addEventListener("wheel", pauseForUser, { passive: true });
    window.addEventListener("touchstart", pauseForUser, { passive: true });
    window.addEventListener("keydown", pauseForUser);

    return () => {
      window.removeEventListener("wheel", pauseForUser);
      window.removeEventListener("touchstart", pauseForUser);
      window.removeEventListener("keydown", pauseForUser);
    };
  }, []);

  return (
    <div className="auto-story-control fixed right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-40 rounded-[1.5rem] border border-white/70 bg-white/82 p-3 text-rosewood shadow-gold backdrop-blur-xl sm:right-6">
      <button
        type="button"
        onClick={() => setIsPlaying((value) => !value)}
        className="sparkle-button inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-rosewood px-5 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5"
        aria-pressed={isPlaying}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isPlaying ? "Pause Story" : "Play Our Story"}
      </button>
      <label className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-rosewood/60">
        Speed
        <input
          type="range"
          min="0.08"
          max="0.36"
          step="0.02"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          className="mt-1 block w-40 accent-rosewood"
          aria-label="Story scroll speed"
        />
      </label>
    </div>
  );
}
