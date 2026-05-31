import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Anthropic / Claude colour theme
        claude: {
          coral: "#D97757",
          coraldark: "#B85C39",
          cream: "#F0EEE6",
          card: "#FAF9F5",
          ink: "#1F1E1D",
          muted: "#857F76",
          line: "#E3DFD4",
          dark: "#262321",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
