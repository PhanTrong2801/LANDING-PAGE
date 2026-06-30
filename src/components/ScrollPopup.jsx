"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScrollPopup.module.css';

export default function ScrollPopup() {
  const [show, setShow] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasDismissed) return;
      const scrolled = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && scrolled / totalHeight > 0.5) {
        setShow(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasDismissed]);

  const handleDismiss = () => {
    setShow(false);
    setHasDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className={styles.popup}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className={styles.content}>
            <button className={styles.closeBtn} onClick={handleDismiss}>×</button>
            <h4>Ưu đãi giới hạn! 🎁</h4>
            <p>Đừng bỏ lỡ giảm giá 20% khi đăng ký đặt trước hôm nay.</p>
            <a href="#signup" className={`btn-primary ${styles.btn}`} onClick={handleDismiss}>
              Nhận Ngay Ưu Đãi
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
