module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "nav-open": "navOpen 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
        "nav-close": "navClose 0.18s ease-in forwards",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-down": "slideDown 0.25s ease-out",
        "nav-drop-in": "navDropIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "scan-line": "scanLine 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "bar-grow": "barGrow 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "spin-slow": "spin 12s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "ping-slow": "ping 3s cubic-bezier(0,0,0.2,1) infinite",
        "slide-up": "slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        "pop-in": "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        "marquee": "marquee 28s linear infinite",
      },
      keyframes: {
        navOpen: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        navClose: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-4px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        navDropIn: {
          "0%": { opacity: "0", transform: "scaleY(0.96) translateY(-8px)" },
          "100%": { opacity: "1", transform: "scaleY(1) translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scanLine: {
          "0%, 100%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(79,70,229,0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(79,70,229,0.5), 0 0 80px rgba(79,70,229,0.2)" },
        },
        barGrow: {
          "0%": { width: "0%" },
          "100%": { width: "var(--target-width)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.7)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
