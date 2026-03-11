import { FC, useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Countdown: FC = () => {
  const targetDate = new Date("2026-03-10T00:00:00"); // 🔴 change to birthday date
  const [timeLeft, setTimeLeft] = useState<number>(
    targetDate.getTime() - new Date().getTime()
  );
  const [celebrate, setCelebrate] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetDate.getTime() - new Date().getTime();
      setTimeLeft(diff);

      if (diff <= 0) {
        setCelebrate(true);
        triggerConfetti();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
    });
  };

  const formatTime = () => {
    if (timeLeft <= 0) return "🎉 It's Your Day 🎉";

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h2 className="text-3xl mb-4">Countdown to Your Special Day ⏳</h2>

      <p className="text-4xl">{formatTime()}</p>

      {celebrate && (
        <h1 className="text-5xl mt-6 text-pink-400">
          Happy Birthday My Love ❤️
        </h1>
      )}
    </div>
  );
};

export default Countdown;
