/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFB800",
          "yellow-hover": "#E6A600",
          coral: "#FF5E62",
          "coral-hover": "#E54E52",
          mint: "#10B981",
          "mint-light": "#E6FBF2",
          blue: "#3B82F6",
          "blue-hover": "#2563EB",
          purple: "#8B5CF6",
          lavender: "#F3F0FF",
        },
        surface: {
          white: "#FFFFFF",
          subtle: "#F8FAFC",
          muted: "#F1F5F9",
          border: "#E2E8F0",
        },
        slate: {
          950: "#0F172A",
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Fredoka", "Quicksand", "Nunito", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
