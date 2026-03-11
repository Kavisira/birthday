import type { FC } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const message =
  "Happy Birthday My Love ❤️ You are the most beautiful part of my life, and every moment with you feels magical.";

const FinalMessage: FC = () => {
  const [text, setText] = useState("");

  /* 💌 Typewriter + Confetti */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 40);

    setTimeout(() => {
      const confetti = (window as unknown as { confetti: (options: unknown) => void }).confetti;
      if (confetti) {
        confetti({ spread: 120, particleCount: 150 });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh", // mobile safe height
        overflow: "hidden",
        position: "fixed", // prevent scroll
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        textAlign: "center",
      }}
    >
      {/* ❤️ Heart Pulse Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          fontSize: "6rem",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        ❤️
      </motion.div>

      {/* 🌸 Petal Rain */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -120, left: `${Math.random() * 100}%` }}
          animate={{ y: "110vh", rotate: 180 }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 5,
          }}
          style={{
            position: "absolute",
            fontSize: "clamp(0.8rem,2vw,1.2rem)",
            pointerEvents: "none",
          }}
        >
          🌸
        </motion.span>
      ))}

      {/* 🎈 Floating Balloons */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ y: ["110vh", "-10vh"] }}
          transition={{ repeat: Infinity, duration: 12 + i }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            fontSize: "clamp(1rem,2.5vw,1.5rem)",
            pointerEvents: "none",
          }}
        >
          🎈
        </motion.span>
      ))}

      {/* 🎥 Light Leak */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(255,182,193,0.3), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* 💌 Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontFamily: "Great Vibes, cursive",
          fontSize: "clamp(1.6rem,5vw,2.5rem)", // responsive
          color: "white",
          textShadow: "0 0 20px rgba(0,0,0,0.7)",
          zIndex: 2,
          maxWidth: "90%",
          lineHeight: 1.4,
        }}
      >
        {text}
      </motion.p>

      {/* 🎂 Cake Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
        style={{
          position: "absolute",
          bottom: "8%",
          fontSize: "clamp(2rem,5vw,3rem)",
        }}
      >
        🎂
      </motion.div>

      {/* ✨ Sparkles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 0.8, 0.3], y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4 + i }}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: "clamp(0.8rem,2vw,1.2rem)",
            pointerEvents: "none",
          }}
        >
          ✨
        </motion.span>
      ))}

      {/* 🎞 Film Grain Overlay */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default FinalMessage;