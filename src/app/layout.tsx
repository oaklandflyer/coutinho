import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Coutinho — Product Manager & Creative Strategist",
  description:
    "Product Manager, strategist, and founder based in Pittsburgh, PA. " +
    "Curator-elect of Global Shapers Pittsburgh (WEF). Founder of ASF Visuals LLC. " +
    "FAA Part 107 licensed aerial photographer. Open to PM and creative ops roles.",
  keywords: [
    "Andrew Coutinho", "Product Manager", "Pittsburgh", "WEF", "Global Shapers",
    "ASF Visuals", "Drone Photography", "Strategist", "Fulbright",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
