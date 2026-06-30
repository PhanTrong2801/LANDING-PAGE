"use client";
import { motion } from 'framer-motion';
import styles from './Features.module.css';

export default function Features() {
  const specs = [
    {
      title: "Micro-OLED 4K Kép",
      desc: "Trải nghiệm hình ảnh sắc nét đến từng điểm ảnh với màn hình Micro-OLED độ phân giải 4K cho mỗi mắt.",
      icon: "🖥️"
    },
    {
      title: "Theo Dõi Mắt Thông Minh",
      desc: "Điều hướng toàn bộ giao diện chỉ bằng ánh nhìn. Camera hồng ngoại theo dõi chuyển động mắt với độ trễ gần bằng không.",
      icon: "👁️"
    },
    {
      title: "Trợ Lý AI Tích Hợp",
      desc: "Trí tuệ nhân tạo phân tích môi trường xung quanh real-time, cung cấp thông tin trực quan ngay trước mắt bạn.",
      icon: "🧠"
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
