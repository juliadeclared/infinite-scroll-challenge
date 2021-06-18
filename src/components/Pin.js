import React from 'react';
import { motion } from 'framer-motion';

export default function Pin({ url, key, customClick }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 40,
        delay: 0.1,
      }}
      onClick={customClick}
    >
      <img src={url} key={key} alt="" className="pin" />
    </motion.div>
  );
}
