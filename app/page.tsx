'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RiddleGenerator from '@/components/RiddleGenerator';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />
      <Hero />
      <RiddleGenerator />
      <About />
      <Footer />
    </motion.main>
  );
}