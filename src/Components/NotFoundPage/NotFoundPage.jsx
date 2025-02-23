import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-[#F8F9FA] dark:bg-[#1F2937]  shadow-lg rounded-2xl p-10 text-center"
      >
        <AlertCircle className="text-[#0AAD0A] w-16 h-16 mx-auto" />
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mt-4">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Oops! The page you are looking for does not exist.</p>
        
        <Link to="/" className="mt-6 inline-block bg-[#0AAD0A] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
