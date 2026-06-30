"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi là trợ lý ảo Nova. Bạn cần tư vấn thêm thông tin gì về NovaVision Pro?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // User message
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Call Backend API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "Xin lỗi, máy chủ của tôi đang quá tải. Vui lòng thử lại sau.", isBot: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Mất kết nối mạng. Xin vui lòng kiểm tra lại.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button className={styles.fab} onClick={() => setIsOpen(true)}>
        💬
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className={styles.header}>
              <h4>Nova Assistant 🤖</h4>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <div className={styles.messages}>
              {messages.map((msg, idx) => (
                <div key={idx} className={msg.isBot ? styles.botMsg : styles.userMsg}>
                  {msg.text}
                </div>
              ))}
              {isTyping && <div className={styles.botMsg}>Đang suy nghĩ...</div>}
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.inputArea} onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Nhập câu hỏi..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit">Gửi</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
