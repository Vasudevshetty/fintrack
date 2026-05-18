module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#8B5CF6",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        neon: {
          bg: "#06060f",
          panel: "#0d0d1a",
          text: "#e8f4ff",
          muted: "#7b8fa8",
          cyan: "#00f5ff",
          magenta: "#ff2bd6",
          lime: "#b8ff3c",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.15)",
        "neon-magenta": "0 0 20px rgba(255, 43, 214, 0.4)",
        "neon-lime": "0 0 20px rgba(184, 255, 60, 0.35)",
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "neon-float": "neon-float 4s ease-in-out infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        "neon-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
