import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSocket } from '../../../contextApis/SocketContext';


const LogOut = () => {
  const navigate = useNavigate();
  const { disconnectSocket } = useSocket();

  useEffect(() => {
    // Clear storage
    localStorage.removeItem('token');
    sessionStorage.clear();

    const timer = setTimeout(() => {
      disconnectSocket()
      navigate('/auth/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, disconnectSocket]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.6
      }
    })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md"
      >
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Logging Out
            <motion.span
              custom={0}
              variants={dotVariants}
              className="inline-block ml-1"
            >.</motion.span>
            <motion.span
              custom={1}
              variants={dotVariants}
              className="inline-block"
            >.</motion.span>
            <motion.span
              custom={2}
              variants={dotVariants}
              className="inline-block"
            >.</motion.span>
          </motion.h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-gray-600 mb-6"
        >
          You've been successfully logged out
        </motion.p>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-center">
            <motion.p 
              className="text-gray-500 mr-2"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              Redirecting
            </motion.p>
            <motion.div
              className="flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 pt-4 border-t border-gray-100"
          variants={itemVariants}
        >
          <motion.p 
            className="text-sm text-gray-400"
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            Thank you for using our service
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LogOut;