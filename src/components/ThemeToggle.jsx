"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.toggle} style={{ width: "44px", height: "44px" }} />;
  }

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
