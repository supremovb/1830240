import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Section from "./Section";

const bars = Array.from({ length: 18 }, (_, index) => index);
const notes = Array.from({ length: 18 }, (_, index) => index);

export default function MusicPlayer({ songFile, autoStartSignal = 0 }) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const effectiveVolume = isMuted ? 0 : isScrolling ? volume * 0.55 : volume;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = effectiveVolume;
  }, [effectiveVolume]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => setIsScrolling(false), 700);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!autoStartSignal || !audioRef.current) return;
    startPlaybackWithFade();
  }, [autoStartSignal]);

  const rampVolume = (targetVolume) => {
    const audio = audioRef.current;
    if (!audio) return;

    window.clearInterval(fadeRef.current);
    const start = audio.volume;
    const steps = 28;
    let step = 0;

    fadeRef.current = window.setInterval(() => {
      step += 1;
      audio.volume = start + (targetVolume - start) * (step / steps);
      if (step >= steps) {
        audio.volume = targetVolume;
        window.clearInterval(fadeRef.current);
      }
    }, 45);
  };

  const startPlaybackWithFade = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      setHasError(false);
      rampVolume(effectiveVolume || volume);
    } catch {
      setHasError(true);
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      rampVolume(0);
      window.setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 420);
      return;
    }

    await startPlaybackWithFade();
  };

  const toggleMute = () => setIsMuted((muted) => !muted);

  return (
    <>
      <Section eyebrow="Our Song" title="I’ll Be — Edwin McCain">
        <div className="relative mx-auto grid max-w-5xl gap-6 overflow-hidden rounded-[2.5rem] border border-champagne/70 bg-rosewood/95 p-7 text-white shadow-glow sm:p-9 lg:grid-cols-[auto_1fr] lg:items-center">
          {notes.map((note) => (
            <span
              key={note}
              className={`music-note ${isPlaying ? "is-playing" : ""}`}
              style={{
                left: `${8 + ((note * 11) % 82)}%`,
                animationDelay: `${note * 0.22}s`,
              }}
            >
              ♪
            </span>
          ))}

          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause I’ll Be" : "Play I’ll Be"}
            className="sparkle-button z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-rosewood shadow-gold transition hover:scale-105 lg:mx-0"
          >
            {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="ml-1 h-10 w-10" />}
          </button>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Volume2 className="h-5 w-5 text-champagne" />
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/65">Main background song</p>
            </div>
            {/* Replace public/music/ill-be.mp3 with your own local music file if needed. */}
            <h3 className="mt-2 font-display text-5xl font-semibold">I’ll Be — Edwin McCain</h3>
            <p className="mt-2 max-w-2xl text-white/72">
              The song fades in after the intro. If the browser blocks it, tap play on the mini player.
            </p>

            <label className="mt-5 flex max-w-sm items-center gap-4 text-sm font-semibold text-white/80">
              Volume
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-full accent-petal"
              />
            </label>

            <div className="mt-7 flex h-20 items-end gap-2 overflow-hidden rounded-3xl bg-white/10 px-5 py-4">
              {bars.map((bar) => (
                <span
                  key={bar}
                  className={`w-full rounded-full bg-gradient-to-t from-petal to-champagne ${
                    isPlaying ? "music-bar" : "h-3 opacity-45"
                  }`}
                  style={{
                    animationDelay: `${bar * 0.08}s`,
                    height: isPlaying ? undefined : `${12 + (bar % 5) * 4}px`,
                  }}
                />
              ))}
              <span className={`pulsing-heart ${isPlaying ? "is-playing" : ""}`}>♥</span>
            </div>
            {hasError && (
              <p className="mt-4 text-sm text-rose-100">
                Autoplay was blocked or the file is missing. Add public/music/ill-be.mp3, then tap play.
              </p>
            )}
          </div>
        </div>
      </Section>

      <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-[1.5rem] border border-white/70 bg-white/72 p-3 text-rosewood shadow-glow backdrop-blur-xl sm:bottom-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="sparkle-button flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rosewood text-white shadow-gold"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>

          <div className={`love-disk shrink-0 ${isPlaying ? "is-spinning" : ""}`}>
            <span>♥</span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">I’ll Be — Edwin McCain</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-rosewood/12">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rosewood via-petal to-champagne transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="sparkle-button hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rosewood sm:flex"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="hidden w-28 accent-rosewood md:block"
            aria-label="Music volume"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={songFile}
        preload="metadata"
        loop
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />
    </>
  );
}
