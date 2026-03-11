import type { FC } from "react";
import { useEffect, useState, useMemo } from "react";

const Countdown: FC = () => {
  const targetDate = useMemo(
    () => new Date("2026-03-10T00:00:00"), // 🔴 change to birthday date
    []
  );
  const [timeLeft, setTimeLeft] = useState<number>(
    targetDate.getTime() - new Date().getTime()
  );
  const [celebrate, setCelebrate] = useState<boolean>(false);

  const triggerConfetti = () => {
    const confetti = (window as unknown as { confetti: (options: unknown) => void }).confetti;
    if (confetti) {
      confetti({
        particleCount: 200,
        spread: 120,
      });
    }
  };

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
  }, [targetDate]);

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
