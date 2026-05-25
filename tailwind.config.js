/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Geist", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "Consolas", "monospace"],
      },
      colors: {
        bg: "#FAF6EE",
        "bg-alt": "#F2EBDB",
        "bg-deep": "#E8DFC8",
        ink: "#1A1612",
        "ink-soft": "#4A3F33",
        "ink-mute": "#8A7E6E",
        line: "#D9CFB8",
        "line-soft": "#E8E0CC",
        accent: "#2E6B3D",
        "accent-2": "#245530",
        "accent-s": "#7FAB8A",
        "accent-bg": "#DCE8D3",
        warn: "#C4471C",
        "warn-bg": "#FBE6D8",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26,22,18,0.06), 0 4px 16px rgba(26,22,18,0.04)",
        "card-hover":
          "0 2px 8px rgba(26,22,18,0.10), 0 8px 24px rgba(26,22,18,0.07)",
        soft: "0 1px 2px rgba(26,22,18,0.05)",
      },
    },
  },
  plugins: [],
};
