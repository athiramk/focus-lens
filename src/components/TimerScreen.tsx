import { useState, useEffect, useRef } from "react";
import { Square } from "lucide-react";

interface TimerScreenProps {
  onStop: (seconds: number) => void;
}

const formatTime = (totalSeconds: number) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return hrs > 0
    ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
    : `${pad(mins)}:${pad(secs)}`;
};

const TimerScreen = ({ onStop }: TimerScreenProps) => {
  const [seconds, setSeconds] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-timer text-timer-foreground select-none cursor-default">
      {/* Breathing ring */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-56 h-56 rounded-full border-2 border-timer-accent/20 animate-breathe" />
        <div className="absolute w-48 h-48 rounded-full border border-timer-accent/10 animate-breathe" style={{ animationDelay: "1s" }} />
      </div>

      {/* Time display */}
      <p className="text-7xl md:text-8xl font-display tracking-wider tabular-nums text-timer-foreground">
        {formatTime(seconds)}
      </p>
      <p className="text-sm text-timer-foreground/40 mt-4 font-body">Stay focused. Stop when you can't concentrate.</p>

      {/* Stop button */}
      <button
        onClick={() => onStop(seconds)}
        className="mt-16 w-16 h-16 rounded-full bg-timer-accent/20 hover:bg-timer-accent/30 transition-colors flex items-center justify-center border border-timer-accent/30"
        aria-label="Stop focus session"
      >
        <Square className="w-6 h-6 text-timer-accent" fill="currentColor" />
      </button>
      <p className="text-xs text-timer-foreground/30 mt-3 font-body">Tap to stop</p>
    </div>
  );
};

export default TimerScreen;
