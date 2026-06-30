"use client";
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            Xây Dựng Website <span className={styles.highlight}>Tương Lai</span>
          </h1>
          <p className={styles.description}>
            Trải nghiệm tốc độ tải trang cực nhanh, tối ưu điểm số SEO và giao diện hiện đại với công nghệ Next.js đỉnh cao.
          </p>
          <div className={styles.actions}>
            <a href="#signup" className="btn-primary">Đăng Ký Trải Nghiệm</a>
            <a href="#features" className={styles.btnSecondary}>Tìm Hiểu Thêm</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
