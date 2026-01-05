import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GlobalLoading.css';

const LoadingScreen = ({ onComplete, loadingTime = 4000 }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Inicializando sistema…');
  const [isComplete, setIsComplete] = useState(false);
  const progressRef = useRef(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const statuses = [
    { text: 'Inicializando sistema…', emoji: '🔍' },
    { text: 'Iniciando núcleo Nexus...', emoji: '⚙️' },
    { text: 'Verificando integridade dos setores...', emoji: '✅' },
    { text: 'Estabelecendo conexão neural...', emoji: '🧠' },
    { text: 'Carregando módulos de IA...', emoji: '🤖' },
    { text: 'Otimizando desempenho...', emoji: '⚡' },
    { text: 'Sistema pronto.', emoji: '🚀' }
  ];

  const simulateLoading = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const elapsed = timestamp - startTimeRef.current;
    const targetProgress = Math.min((elapsed / loadingTime) * 100, 100);
    
    // Suavização do progresso com easing
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(targetProgress / 100) * 100;
    
    const newProgress = Math.min(easedProgress, 100);
    
    setProgress(newProgress);
    progressRef.current = newProgress;

    // Atualizar status baseado no progresso
    const statusIndex = Math.floor((newProgress / 100) * (statuses.length - 1));
    if (statuses[statusIndex]?.text !== status) {
      setStatus(statuses[statusIndex]?.text || 'Carregando...');
    }

    if (newProgress < 100) {
      animationFrameRef.current = requestAnimationFrame(simulateLoading);
    } else {
      // Pequeno delay antes de completar
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }, 300);
    }
  }, [loadingTime, onComplete, status, statuses]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(simulateLoading);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [simulateLoading]);

  const getStatusEmoji = () => {
    const statusIndex = statuses.findIndex(s => s.text === status);
    return statuses[statusIndex]?.emoji || '⚙️';
  };

  const formatTimeRemaining = () => {
    const remaining = ((100 - progress) / 100) * (loadingTime / 1000);
    return remaining > 1 ? `${remaining.toFixed(1)}s` : 'Quase pronto...';
  };

  const getProgressColor = () => {
    if (progress < 30) return 'from-blue-600 to-cyan-500';
    if (progress < 70) return 'from-cyan-500 to-purple-500';
    return 'from-purple-500 to-green-500';
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Background com múltiplas camadas */}
          <div className="background-layers">
            <motion.div
              className="pulse-layer pulse-layer-1"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="pulse-layer pulse-layer-2"
              animate={{ 
                scale: [1.2, 1.6, 1.2],
                opacity: [0.05, 0.2, 0.05],
                rotate: [180, 360, 540]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />
            <motion.div
              className="pulse-layer pulse-layer-3"
              animate={{ 
                scale: [0.8, 1.3, 0.8],
                opacity: [0.08, 0.15, 0.08]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Conteúdo principal */}
          <div className="loading-content">
            {/* Logo/Ícone animado */}
            <motion.div
              className="loading-icon"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="icon-wrapper">
                <motion.div 
                  className="icon-outer"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  {getStatusEmoji()}
                </motion.div>
                <motion.div 
                  className="icon-inner"
                  animate={{ 
                    rotate: 360,
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <span className="status-emoji">⚡</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Status e informações */}
            <div className="status-container">
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="status-text-container"
              >
                <span className="status-emoji-current">{getStatusEmoji()}</span>
                <h2 className="status-text">{status}</h2>
              </motion.div>

              {/* Barra de progresso */}
              <div className="progress-section">
                <div className="progress-header">
                  <div className="progress-info">
                    <span className="progress-label">Progresso do sistema</span>
                    <span className="progress-time">{formatTimeRemaining()}</span>
                  </div>
                  <div className="progress-percentage">
                    {Math.round(progress)}%
                  </div>
                </div>

                <div className="progress-bar-container">
                  <div className="progress-bar-background">
                    <motion.div
                      className={`progress-bar-fill ${getProgressColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                      }}
                    />
                    <motion.div 
                      className="progress-bar-glow"
                      animate={{ 
                        left: [`${progress}%`, `${progress + 10}%`, `${progress}%`]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Marcadores de progresso */}
                  <div className="progress-markers">
                    {statuses.map((_, index) => (
                      <div 
                        key={index}
                        className={`progress-marker ${
                          progress >= (index / (statuses.length - 1)) * 100 
                            ? 'active' 
                            : ''
                        }`}
                        style={{ left: `${(index / (statuses.length - 1)) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Detalhes do sistema */}
              <div className="system-details">
                <div className="system-info">
                  <div className="system-item">
                    <span className="system-label">Transita.IA</span>
                    
                  </div>
                  <div className="system-item">
                    <span className="system-label">Build</span>
                    <span className="system-value">#NX-2024-01</span>
                  </div>
                  <div className="system-item">
                    <span className="system-label">Status</span>
                    <motion.span 
                      className="system-value status-indicator"
                      animate={{ 
                        color: progress < 100 ? '#FF6A00' : '#10B981'
                      }}
                    >
                      {progress < 100 ? 'INICIALIZANDO' : 'PRONTO'}
                    </motion.span>
                  </div>
                </div>

                {/* Indicadores de atividade */}
                <div className="activity-indicators">
                  <motion.div 
                    className="activity-dot"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div 
                    className="activity-dot"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: 0.2
                    }}
                  />
                  <motion.div 
                    className="activity-dot"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: 0.4
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <motion.div 
            className="loading-footer"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="footer-text">
              ⚡ Sistema de carregamento otimizado • Segurança máxima ativada
            </span>
            <span className="footer-version">
              © 2025 Transita.IA 
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;