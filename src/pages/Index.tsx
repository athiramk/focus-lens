import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import TimerScreen from "@/components/TimerScreen";
import ResultScreen from "@/components/ResultScreen";

type Screen = "landing" | "timer" | "result";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [focusSeconds, setFocusSeconds] = useState(0);

  const handleStart = () => setScreen("timer");
  const handleStop = (seconds: number) => {
    setFocusSeconds(seconds);
    setScreen("result");
  };
  const handleRestart = () => setScreen("landing");

  if (screen === "timer") return <TimerScreen onStop={handleStop} />;
  if (screen === "result") return <ResultScreen seconds={focusSeconds} onRestart={handleRestart} />;
  return <LandingScreen onStart={handleStart} />;
};

export default Index;
