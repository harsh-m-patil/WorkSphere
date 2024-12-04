import { useState } from 'react';
import { motion } from 'motion/react';

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <motion.div
      className="rounded-3xl bg-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={handleInputChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </motion.div>
  );
};
