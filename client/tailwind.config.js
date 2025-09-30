module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F59E0B", // Amber 500 (energy, motivation)
          secondary: "#2563EB", // Blue 600 (action)
          neutral: "#111827", // Gray 900 (strong text)
          background: "#F9FAFB", // Gray 50 (clean bg)
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }], // 36px
        h2: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }], // 30px
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }], // 24px
        body: ["1rem", { lineHeight: "1.75rem", fontWeight: "400" }], // 16px
        small: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }], // 14px
      },
      spacing: {
        section: "3rem", // 48px
        card: "1.5rem", // 24px
        btnX: "1rem", // 16px (button X padding)
        btnY: "0.5rem", // 8px (button Y padding)
        gapSm: "1rem", // 16px
        gapMd: "1.5rem", // 24px
      },
    },
  },
  plugins: [],
};
