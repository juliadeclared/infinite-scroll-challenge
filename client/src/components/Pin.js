import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Pin({ url, key, pinInfo, customClick }) {
  const [isHovered, setHovered] = useState(false);

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={customClick}
    >
      <img src={url} key={key} alt="" className="pin" />
    </motion.div>
  );
}
