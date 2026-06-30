import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';
import Chatbot from '@/components/Chatbot';
import ScrollPopup from '@/components/ScrollPopup';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <SignupForm />
      <Chatbot />
      <ScrollPopup />
    </main>
  );
}
