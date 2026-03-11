import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photo1 from "../assets/photos/0.jpg";
import photo2 from "../assets/photos/1.jpg";
import photo3 from "../assets/photos/2.jpg";
import photo4 from "../assets/photos/3.jpg";
import photo5 from "../assets/photos/4.jpg";
import photo6 from "../assets/photos/5.jpg";
import photo7 from "../assets/photos/6.jpg";
import photo8 from "../assets/photos/7.jpg";
import photo10 from "../assets/photos/9.jpg";
import photo11 from "../assets/photos/10.jpg";
import photo12 from "../assets/photos/11.jpg";
import photos13 from "../assets/photos/12.jpg";

const photos = [
  { src: photo1, caption: "A moment that changed everything ❤️" },
  { src: photo2, caption: "Your smile became my favorite place 😊" },
  { src: photo3, caption: "Memories I want forever ✈️" },
  { src: photo4, caption: "Adventures we took together 🌍" },
  { src: photo5, caption: "Golden moments with you 🌟" },
  { src: photo6, caption: "Laughter echoes in my heart 😄" },
  { src: photo7, caption: "Every moment with you is special 💫" },
  { src: photo8, caption: "Our story in a single frame 📖" },
  { src: photo10, caption: "Forever grateful for you 🙏" },
  { src: photo11, caption: "You make everything beautiful ✨" },
  { src: photo12, caption: "Here's to many more memories with you 🎉" },
  { src: photos13, caption: "The best is yet to come with you 💖" },
];

interface GalleryProps {
  onFinish: () => void;
}

const Gallery: FC<GalleryProps> = ({ onFinish }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index === photos.length - 1) {
      onFinish();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh", // mobile safe viewport
        overflow: "hidden",
        position: "fixed", // prevents scroll
        top: 0,
        left: 0,
        background: "black",
      }}
    >
      {/* Swipe instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 10, times: [0, 0.2, 0.8, 1] }}
        style={{
          position: "absolute",
          top: "10%",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "Great Vibes, cursive",
          fontSize: "clamp(1rem, 4vw, 1.4rem)",
          textShadow: "0 0 15px rgba(0,0,0,0.8)",
          zIndex: 10,
        }}
      >
        👈 Swipe to explore memories 👉
      </motion.div>

      {/* Petal rain */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{
            y: -100,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: "110vh",
            rotate: 180,
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 5,
          }}
          style={{
            position: "absolute",
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
            pointerEvents: "none",
          }}
        >
          🌸
        </motion.span>
      ))}

      {/* Light cinematic overlay */}
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

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={photos[index].src}
          src={photos[index].src}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -50) next();
            if (info.offset.x > 50) prev();
          }}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "grab",
            userSelect: "none",
          }}
        />
      </AnimatePresence>

      {/* Caption */}
      <motion.p
        key={photos[index].caption}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          position: "absolute",
          bottom: "5%",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "Great Vibes, cursive",
          fontSize: "clamp(1.3rem, 5vw, 2rem)",
          padding: "0 20px",
          textShadow: "0 0 20px rgba(0,0,0,0.8)",
        }}
      >
        {photos[index].caption}
      </motion.p>
    </div>
  );
};

export default Gallery;