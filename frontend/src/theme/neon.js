import { getEnvironment } from "../utils/features";

export const isNeonDev = () => getEnvironment() === "development";

export const NEON = {
  cyan: "#00f5ff",
  magenta: "#ff2bd6",
  lime: "#b8ff3c",
  violet: "#a855f7",
  amber: "#ffb800",
  bg: "#06060f",
  panel: "#0d0d1a",
  panelBorder: "rgba(0, 245, 255, 0.35)",
  text: "#e8f4ff",
  muted: "#7b8fa8",
  glowCyan: "0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)",
  glowMagenta: "0 0 20px rgba(255, 43, 214, 0.5), 0 0 40px rgba(255, 43, 214, 0.2)",
};
