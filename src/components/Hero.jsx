"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className={styles.hero}>
      <motion.div className={styles.parallaxBg} style={{ y: yBg }} />
      <div className={`container ${styles.contentWrapper}`}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            Mở Khóa Tầm Nhìn Với <span className={styles.highlight}>NovaVision Pro</span>
          </h1>
          <p className={styles.description}>
            Khám phá ranh giới mới của thị giác. Kính thực tế ảo tăng cường kết hợp trí tuệ nhân tạo, mang thế giới số hòa quyện vào đời thực của bạn.
          </p>
          <div className={styles.actions}>
            <a href="#signup" className="btn-primary">Đặt Trước Ngay</a>
            <a href="#features" className={styles.btnSecondary}>Tính Năng Nổi Bật</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
