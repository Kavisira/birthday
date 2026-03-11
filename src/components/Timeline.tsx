import { FC, useState } from "react";
import { motion } from "framer-motion";

const memories = [
  {
    date: "Jan 2021",
    time: "7:30 PM",
    desc: "The day our journey began ❤️",
    img: "https://picsum.photos/400/250?1",
  },
  {
    date: "Feb 2021",
    time: "9:00 PM",
    desc: "That smile changed everything 😊",
    img: "https://picsum.photos/400/250?2",
  },
  {
    date: "May 2021",
    time: "6:15 PM",
    desc: "Our first trip together ✈️",
    img: "https://picsum.photos/400/250?3",
  },
];

interface TimelineProps {
  onNext: () => void;
}

const Timeline: FC<TimelineProps> = ({ onNext }) => {  
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      style={{
        minHeight: "100vh",
        padding: "3rem 1rem",
        background:
          "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cursor Glow Aura */}
      <motion.div
        animate={{ x: cursor.x - 150, y: cursor.y - 150 }}
        transition={{ duration: 0.1 }}
        style={{
          position: "fixed",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,105,180,0.25), transparent)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating Hearts */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ y: [-15, 15, -15], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 + i }}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: "1.2rem",
          }}
        >
          💖
        </motion.span>
      ))}

      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Great Vibes, cursive",
          color: "white",
          fontSize: "3rem",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        Our Memories ❤️
      </h1>

      {/* Glow Timeline Line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "150px",
          bottom: "0",
          width: "3px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.2), white, rgba(255,255,255,0.2))",
          boxShadow: "0 0 10px rgba(255,255,255,0.6)",
        }}
      />

      {/* Timeline Memories */}
      <motion.div animate={{ filter: hovered !== null ? "blur(0px)" : "blur(0px)" }}>
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: "flex",
              justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
              marginBottom: "3rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Heart Connector */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "1.3rem",
              }}
            >
              ❤️
            </span>

            {/* Memory Card */}
            <motion.div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1 }}
              style={{
                width: "45%",
                padding: "1rem",
                borderRadius: "15px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(1px)",
                color: "white",
                position: "relative",
              }}
            >
              {/* Date Badge */}
              <div
                style={{
                  display: "inline-block",
                  background: "#ff4d6d",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  marginBottom: "5px",
                }}
              >
                {m.date} — {m.time}
              </div>

              <p>{m.desc}</p>

              {/* Floating Medium Image */}
              {hovered === i && (
                <motion.img
                  src={m.img}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "-130px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "220px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Sparkle */}
              {hovered === i && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    fontSize: "1.2rem",
                  }}
                >
                  ✨
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      {/* 💖 Romantic Surprise Corner */}
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 2 }}
  style={{
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: 10,
    cursor: "pointer",
  }}
>
  {/* Sparkle Burst */}
  <motion.span
    animate={{ scale: [1, 1.4, 1], rotate: [0, 20, -20, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    style={{
      position: "absolute",
      top: "-10px",
      right: "-10px",
      fontSize: "1.2rem",
    }}
  >
    ✨
  </motion.span>

  {/* Beating Heart */}
  <motion.div
    onClick={onNext}
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ repeat: Infinity, duration: 1 }}
    style={{
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(10px)",
      borderRadius: "50%",
      padding: "15px",
      boxShadow: "0 0 15px rgba(255,105,180,0.5)",
      fontSize: "1.5rem",
      textAlign: "center",
    }}
  >
    💖
  </motion.div>
</motion.div>
    </div>
  );
};

export default Timeline;