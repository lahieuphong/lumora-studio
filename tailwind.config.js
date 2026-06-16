/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F8FB",
        ink: "#0F172A",
        subtle: "#64748B",
        line: "#E2E8F0",
        brand: {
          navy: "#0F172A",
          teal: "#14B8A6",
          cyan: "#42BDFE",
          violet: "#8B5CF6",
          green: "#10B981",
          amber: "#F59E0B",
          coral: "#FB7185",
          slate: "#94A3B8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        "xl2": "20px",
        "xl3": "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.10)",
        card: "0 1px 3px rgba(15,23,42,0.05), 0 14px 40px -18px rgba(15,23,42,0.16)",
        glow: "0 18px 60px -22px rgba(66,189,254,0.55)",
        pop: "0 12px 32px -10px rgba(139,92,246,0.35)",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(120% 120% at 10% 0%, rgba(20,184,166,0.18) 0%, rgba(66,189,254,0.10) 35%, rgba(139,92,246,0.16) 70%, transparent 100%)",
        "aurora-strong":
          "linear-gradient(120deg, #14B8A6 0%, #42BDFE 45%, #8B5CF6 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
