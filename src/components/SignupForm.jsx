"use client";
import { useState } from 'react';
import styles from './SignupForm.module.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    
    // KẾT NỐI DỮ LIỆU RA BÊN NGOÀI: Gọi Database nội bộ (Vercel KV)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.status === 409) {
        setStatus('duplicate');
        return;
      }
      
      if (!response.ok) throw new Error("Server error");
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="signup" className={styles.signupSection}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Đăng Ký Đặt Trước (Pre-order)</h2>
          <p className={styles.desc}>Trở thành một trong 100 người đầu tiên sở hữu NovaVision Pro và nhận ưu đãi giảm giá 20%.</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Nhập địa chỉ email của bạn..." 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>Đăng Ký Ưu Đãi</button>
          </form>
          
          {status === 'success' && <p className={styles.success}>🎉 Chúc mừng bạn đã đăng ký thành công!</p>}
          {status === 'duplicate' && <p className={styles.error}>⚠️ Email này đã được đăng ký trước đó.</p>}
          {status === 'error' && <p className={styles.error}>⚠️ Vui lòng nhập địa chỉ email hợp lệ.</p>}
        </div>
      </div>
    </section>
  );
}
