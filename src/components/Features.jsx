"use client";
import { motion } from 'framer-motion';
import styles from './Features.module.css';

export default function Features() {
  const specs = [
    {
      title: "Hiệu Năng Tối Đa",
      desc: "PageSpeed luôn đạt > 85 điểm nhờ Server-Side Rendering và tối ưu tài nguyên tĩnh tự động.",
      icon: "⚡"
    },
    {
      title: "SEO Tuyệt Đối",
      desc: "Metadata API và Semantic HTML giúp bọ tìm kiếm Google đọc hiểu nội dung ngay lập tức.",
      icon: "🔍"
    },
    {
      title: "Khả Năng Mở Rộng",
      desc: "Sẵn sàng tích hợp hệ thống thương mại điện tử mini hoặc Chatbot AI mà không lo nghẽn cổ chai.",
      icon: "🚀"
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Tính Năng Nổi Bật
        </motion.h2>
        <div className={styles.grid}>
          {specs.map((spec, index) => (
            <motion.div 
              key={index} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.icon}>{spec.icon}</div>
              <h3 className={styles.cardTitle}>{spec.title}</h3>
              <p className={styles.cardDesc}>{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
