import { motion } from 'motion/react';

const Button = ({ text, onClick }) => {
  return (
    <motion.button
      className="rounded-xl bg-gradient-to-r from-green-300 via-green-400 to-green-500 p-3 px-8 text-black shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
