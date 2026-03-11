import type { FC } from "react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import typeSound from "../assets/type.mp3";

interface IntroProps {
  onComplete: () => void;
  startMusic: () => void;
}

const lines = [
  "Hey Pondati ❤️",
  "32 years ago…",
  "A beautiful moment happened in this world…",
  "On March 12, 1994…",
  "A little angel was born…",
  "And unknowingly…",
  "She was about to become my whole world…",
  "Every smile… Every laugh… Every memory…",
  "Led to this journey of love…",
  "Today is not just your birthday…",
  "It is the day my happiness was born…",
];

const Intro: FC<IntroProps> = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  const [experienceStarted, setExperienceStarted] = useState(false);

  const typeAudio = useRef<HTMLAudioElement | null>(null);

  /* create audio */
  useEffect(() => {
    typeAudio.current = new Audio(typeSound);
    if (typeAudio.current) {
      typeAudio.current.volume = 0.15;
    }
  }, []);

  /* typing animation */
  useEffect(() => {
    if (!experienceStarted) return;

    if (lineIndex >= lines.length) {
      setTimeout(() => {
        onComplete();
      }, 800);
      return;
    }

    const currentLine = lines[lineIndex];
    let i = 0;

    const interval = setInterval(() => {
      if (i <= currentLine.length) {
        const nextText = currentLine.slice(0, i);
        setText(nextText);

        const char = currentLine[i - 1];

        if (char && char !== " " && typeAudio.current) {
          typeAudio.current.currentTime = 0;
          typeAudio.current.play().catch(() => {});
        }

        i++;
      } else {
        clearInterval(interval);

        setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setText("");
        }, 900);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [lineIndex, experienceStarted, onComplete]);

  return (
    <div
      onClick={() => {
        if (!experienceStarted) {
          setExperienceStarted(true);
        }
      }}
      style={{
        width: "100vw",
        height: "100dvh", // mobile safe height
        overflow: "hidden",
        position: "fixed", // prevents scroll
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background:
          "linear-gradient(-45deg,#ff9a9e,#fad0c4,#fbc2eb,#a6c1ee)",
        backgroundSize: "400% 400%",
        textAlign: "center",
        padding: "1.5rem",
      }}
    >
      {/* tap instruction */}
      {!experienceStarted && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            color: "white",
            fontSize: "clamp(1.3rem, 5vw, 1.8rem)", // responsive font
            fontFamily: "Great Vibes, cursive",
            maxWidth: "90%",
          }}
        >
          Tap anywhere to begin ❤️
        </motion.div>
      )}

      {/* typing text */}
      {experienceStarted && (
        <motion.p
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)", // responsive text
            color: "white",
            textShadow: "0 0 20px rgba(0,0,0,0.7)",
            maxWidth: "90%",
            lineHeight: 1.4,
          }}
        >
          {text}
        </motion.p>
      )}

      {/* heart portal */}
    </div>
  );
};

export default Intro;