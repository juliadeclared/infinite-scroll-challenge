import React from 'react';
import { motion, useViewportScroll } from 'framer-motion';

const logoVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
    },
  },
};

export default function Header() {
  const { scrollYProgress } = useViewportScroll();

  return (
    <div className="header">
      <div>
        <motion.img
          src={process.env.PUBLIC_URL + '/logo.png'}
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          alt="logo"
          className="logo"
        />
      </div>
      <motion.h1>SCROLL ME!</motion.h1>
    </div>
  );
}
