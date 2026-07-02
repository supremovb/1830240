import { useEffect, useRef, useState } from "react";
import { Maximize2, Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const floatingItems = Array.from({ length: 44 }, (_, index) => ({
  id: index,
  kind: index % 3 === 0 ? "heart" : index % 3 === 1 ? "petal" : "sparkle",
  left: `${(index * 29) % 100}%`,
  top: `${8 + ((index * 17) % 82)}%`,
  delay: (index % 8) * 0.35,
}));

export default function IntroScreen({ videoSrc, onEnter }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [hasBegun, setHasBegun] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setRatio = () => {
      if (video.videoWidth && video.videoHeight) {
        setIsPortrait(video.videoHeight > video.videoWidth);
      }
    };

    video.addEventListener("loadedmetadata", setRatio);
    return () => video.removeEventListener("loadedmetadata", setRatio);
  }, []);

  const finishIntro = () => {
    setIsLeaving(true);
    window.setTimeout(onEnter, 900);
  };

  const beginIntro = async () => {
    const video = videoRef.current;
    if (!video) return;

    setHasBegun(true);
    video.muted = isMuted;
    try {
      await video.play();
      setNeedsPlay(false);
    } catch {
      setNeedsPlay(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const openFullscreen = async () => {
    const target = document.getElementById("intro-cinema-frame") || videoRef.current;
    if (target?.requestFullscreen) {
      await target.requestFullscreen();
    }
  };

  return (
    <motion.section
      className={`fixed inset-0 z-50 overflow-hidden bg-black text-white ${isLeaving ? "cinematic-out" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <video
        src={videoSrc}
        className="absolute inset-0 hidden h-full w-full scale-110 object-cover opacity-40 blur-2xl sm:block"
        autoPlay={hasBegun}
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(244,209,136,0.22),transparent_28%),radial-gradient(circle_at_10%_78%,rgba(245,167,188,0.28),transparent_32%),linear-gradient(135deg,rgba(2,0,5,0.74),rgba(75,18,43,0.58),rgba(0,0,0,0.82))]" />
      <div className="absolute inset-0 intro-vignette" />

      {floatingItems.map((item) => (
        <span
          key={item.id}
          className={`intro-float intro-${item.kind}`}
          style={{ left: item.left, top: item.top, animationDelay: `${item.delay}s` }}
        >
          {item.kind === "heart" ? "♥" : item.kind === "sparkle" ? "✦" : ""}
        </span>
      ))}

      {!hasBegun && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/45 px-5 backdrop-blur-sm">
          <div className="max-w-xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-champagne">
              Till They Take My Heart Away
            </p>
            <h1 className="font-display text-5xl font-semibold leading-none sm:text-7xl">
              Tap to Begin
            </h1>
            <p className="mx-auto mt-5 max-w-md text-white/75">
              One tap unlocks the intro memory and lets the music begin when our story opens.
            </p>
            <button
              type="button"
              onClick={beginIntro}
              className="sparkle-button enter-story-button mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-rosewood shadow-gold transition hover:-translate-y-0.5"
            >
              <Play className="h-5 w-5 fill-rosewood" />
              Enter Our Story
            </button>
          </div>
        </div>
      )}

      <div className="intro-layout relative z-10 flex min-h-[100svh] flex-col justify-between px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-8 lg:px-12">
        <div className="intro-topbar relative z-20 flex items-center justify-between gap-3">
          <p className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur">
            Till They Take My Heart Away
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="sparkle-button flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur transition hover:bg-white/24"
              aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={openFullscreen}
              className="sparkle-button flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur transition hover:bg-white/24"
              aria-label="Fullscreen intro video"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="intro-video-slot relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center py-3 sm:py-6">
          <div
            id="intro-cinema-frame"
            className={`cinema-frame relative overflow-hidden ${isPortrait ? "portrait-source" : "landscape-source"}`}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="h-full w-full object-contain"
              playsInline
              muted={isMuted}
              preload="auto"
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (video.duration) setProgress((video.currentTime / video.duration) * 100);
              }}
              onEnded={finishIntro}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/34 via-transparent to-white/8" />
          </div>
        </div>

        <div className="intro-copy relative z-20 mx-auto w-full max-w-4xl pb-2 text-center sm:pb-4">
          <motion.h2
            className="font-display text-[clamp(2rem,7vw,5rem)] font-semibold leading-none text-white drop-shadow-2xl"
            animate={{ y: [0, -7, 0], opacity: [0.92, 1, 0.92] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            A little memory before our love story begins...
          </motion.h2>

          <div className="mx-auto mt-4 h-3 max-w-2xl overflow-hidden rounded-full bg-white/18 ring-1 ring-white/25 sm:mt-6">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-petal via-white to-champagne shadow-[0_0_24px_rgba(244,209,136,0.85)]"
              style={{ width: `${Math.max(progress, needsPlay ? 0 : 2)}%` }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-5">
            {needsPlay && (
              <button
                type="button"
                onClick={beginIntro}
                className="sparkle-button inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-rosewood shadow-gold transition hover:-translate-y-0.5"
              >
                <Play className="h-5 w-5 fill-rosewood" />
                Play Intro
              </button>
            )}
            <button
              type="button"
              onClick={finishIntro}
              className="sparkle-button enter-story-button rounded-full border border-white/35 bg-white/12 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-rosewood"
            >
              Enter Our Story
            </button>
            <button
              type="button"
              onClick={finishIntro}
              className="rounded-full px-5 py-3 text-sm font-semibold text-white/75 transition hover:text-white"
            >
              Skip Intro
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
