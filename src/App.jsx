import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import AutoStoryControls from "./components/AutoStoryControls";
import CursorTrail from "./components/CursorTrail";
import FinalPromise from "./components/FinalPromise";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import ImageCarousel from "./components/ImageCarousel";
import IntroScreen from "./components/IntroScreen";
import LoveLetter from "./components/LoveLetter";
import LyricPortrait from "./components/LyricPortrait";
import MemoryCards from "./components/MemoryCards";
import MusicPlayer from "./components/MusicPlayer";
import RibbonDivider from "./components/RibbonDivider";
import Scrapbook from "./components/Scrapbook";
import Stats from "./components/Stats";
import {
  DreamySky,
  FilmReel,
  ForeverScene,
  HeartCollage,
  LoveJar,
  OurUniverse,
  TornLoveLetter,
} from "./components/StoryWorlds";
import { MemoryWheel3D, Universe3D } from "./components/ThreeMagic";
import TodayMemory from "./components/TodayMemory";
import Timeline from "./components/Timeline";

const basePath = import.meta.env.BASE_URL;
const assetPath = (path) => `${basePath}${path}`.replace(/\/{2,}/g, "/");

// Add, remove, or rename image files here if you change public/images/.
const imageFiles = [
  "1.jpg",
  "2.png",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.png",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.png",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.png",
  "35.jpg",
  "36.jpg",
  "37.jpg",
  "38.jpg",
  "39.jpg",
  "40.jpg",
  "41.jpg",
  "42.jpg",
  "43.jpg",
  "44.jpg",
  "45.jpg",
  "46.jpg",
  "47.jpg",
  "48.jpg",
  "49.jpg",
  "50.jpg",
  "51.jpg",
];

const images = imageFiles.map((file, index) => ({
  src: assetPath(`images/${file}`),
  alt: `Romantic memory ${index + 1}`,
  caption: `Memory ${index + 1}: another little reason I keep choosing you.`,
}));

export default function App() {
  // Replace this filename after adding your local song inside public/music/.
  const songFile = assetPath("music/ill-be.mp3");
  // Replace public/video/vid.mp4 if you want a different intro video.
  const introVideo = assetPath("video/vid.mp4");
  const [showIntro, setShowIntro] = useState(true);
  const [autoStartMusic, setAutoStartMusic] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);

  const enterStory = () => {
    setShowIntro(false);
    setAutoStartMusic((count) => count + 1);
  };

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroScreen key="intro" videoSrc={introVideo} onEnter={enterStory} />
      ) : (
        <motion.div
          key="site"
          className="min-h-screen overflow-x-hidden text-rosewood"
          initial={{ opacity: 0, backgroundColor: "#000000" }}
          animate={{ opacity: 1, backgroundColor: "#fff8ef" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
        >
          <AnimatedBackground />
          <CursorTrail />
          <AutoStoryControls />
          <Hero heroImage={images[0].src} />
          <RibbonDivider />
          <Stats />
          <Timeline />
          <DreamySky />
          <ImageCarousel images={images} />
          <MemoryWheel3D images={images} />
          <TodayMemory
            images={images}
            shuffleCount={shuffleCount}
            onShuffle={() => setShuffleCount((count) => count + 1)}
          />
          <Gallery images={images} />
          <LyricPortrait image={images[50]} />
          <HeartCollage images={images} />
          <Scrapbook images={images} />
          <FilmReel images={images} />
          <OurUniverse />
          <Universe3D />
          <LoveJar />
          <LoveLetter />
          <TornLoveLetter />
          <MemoryCards />
          <MusicPlayer songFile={songFile} autoStartSignal={autoStartMusic} />
          <FinalPromise />
          <ForeverScene />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
