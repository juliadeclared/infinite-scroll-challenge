import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import DownArrow from './DownArrow';

export default function HomePageFade() {
  const [previousYPosition] = useState(0);
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentYposition = window.scrollY;
      const isScrollingDown = currentYposition > previousYPosition;

      setStartFade(isScrollingDown);
    };
    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, [previousYPosition]);

  return (
    <motion.div
      className="fade-component"
      initial={{ opacity: 0 }}
      animate={{ opacity: startFade ? 0 : 1 }}
      transition={{ opacity: { duration: 0.35 } }}
    >
      <DownArrow />
    </motion.div>
  );
}
