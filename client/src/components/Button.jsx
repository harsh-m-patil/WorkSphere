import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
const Button = ({ text, onClick, className }) => {
  return (
    <motion.button
      className={twMerge(
        'rounded-xl bg-gradient-to-br from-green-300 via-green-400 to-green-300 p-3 px-8 text-black shadow-xl',
        className
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
