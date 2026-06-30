import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Trang Chủ | Next.js Landing Page",
  description: "Dự án về Website tốc độ cao và chuẩn SEO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
