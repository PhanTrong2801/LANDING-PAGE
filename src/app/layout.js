import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata = {
  title: "NovaVision Pro | Kính thực tế ảo của tương lai",
  description: "Trải nghiệm ranh giới mới của thị giác với NovaVision Pro. Màn hình Micro-OLED 4K, theo dõi mắt thông minh và AI tích hợp.",
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
