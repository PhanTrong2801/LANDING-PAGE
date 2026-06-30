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
  openGraph: {
    title: "NovaVision Pro | Kính thực tế ảo của tương lai",
    description: "Trải nghiệm ranh giới mới của thị giác với NovaVision Pro.",
    url: 'https://landing-page.vercel.app',
    siteName: 'NovaVision Pro',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'NovaVision Pro Kính Thực Tế Ảo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
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
