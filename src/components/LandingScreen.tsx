import { Brain, Clock, Zap, ArrowRight } from "lucide-react";

const funFacts = [
  { icon: Brain, text: "The average human attention span is about 20–25 minutes before focus naturally dips." },
  { icon: Clock, text: "Knowing your span helps you plan deep work blocks and break times perfectly." },
  { icon: Zap, text: "Short, focused bursts with breaks in between can boost productivity by up to 30%." },
];

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen = ({ onStart }: LandingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center space-y-10">
        {/* Hero */}
        <div className="animate-fade-up space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-accent flex items-center justify-center animate-breathe">
            <Brain className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-foreground leading-tight">
            FocusLens
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-sm mx-auto">
            Discover how long you can truly focus — then use it to work smarter, not harder.
          </p>
        </div>

        {/* Fun facts */}
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {funFacts.map((fact, i) => (
            <div
              key={i}
              className="flex items-start gap-4 text-left bg-card rounded-lg p-4 border border-border"
            >
              <div className="mt-0.5 w-9 h-9 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                <fact.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-sm text-secondary-foreground font-body leading-relaxed">{fact.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-lg px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Start Focus Session
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-muted-foreground mt-3">
            Press start, focus on your work, and stop when you lose concentration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
