import { motion } from "framer-motion";
import React from "react";
import "./GlobalLoading.css";
export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="loading-logo"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear"
        }}
      >
        ⚙️
      </motion.div>

      <p>Carregando sistema…</p>
    </motion.div>
  );
}
