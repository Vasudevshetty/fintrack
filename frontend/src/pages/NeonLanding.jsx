import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  TrendingUp,
  PieChart,
  Zap,
  ArrowRight,
  Sparkles,
  Cpu,
  Radio,
} from "lucide-react";
import { getEnvConfig } from "../constants/environments";

const features = [
  {
    icon: CreditCard,
    title: "Holo-Cards",
    desc: "Manage virtual credit lines in the matrix",
    accent: "cyan",
  },
  {
    icon: TrendingUp,
    title: "Pulse Analytics",
    desc: "Real-time spending waveforms & neon charts",
    accent: "magenta",
  },
  {
    icon: PieChart,
    title: "Spectrum Reports",
    desc: "Export data streams to any dimension",
    accent: "lime",
  },
  {
    icon: Cpu,
    title: "AI Forecast",
    desc: "Experimental prediction engine — dev only",
    accent: "violet",
  },
];

const accentMap = {
  cyan: "border-neon-cyan/50 text-neon-cyan shadow-neon",
  magenta: "border-neon-magenta/50 text-neon-magenta shadow-neon-magenta",
  lime: "border-neon-lime/50 text-neon-lime shadow-neon-lime",
  violet: "border-violet-500/50 text-violet-400",
};

const NeonLanding = () => {
  const navigate = useNavigate();
  const envConfig = getEnvConfig("development");

  return (
    <div className="min-h-screen font-body text-neon-text overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/10 blur-3xl animate-neon-pulse" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-neon-magenta/10 blur-3xl animate-neon-float" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-neon-lime/5 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-cyan-500/20 bg-neon-panel/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl font-display font-bold bg-gradient-to-br from-neon-cyan to-neon-magenta text-neon-bg shadow-neon">
              ₿
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-widest neon-glow-text">
                FIN<span className="text-neon-magenta">TRACK</span>
              </h1>
              <p className="text-xs text-neon-cyan font-semibold tracking-[0.2em] uppercase">
                {envConfig.badge}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="neon-btn-ghost text-sm"
            >
              Jack In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="neon-btn-primary text-sm flex items-center gap-2"
            >
              <Zap size={16} /> Initialize
            </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-lime/40 bg-neon-lime/10 text-neon-lime text-sm font-semibold mb-8 animate-neon-pulse">
          <Radio size={14} /> LIVE DEV BUILD — REDEPLOY TEST
        </div>

        <h2 className="font-display text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="block text-neon-cyan neon-glow-text">CYBER</span>
          <span className="block bg-gradient-to-r from-neon-magenta via-fuchsia-400 to-neon-lime bg-clip-text text-transparent">
            FINANCE
          </span>
          <span className="block text-2xl md:text-3xl mt-4 text-neon-muted font-body font-medium tracking-widest">
            v2.0 — NEON PROTOCOL ACTIVE
          </span>
        </h2>

        <p className="text-lg text-neon-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          Welcome to the dev dimension. Every pixel glows, every feature unlocks.
          If you see this theme, your redeploy nailed it.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <button
            onClick={() => navigate("/login")}
            className="neon-btn-primary flex items-center gap-2 text-lg px-8 py-3"
          >
            Enter the Grid <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate("/register")}
            className="neon-btn-ghost flex items-center gap-2 text-lg px-8 py-3"
          >
            <Sparkles size={20} /> Create Identity
          </button>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`neon-card neon-scanline p-6 border-2 ${accentMap[f.accent]} transition-transform hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg border ${accentMap[f.accent]} bg-neon-bg/50`}>
                    <Icon size={28} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-bold text-lg text-neon-text">{f.title}</h3>
                    <p className="text-neon-muted mt-1 text-sm">{f.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="neon-card mt-12 p-8 border-2 border-neon-cyan/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
          <h3 className="font-display text-2xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
            <Zap className="text-neon-lime" /> Quick Jack-In
          </h3>
          <p className="text-neon-muted mb-4">Demo credentials for the neon grid:</p>
          <div className="font-mono text-sm bg-neon-bg/80 border border-cyan-500/30 rounded-lg p-4 mb-6 text-neon-cyan">
            📧 {envConfig.demoUser}
            <br />
            🔑 {envConfig.demoPassword}
          </div>
          <button
            onClick={() => navigate("/login")}
            className="neon-btn-primary flex items-center gap-2"
          >
            Connect <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-cyan-500/20 py-8 text-center">
        <p className="text-sm text-neon-muted font-mono">
          v2.0-neon-dev | fintrack-dev.deployio.tech | ⚡ ALL FEATURES UNLOCKED
        </p>
      </footer>
    </div>
  );
};

export default NeonLanding;
