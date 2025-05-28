import { motion } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}
  
const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};
//@ts-ignore
export function Sidebar({ isOpen, toggle }) {
  return (
    <motion.aside
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ type: 'tween' }}
      className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 z-40">
      <button onClick={toggle} className="text-2xl font-bold mb-6">×</button>
      <nav className="flex flex-col space-y-4">
        <a href="#home" className="hover:text-gray-300">Home</a>
        <a href="#features" className="hover:text-gray-300">Features</a>
        <a href="#pricing" className="hover:text-gray-300">Pricing</a>
        <a href="#contact" className="hover:text-gray-300">Contact</a>
      </nav>
    </motion.aside>
  )
}