import type { FC } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Letter {
  title: string;
  message: string;
}

const letters: Letter[] = [
  {
    title: "Open on your next birthday 🎂",
    message:
      "I hope we are still laughing at silly things and growing stronger together.",
  },
  {
    title: "Open after 5 years ⏳",
    message:
      "No matter where life takes us, my love for you will only grow deeper.",
  },
  {
    title: "Open when we grow old 👵👴",
    message:
      "I can’t wait to sit beside you and relive every beautiful memory again.",
  },
];

const FutureLetters: FC = () => {
  const [selected, setSelected] = useState<Letter | null>(null);

  return (
    <div className="min-h-screen bg-pink-50 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10">Letters From My Heart ✉️</h2>

      {/* Envelope List */}
      <div className="flex flex-wrap justify-center gap-6">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded shadow cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(letter)}
          >
            💌 {letter.title}
          </motion.div>
        ))}
      </div>

      {/* Popup Letter */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white p-6 rounded max-w-md text-center"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <h3 className="text-xl font-semibold mb-4">{selected.title}</h3>
              <p className="text-gray-600">{selected.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FutureLetters;
