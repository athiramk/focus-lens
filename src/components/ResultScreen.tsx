import { RotateCcw, TrendingUp, TrendingDown, Minus } from "lucide-react";

const AVERAGE_SPAN_MINUTES = 25;

interface ResultScreenProps {
  seconds: number;
  onRestart: () => void;
}

const formatDuration = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins === 0) return `${secs} second${secs !== 1 ? "s" : ""}`;
  if (secs === 0) return `${mins} minute${mins !== 1 ? "s" : ""}`;
  return `${mins}m ${secs}s`;
};

const getInsight = (mins: number) => {
  if (mins >= 45) return { label: "Exceptional", color: "text-timer-accent", icon: TrendingUp, tip: "Your focus is outstanding! Make sure to rest well to maintain it." };
  if (mins >= 25) return { label: "Above Average", color: "text-timer-accent", icon: TrendingUp, tip: "Great focus! Try the Pomodoro method — 25 min work, 5 min break." };
  if (mins >= 15) return { label: "Average", color: "text-muted-foreground", icon: Minus, tip: "Totally normal. Try 15–20 min focus blocks with short 3–5 min breaks." };
  if (mins >= 5) return { label: "Building Up", color: "text-amber-500", icon: TrendingDown, tip: "Start with shorter blocks and gradually increase. Remove distractions." };
  return { label: "Warming Up", color: "text-destructive", icon: TrendingDown, tip: "Try putting your phone in another room and start with 5-minute sessions." };
};

const ResultScreen = ({ seconds, onRestart }: ResultScreenProps) => {
  const minutes = seconds / 60;
  const insight = getInsight(minutes);
  const percentage = Math.min(Math.round((minutes / AVERAGE_SPAN_MINUTES) * 100), 200);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-up">
        {/* Duration */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-body uppercase tracking-wider">Your Focus Span</p>
          <p className="text-5xl md:text-6xl font-display text-foreground">{formatDuration(seconds)}</p>
        </div>

        {/* Comparison bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-muted-foreground font-body">
            <span>You</span>
            <span>Average ({AVERAGE_SPAN_MINUTES} min)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-sm font-body font-semibold">
            <span className={insight.color}>{percentage}%</span>
            <span className="text-muted-foreground"> of average — </span>
            <span className={insight.color}>{insight.label}</span>
          </p>
        </div>

        {/* Tip card */}
        <div className="bg-card border border-border rounded-lg p-5 text-left">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-body">💡 Tip for you</p>
          <p className="text-sm text-secondary-foreground font-body leading-relaxed">{insight.tip}</p>
        </div>

        {/* Restart */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
