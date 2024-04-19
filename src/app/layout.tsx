import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HomeContextProvider from "./context/HomeContext";

const poppins = Poppins(
  {
    weight: ["100", "200", "500", "700", "800", "900"],
    subsets: ["latin"],
    variable: '--font-poppins'
  });

export const metadata: Metadata = {
  title: "Cine Tube",
  description: "Seu site de entretenimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HomeContextProvider>
      <body className={poppins.variable}>{children}</body>
      </HomeContextProvider>
    </html>
  );
}
