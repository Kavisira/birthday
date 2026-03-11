import { FC, useEffect, useState, useRef } from "react";
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

const Intro: FC<IntroProps> = ({ onComplete, startMusic }) => {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [burst, setBurst] = useState(false);

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
      // setShowButton(true);
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
  }, [lineIndex, experienceStarted]);

  return (
    <div
      onClick={() => {
        if (!experienceStarted) {
          setExperienceStarted(true);
        }
      }}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background:
          "linear-gradient(-45deg,#ff9a9e,#fad0c4,#fbc2eb,#a6c1ee)",
        backgroundSize: "400% 400%",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* tap instruction */}
      {!experienceStarted && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontFamily: "Great Vibes, cursive",
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
            fontSize: "2.3rem",
            color: "white",
            textShadow: "0 0 20px rgba(0,0,0,0.7)",
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