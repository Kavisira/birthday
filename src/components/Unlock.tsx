import { FC, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface UnlockProps {
  onUnlock: () => void;
}

const Unlock: FC<UnlockProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const correctPassword = "love"; // change as needed

  /* 💖 Floating hearts */
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 3,
      })),
    []
  );

  const handleUnlock = () => {
    if (password.toLowerCase() === correctPassword) {
      setError(false);
      setSuccess(true);

      // delay before moving to next scene
      setTimeout(onUnlock, 1200);
    } else {
      setError(true);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 💖 Floating hearts */}
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          animate={{ y: [-15, 15, -15], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: h.duration }}
          style={{
            position: "absolute",
            top: `${h.top}%`,
            left: `${h.left}%`,
            fontSize: "1.3rem",
          }}
        >
          💖
        </motion.div>
      ))}

      {/* Unlock Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          padding: "2rem",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: "2rem",
            color: "white",
          }}
        >
          Enter Secret Password ❤️
        </h2>

        <motion.input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          animate={
            focus
              ? { boxShadow: "0 0 15px rgba(255,105,180,0.7)" }
              : { boxShadow: "0 0 0 rgba(0,0,0,0)" }
          }
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1rem",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <motion.button
          onClick={handleUnlock}
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.5rem",
            borderRadius: "10px",
            border: "none",
            background: "#ff4d6d",
            color: "white",
            cursor: "pointer",
          }}
        >
          Unlock
        </motion.button>

        {error && (
          <p style={{ color: "white", marginTop: "10px" }}>
            Wrong password 😅
          </p>
        )}
      </motion.div>

      {/* ✨ Glow Flash Overlay */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.4)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* 💖 Heart Burst */}
      {success &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
              opacity: 0,
            }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: "1.5rem",
            }}
          >
            💖
          </motion.span>
        ))}
    </div>
  );
};

export default Unlock;