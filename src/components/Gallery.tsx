import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  {
    src: "../assets/photos/1.HEIC",
    caption: "A moment that changed everything ❤️",
  },
  {
    src: "../assets/photos/2.HEIC",
    caption: "Your smile became my favorite place 😊",
  },
  {
    src: "../assets/photos/3.HEIC",
    caption: "Memories I want forever ✈️",
  },
];

interface GalleryProps {
  onFinish: () => void;
}

const Gallery: FC<GalleryProps> = ({ onFinish }) => {  
  const [index, setIndex] = useState(0);
const next = () => {
  if (index === photos.length - 1) {
    onFinish(); // move to next phase
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
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "black",
      }}
    >
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 1, 1, 0] }}
  transition={{ duration: 100, times: [0, 0.2, 0.8, 1] }}
  style={{
    position: "absolute",
    top: "100px",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontFamily: "Great Vibes, cursive",
    fontSize: "1.3rem",
    textShadow: "0 0 15px rgba(0,0,0,0.8)",
  }}
>
  👈 Swipe to explore memories 👉
</motion.div>
      {/* 🌸 Petal Rain */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: "-10vh", x: Math.random() * window.innerWidth }}
          animate={{ y: "110vh", rotate: 180 }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 5,
          }}
          style={{
            position: "absolute",
            fontSize: "1.2rem",
          }}
        >
          🌸
        </motion.span>
      ))}

      {/* 🎥 Light Leak Overlay */}
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

      {/* 📸 Image Scene */}
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
          transition={{ duration: 1.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "grab",
          }}
        />
      </AnimatePresence>

      {/* 💖 Caption */}
      <motion.p
        key={photos[index].caption}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "Great Vibes, cursive",
          fontSize: "2rem",
          textShadow: "0 0 20px rgba(0,0,0,0.8)",
        }}
      >
        {photos[index].caption}
      </motion.p>

      
      
    </div>
  );
};

export default Gallery;