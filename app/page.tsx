

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const words = ['Students', 'Dreamers', 'Makers'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const word = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < word.length) {
          setCurrentText(word.substring(0, currentText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(word.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="min-h-screen flex flex-col justify-start items-center text-white relative nd:pt-[150px] pt-[180px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Video Background */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/bg.png')]" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-1" />
        
        
        {/* Hero content */}
        <motion.div 
          className="relative z-10 text-center px-4 md:max-w-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl mb-6 leading-tight"
            style={{ fontFamily: 'The Seasons, serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Free Tools for Students
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Curated free tools for{' '}
            <span 
              className="inline-block md:w-[94px] w-[86px] text-left"
              style={{ fontFamily: 'The Seasons', fontWeight: 700 }}
            >
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
             In a world of noise, cut the noise and build with clarity.
          </motion.p>
          
          <motion.button 
            className="relative px-8 py-2 pt-3 rounded-full text-lg font-medium transition-all duration-300 overflow-hidden text-white hover:scale-105"
            style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.5),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 4px 2px rgba(255, 255, 255, 0.2)
              `
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/resources" className="relative z-10 flex items-center justify-center">
              <span>Unlock Your Benefits</span>
              <img src="/arrow.png" alt="Arrow" className="ml-2 w-10 h-10 mb-1" />
            </Link>
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
              }}
            />
            <div 
              className="absolute top-0 left-0 w-px h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
