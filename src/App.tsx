import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Intro from "./components/Intro";
import Gallery from "./components/Gallery";
import FinalMessage from "./components/FinalWish";

import music from "./assets/app.mp3";
import finalMusic from "./assets/final.mp3";

function App() {
  const [showGallery, setShowGallery] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const finalAudioRef = useRef<HTMLAudioElement | null>(null);

  /* 🎵 Start main music */
  const startMusic = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.muted = false;
    audio.volume = 0;

    audio.play().catch(() => {});

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.4) {
        vol += 0.02;
        audio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 120);
  };

  /* 🎂 Switch to final music */
  const switchToFinalMusic = () => {
    if (!audioRef.current || !finalAudioRef.current) return;

    const main = audioRef.current;
    const final = finalAudioRef.current;

    let vol = main.volume;

    const fadeOut = setInterval(() => {
      if (vol > 0.02) {
        vol -= 0.02;
        main.volume = vol;
      } else {
        clearInterval(fadeOut);
        main.pause();

        final.volume = 0;
        final.muted = false;
        final.play().catch(() => {});

        let finalVol = 0;
        const fadeIn = setInterval(() => {
          if (finalVol < 0.5) {
            finalVol += 0.02;
            final.volume = finalVol;
          } else {
            clearInterval(fadeIn);
          }
        }, 120);
      }
    }, 120);
  };

  return (
    <>
      {/* Main music */}
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mp3" />
      </audio>

      {/* Final music */}
      <audio ref={finalAudioRef} loop>
        <source src={finalMusic} type="audio/mp3" />
      </audio>

      <AnimatePresence mode="wait">
        {!showGallery ? (
          <motion.div key="intro" exit={{ opacity: 0 }}>
            <Intro
              onComplete={() => {
                startMusic();
                setShowGallery(true);
              }}
              startMusic={startMusic}
            />
          </motion.div>
        ) : !showFinal ? (
          <motion.div key="gallery" exit={{ opacity: 0 }}>
            <Gallery
              onFinish={() => {
                switchToFinalMusic();
                setShowFinal(true);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FinalMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;