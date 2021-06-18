import React from 'react';
import { motion } from 'framer-motion';

import { ExpandMore } from '@material-ui/icons';

export default function DownArrow() {
  return (
    <motion.div
      className="arrow-circle"
      initial={{ y: 8 }}
      animate={{ y: 0 }}
      transition={{ repeatType: "mirror", repeat: Infinity, duration: 1.5 }}
    >
      <motion.div
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={{ repeatType: "mirror", repeat: Infinity, duration: 1.48 }}
      >
        <ExpandMore style={{ fontSize: 60 }} />
      </motion.div>
    </motion.div>
  );
}
