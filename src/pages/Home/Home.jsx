import { useState, useEffect, useRef } from 'react';
import {
  FaRobot, FaTruck, FaRoute, FaChartLine, FaDollarSign,
  FaWrench, FaUserCog, FaBell, FaClock, FaShieldAlt,
  FaMapMarkerAlt, FaGasPump, FaUsers, FaCogs, FaDatabase,
  FaCloud, FaMobileAlt, FaDesktop, FaChartBar, FaFilter,
  FaChevronRight, FaPlay, FaCalendarAlt, FaCheckCircle,
  FaPhone, FaWhatsapp, FaEnvelope, FaVideo, FaComments,
  FaLinkedin, FaInstagram, FaFacebook, FaStar, FaRegStar,
  FaArrowUp, FaArrowDown, FaSync, FaBolt, FaLeaf,
  FaCrown, FaAward, FaMedal, FaTrophy, FaHandshake,
  FaChevronLeft, FaChevronDown, FaBuilding, FaExpandAlt, FaCompressAlt,
  FaPause, FaPlayCircle, FaVolumeUp, FaVolumeMute,
  FaSearch, FaCalculator, FaQuestionCircle, FaLock,
  FaChartPie, FaExclamationTriangle, FaMoneyBillWave,
  FaRegClock, FaSyncAlt, FaDatabase as FaDatabaseIcon,
  FaPlug, FaCog, FaEye, FaEyeSlash, FaPercent,
  FaChevronUp, FaGasPump as FaFuel, FaTools
} from 'react-icons/fa';
import {
  MdDashboard, MdLocationOn, MdAnalytics, MdSecurity,
  MdSpeed, MdTrendingUp, MdAttachMoney, MdPeople,
  MdSettings, MdBuild, MdAssessment, MdShowChart,
  MdVerifiedUser, MdPrecisionManufacturing, MdDevices,
  MdCloudQueue, MdDataUsage, MdSecurityUpdateGood,
  MdOutlineSensors, MdOutlineTravelExplore, MdOutlineEco,
  MdCompareArrows, MdArrowForward, MdCheckCircle,
  MdWarning, MdInfo, MdTimeline, MdBarChart,
  MdPieChart, MdTrendingFlat, MdAccountBalance,
  MdCompare, MdOutlineStorage, MdOutlinePolicy
} from 'react-icons/md';
import {
  GiCarWheel, GiMoneyStack, GiPathDistance, GiMechanicGarage,
  GiElectric, GiProgression, GiNetworkBars, GiSpeedometer,
  GiArtificialIntelligence, GiProcessor, GiMechaHead,
  GiPathDistance as GiRoute, GiMoneyStack as GiProfit,
  GiStopwatch, GiPathDistance as GiDistance
} from 'react-icons/gi';
import { SiAuth0, SiRedux } from 'react-icons/si';
import { TbMap2, TbRoute, TbCalculator, TbShieldCheck, TbChartLine } from 'react-icons/tb';
import { IoStatsChart, IoShieldCheckmark, IoTime, IoCloudUploadOutline } from 'react-icons/io5';
import { RiRobot2Line, RiCustomerService2Line, RiSecurePaymentLine } from 'react-icons/ri';
import { BsLightningFill, BsGraphUp, BsShieldCheck, BsClockHistory } from 'react-icons/bs';
import { AiFillSafetyCertificate, AiOutlinePercentage, AiOutlineRocket } from 'react-icons/ai';
import './Home.css';

// ==========================================================================
// COMPONENTES REUTILIZÁVEIS
// ==========================================================================

// Componente Badge Premium
const PremiumBadge = ({ text, icon, color = 'blue' }) => (
  <div className={`transita-premium-badge badge-${color}`}>
    {icon && <span className="badge-icon">{icon}</span>}
    <span className="badge-text">{text}</span>
  </div>
);

// Componente Metric Card Avançado
const MetricCard = ({ title, value, change, icon, trend = 'up', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div 
      ref={ref}
      className="transita-metric-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <PremiumBadge text="EM TEMPO REAL" />
      </div>
      
      <div className="metric-content">
        <div className="metric-value">
          {typeof value === 'string' && value.includes('R$') ? 'R$ ' : ''}
          {typeof value === 'string' && value.includes('%') ? count.toFixed(1) + '%' : count}
          {typeof value === 'string' && value.includes('h') && !value.includes('R$') && !value.includes('%') ? 'h' : ''}
        </div>
        <div className="metric-title">{title}</div>
      </div>
      
      <div className={`metric-trend trend-${trend}`}>
        {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
        <span>{change}</span>
      </div>
      
      <div className="metric-progress">
        <div 
          className={`progress-bar ${trend}`}
          style={{ width: `${trend === 'up' ? '85%' : '60%'}` }}
        />
      </div>
    </div>
  );
};

// Componente Animated Counter
const AnimatedCounter = ({ value, suffix = '', duration = 1500, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const target = parseFloat(value);
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(parseFloat(current.toFixed(decimals)));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value, duration, decimals]);

  return (
    <span ref={ref} className="animated-counter">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Componente Video Hero Interativo
const VideoHero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
      }
    };

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        
        // Controlar velocidade do vídeo baseado na posição do mouse
        if (videoRef.current) {
          const normalizedX = (x / rect.width) * 2 - 1; // -1 a 1
          const playbackRate = 0.5 + Math.abs(normalizedX); // 0.5x a 1.5x
          videoRef.current.playbackRate = playbackRate;
        }
      }
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const heroHeight = containerRef.current?.offsetHeight || 0;
      const progress = Math.min(scrollTop / heroHeight, 1);
      setScrollProgress(progress);
      
      // Efeito parallax no vídeo
      if (videoRef.current) {
        const parallaxValue = progress * 20; // 20% de movimento
        videoRef.current.style.transform = `translateY(${parallaxValue}%) scale(${1 + progress * 0.1})`;
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration);
      });
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const seekTime = percentage * duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      className="video-hero-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background com Efeito Parallax */}
      <div className="video-background">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted={isMuted}
          loop
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-3457-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-trucks-on-a-highway-from-above-3456-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay Gradiente */}
        <div className="video-overlay">
          <div className="overlay-gradient overlay-top" />
          <div className="overlay-gradient overlay-bottom" />
          <div className="overlay-gradient overlay-left" />
          <div className="overlay-gradient overlay-right" />
        </div>
        
        {/* Efeitos Visuais */}
        <div className="video-effects">
          <div 
            className="scan-line"
            style={{ 
              top: `${mousePosition.y}px`,
              opacity: isHovered ? 0.6 : 0.2 
            }}
          />
          <div 
            className="mouse-glow"
            style={{ 
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              opacity: isHovered ? 1 : 0.5 
            }}
          />
          
          {/* Grid Interativo */}
          <div className="interactive-grid">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="grid-line"
                style={{
                  transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Controles do Vídeo */}
      <div className={`video-controls ${isHovered ? 'visible' : ''}`}>
        <div className="controls-top">
          <div className="control-group">
            <button 
              className="control-btn"
              onClick={handleSkipBackward}
              title="Voltar 10s"
            >
              <FaChevronLeft />
              <span>10s</span>
            </button>
            
            <button 
              className="control-btn play-btn"
              onClick={handlePlayPause}
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? <FaPause /> : <FaPlayCircle />}
            </button>
            
            <button 
              className="control-btn"
              onClick={handleSkipForward}
              title="Avançar 10s"
            >
              <span>10s</span>
              <FaChevronRight />
            </button>
            
            <button 
              className="control-btn volume-btn"
              onClick={handleVolumeToggle}
              title={isMuted ? 'Ativar som' : 'Desativar som'}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
          
          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="time-separator">/</span>
            <span className="total-time">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div 
          ref={progressBarRef}
          className="progress-container"
          onClick={handleSeek}
        >
          <div className="progress-bar-background">
            <div 
              className="progress-bar-fill"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <div 
              className="progress-bar-thumb"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          {/* Marcadores de tempo interativos */}
          <div className="time-markers">
            {[0, 15, 30, 45, 60].map((time) => (
              <div 
                key={time}
                className="time-marker"
                style={{ left: `${(time / duration) * 100}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.currentTime = time;
                  }
                }}
              >
                <div className="marker-dot" />
                <span className="marker-label">{time}s</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicador de Controle por Mouse */}
        <div className="mouse-control-indicator">
          <div className="indicator-text">
            <FaChevronLeft />
            <span>Arraste horizontalmente para controlar velocidade</span>
            <FaChevronRight />
          </div>
          <div className="indicator-subtext">
            Role para baixo para efeito parallax
          </div>
        </div>
      </div>
      
      {/* Indicador de Progresso do Scroll */}
      <div className="scroll-progress-indicator">
        <div className="progress-circle">
          <svg className="progress-ring" width="60" height="60">
            <circle
              className="progress-ring-circle"
              strokeWidth="2"
              fill="transparent"
              r="27"
              cx="30"
              cy="30"
              style={{
                strokeDasharray: 169.56,
                strokeDashoffset: 169.56 - (scrollProgress * 169.56)
              }}
            />
          </svg>
          <div className="progress-percentage">
            {Math.round(scrollProgress * 100)}%
          </div>
        </div>
        <div className="scroll-hint">
          <FaChevronDown className="bounce" />
        </div>
      </div>
    </div>
  );
};

// ==========================================================================
// NOVOS COMPONENTES ADICIONADOS
// ==========================================================================

// Componente Mini Demo Interativa
const InteractiveDemo = () => {
  const [activeDemo, setActiveDemo] = useState('route');
  const [simulationRunning, setSimulationRunning] = useState(true);
  const [savings, setSavings] = useState(28470);
  const [alerts, setAlerts] = useState(3);
  const [optimization, setOptimization] = useState(87);
  const intervalRef = useRef(null);

  const demos = [
    {
      id: 'route',
      title: 'Otimização de Rotas',
      icon: <TbRoute />,
      description: 'Veja como a IA encontra a rota mais eficiente em tempo real',
      metrics: {
        distance: '245 km',
        time: '3h 45m',
        savings: '18%',
        fuel: '42L'
      },
      color: 'blue'
    },
    {
      id: 'fine',
      title: 'Gestão de Multas',
      icon: <FaBell />,
      description: 'Sistema automático de identificação e contestação de multas',
      metrics: {
        detected: '7 multas',
        contested: '5 contestações',
        saved: 'R$ 2.850',
        time: '24h'
      },
      color: 'orange'
    },
    {
      id: 'savings',
      title: 'Economia em Tempo Real',
      icon: <FaChartLine />,
      description: 'Monitoramento contínuo de redução de custos',
      metrics: {
        monthly: 'R$ 28.470',
        daily: 'R$ 949',
        vehicles: '24 ativos',
        roi: '320%'
      },
      color: 'green'
    },
    {
      id: 'maintenance',
      title: 'Manutenção Preditiva',
      icon: <FaWrench />,
      description: 'Antecipação de falhas e otimização de manutenções',
      metrics: {
        predicted: '3 alertas',
        downtime: '-45%',
        cost: '-30%',
        lifespan: '+20%'
      },
      color: 'purple'
    }
  ];

  const activeDemoData = demos.find(d => d.id === activeDemo);

  useEffect(() => {
    if (simulationRunning) {
      intervalRef.current = setInterval(() => {
        setSavings(prev => prev + Math.floor(Math.random() * 100));
        setOptimization(prev => Math.min(99, prev + Math.random() * 0.5));
        if (Math.random() > 0.8) {
          setAlerts(prev => Math.max(0, prev - 1));
        }
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [simulationRunning]);

  const handleDemoClick = (demoId) => {
    setActiveDemo(demoId);
    // Reset animation
    setSimulationRunning(false);
    setTimeout(() => setSimulationRunning(true), 100);
  };

  return (
    <div className="interactive-demo-section">
      <div className="demo-header">
        <h2>Veja a IA em Ação</h2>
        <p className="demo-subtitle">
          Dashboard interativo que mostra resultados em tempo real
        </p>
        <div className="demo-controls">
          <button 
            className={`demo-control ${simulationRunning ? 'active' : ''}`}
            onClick={() => setSimulationRunning(!simulationRunning)}
          >
            {simulationRunning ? <FaPause /> : <FaPlayCircle />}
            <span>{simulationRunning ? 'Pausar' : 'Continuar'} Simulação</span>
          </button>
          <button className="demo-control">
            <FaSyncAlt />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      <div className="demo-container">
        <div className="demo-selector">
          {demos.map((demo) => (
            <button
              key={demo.id}
              className={`demo-selector-btn ${activeDemo === demo.id ? 'active' : ''}`}
              onClick={() => handleDemoClick(demo.id)}
              data-color={demo.color}
            >
              <div className="selector-icon">{demo.icon}</div>
              <span className="selector-title">{demo.title}</span>
            </button>
          ))}
        </div>

        <div className="demo-content">
          <div className="demo-visualization">
            <div className="visualization-header">
              <h3>{activeDemoData.title}</h3>
              <span className="demo-live-badge">
                <div className="live-pulse" />
                EM TEMPO REAL
              </span>
            </div>
            
            <div className={`demo-animation demo-${activeDemo}`}>
              {/* Rota Otimizada */}
              {activeDemo === 'route' && (
                <div className="route-demo">
                  <div className="route-map">
                    <div className="route-point start">
                      <FaMapMarkerAlt />
                      <span>Origem</span>
                    </div>
                    <div className="route-point destination">
                      <FaMapMarkerAlt />
                      <span>Destino</span>
                    </div>
                    <div className="route-optimized">
                      <div className="route-line" />
                      <div className="route-vehicle">
                        <FaTruck />
                      </div>
                    </div>
                    <div className="route-traditional">
                      <div className="route-line traditional" />
                    </div>
                    <div className="route-stats">
                      <div className="route-stat">
                        <div className="stat-label">Rota IA</div>
                        <div className="stat-value">245 km</div>
                      </div>
                      <div className="route-stat">
                        <div className="stat-label">Rota Tradicional</div>
                        <div className="stat-value">298 km</div>
                      </div>
                      <div className="route-stat highlight">
                        <div className="stat-label">Economia</div>
                        <div className="stat-value">53 km</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gestão de Multas */}
              {activeDemo === 'fine' && (
                <div className="fine-demo">
                  <div className="fine-alerts">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="fine-alert">
                        <div className="alert-icon">
                          <MdWarning />
                        </div>
                        <div className="alert-content">
                          <div className="alert-title">Multa Detectada</div>
                          <div className="alert-details">
                            Velocidade • R$ 195,23 • 5 pontos
                          </div>
                        </div>
                        <div className="alert-status">
                          <div className="status-badge contesting">
                            <FaSync className="spinning" />
                            Contestando
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="fine-stats">
                    <div className="fine-stat">
                      <div className="stat-value">R$ 2.850</div>
                      <div className="stat-label">Economia Mensal</div>
                    </div>
                    <div className="fine-stat">
                      <div className="stat-value">86%</div>
                      <div className="stat-label">Taxa de Sucesso</div>
                    </div>
                    <div className="fine-stat">
                      <div className="stat-value">24h</div>
                      <div className="stat-label">Tempo Médio</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Economia em Tempo Real */}
              {activeDemo === 'savings' && (
                <div className="savings-demo">
                  <div className="savings-counter">
                    <div className="counter-label">Economia Total</div>
                    <div className="counter-value">
                      R$ <span className="animated-value">{savings.toLocaleString()}</span>
                    </div>
                    <div className="counter-trend">
                      <FaArrowUp />
                      <span>+R$ 949 hoje</span>
                    </div>
                  </div>
                  <div className="savings-chart">
                    <div className="chart-bars">
                      {[65, 80, 45, 90, 70, 85, 95].map((height, i) => (
                        <div key={i} className="chart-bar">
                          <div 
                            className="bar-fill" 
                            style={{ height: `${height}%` }}
                          />
                          <div className="bar-label">Dia {i + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Manutenção Preditiva */}
              {activeDemo === 'maintenance' && (
                <div className="maintenance-demo">
                  <div className="maintenance-grid">
                    <div className="vehicle-status">
                      <div className="vehicle-icon">
                        <FaTruck />
                      </div>
                      <div className="vehicle-info">
                        <div className="vehicle-name">Caminhão BA-2022</div>
                        <div className="vehicle-health">
                          <div className="health-bar">
                            <div 
                              className="health-fill" 
                              style={{ width: '78%' }}
                            />
                          </div>
                          <span className="health-value">78%</span>
                        </div>
                      </div>
                    </div>
                    <div className="maintenance-alerts">
                      <div className="alert critical">
                        <div className="alert-icon">
                          <FaExclamationTriangle />
                        </div>
                        <div className="alert-content">
                          <div className="alert-title">Freios</div>
                          <div className="alert-desc">Troca recomendada em 15 dias</div>
                        </div>
                      </div>
                      <div className="alert warning">
                        <div className="alert-icon">
                          <MdWarning />
                        </div>
                        <div className="alert-content">
                          <div className="alert-title">Pneus</div>
                          <div className="alert-desc">Verificar em 30 dias</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="demo-metrics">
            <div className="metrics-grid">
              {Object.entries(activeDemoData.metrics).map(([key, value]) => (
                <div key={key} className="demo-metric">
                  <div className="metric-value">{value}</div>
                  <div className="metric-label">
                    {key === 'distance' && 'Distância'}
                    {key === 'time' && 'Tempo'}
                    {key === 'savings' && 'Economia'}
                    {key === 'fuel' && 'Combustível'}
                    {key === 'detected' && 'Multas Detectadas'}
                    {key === 'contested' && 'Contestações'}
                    {key === 'saved' && 'Valor Salvo'}
                    {key === 'monthly' && 'Mensal'}
                    {key === 'daily' && 'Diário'}
                    {key === 'vehicles' && 'Veículos'}
                    {key === 'roi' && 'ROI'}
                    {key === 'predicted' && 'Alertas Preditivos'}
                    {key === 'downtime' && 'Redução Downtime'}
                    {key === 'cost' && 'Redução Custos'}
                    {key === 'lifespan' && 'Vida Útil'}
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-insight">
              <div className="insight-icon">
                <GiArtificialIntelligence />
              </div>
              <div className="insight-content">
                <h4>Insight da IA</h4>
                <p>
                  {activeDemo === 'route' && 'Rota otimizada economiza 18% de combustível e reduz o tempo de entrega em 25%.'}
                  {activeDemo === 'fine' && 'Sistema prevê economia de R$ 34.200/ano com gestão automática de multas.'}
                  {activeDemo === 'savings' && 'Projeção indica economia acumulada de R$ 341.640 nos próximos 12 meses.'}
                  {activeDemo === 'maintenance' && 'Manutenção preditiva reduz custos em 30% e aumenta disponibilidade da frota.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Prova Social REAL
const SocialProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [trustMetrics, setTrustMetrics] = useState({
    clients: 524,
    satisfaction: 98.7,
    years: 5,
    retention: 96
  });

  const testimonials = [
    {
      quote: "Reduzimos 32% dos custos operacionais em apenas 3 meses. A IA identificou rotas 40% mais eficientes.",
      author: "Carlos Lima",
      role: "Diretor Logístico",
      company: "Transportes Express",
      logo: "TE",
      metrics: { savings: "32%", time: "3 meses", efficiency: "40%" }
    },
    {
      quote: "O sistema de multas automatizado nos economizou R$ 85.000 no último ano. Simplesmente impressionante.",
      author: "Ana Santos",
      role: "Gerente de Frota",
      company: "Logística Brasil",
      logo: "LB",
      metrics: { savings: "R$ 85.000", period: "1 ano", automation: "100%" }
    },
    {
      quote: "A manutenção preditiva reduziu nosso downtime em 45%. Agora operamos com 99% de disponibilidade.",
      author: "Roberto Almeida",
      role: "COO",
      company: "Cargo Solutions",
      logo: "CS",
      metrics: { downtime: "-45%", availability: "99%", efficiency: "+35%" }
    },
    {
      quote: "Implementamos em toda frota de 200+ veículos. ROI de 320% no primeiro ano. Melhor decisão.",
      author: "Mariana Costa",
      role: "Head de Operações",
      company: "Global Logistics",
      logo: "GL",
      metrics: { vehicles: "200+", roi: "320%", period: "1 ano" }
    }
  ];

  const companies = [
    { name: "AMBEV", logo: "AMBEV", industry: "Bebidas" },
    { name: "VALE", logo: "VALE", industry: "Mineração" },
    { name: "AMAZON", logo: "AMZN", industry: "E-commerce" },
    { name: "MERCEDES-BENZ", logo: "MB", industry: "Automotivo" },
    { name: "NESTLÉ", logo: "NEST", industry: "Alimentos" },
    { name: "UNILEVER", logo: "ULVR", industry: "Consumer Goods" },
    { name: "BRF", logo: "BRF", industry: "Alimentos" },
    { name: "JBS", logo: "JBS", industry: "Alimentos" }
  ];

  return (
    <div className="social-proof-section">
      <div className="section-header">
        <PremiumBadge text="QUEM USA, APROVA" color="orange" />
        <h2 className="section-title">
          Confiança de <span className="gradient-text">Quem Decide</span>
        </h2>
        <p className="section-description">
          Empresas líderes que transformaram suas operações logísticas com a Transita.AI
        </p>
      </div>

      <div className="trust-metrics">
        <div className="trust-metric">
          <div className="metric-value">
            <AnimatedCounter value={trustMetrics.clients} suffix="+" />
          </div>
          <div className="metric-label">Empresas Atendidas</div>
        </div>
        <div className="trust-metric">
          <div className="metric-value">
            <AnimatedCounter value={trustMetrics.satisfaction} suffix="%" decimals={1} />
          </div>
          <div className="metric-label">Satisfação</div>
        </div>
        <div className="trust-metric">
          <div className="metric-value">
            {trustMetrics.years}+
          </div>
          <div className="metric-label">Anos no Mercado</div>
        </div>
        <div className="trust-metric">
          <div className="metric-value">
            <AnimatedCounter value={trustMetrics.retention} suffix="%" />
          </div>
          <div className="metric-label">Retenção de Clientes</div>
        </div>
      </div>

      <div className="companies-logos">
        <h3 className="logos-title">Confiado por líderes do mercado</h3>
        <div className="logos-grid">
          {companies.map((company, index) => (
            <div key={index} className="company-logo">
              <div className="logo-container">
                <div className="logo-text">{company.logo}</div>
              </div>
              <div className="company-info">
                <div className="company-name">{company.name}</div>
                <div className="company-industry">{company.industry}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-section">
        <div className="testimonials-header">
          <h3>Depoimentos Reais</h3>
          <div className="testimonials-nav">
            <button 
              className="nav-btn"
              onClick={() => setActiveTestimonial(prev => Math.max(0, prev - 1))}
            >
              <FaChevronLeft />
            </button>
            <div className="testimonial-indicators">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${activeTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                />
              ))}
            </div>
            <button 
              className="nav-btn"
              onClick={() => setActiveTestimonial(prev => Math.min(testimonials.length - 1, prev + 1))}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`testimonial-card ${activeTestimonial === index ? 'active' : ''}`}
              style={{ transform: `translateX(${(index - activeTestimonial) * 100}%)` }}
            >
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                
                <div className="testimonial-metrics">
                  {Object.entries(testimonial.metrics).map(([key, value]) => (
                    <div key={key} className="testimonial-metric">
                      <div className="metric-value">{value}</div>
                      <div className="metric-label">
                        {key === 'savings' && 'Redução de Custos'}
                        {key === 'time' && 'Tempo'}
                        {key === 'efficiency' && 'Eficiência'}
                        {key === 'period' && 'Período'}
                        {key === 'automation' && 'Automação'}
                        {key === 'downtime' && 'Menos Downtime'}
                        {key === 'availability' && 'Disponibilidade'}
                        {key === 'vehicles' && 'Veículos'}
                        {key === 'roi' && 'ROI'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.logo}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                    <div className="author-company">{testimonial.company}</div>
                  </div>
                  <div className="author-verification">
                    <MdVerifiedUser />
                    <span>Verificado</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Antes vs Depois
const BeforeAfterComparison = () => {
  const [activeTab, setActiveTab] = useState('before');

  const comparisons = [
    {
      category: 'Gestão',
      before: {
        title: 'Planilhas Manuais',
        icon: <FaRegClock />,
        painPoints: ['Erros frequentes', 'Atualização lenta', 'Sem visão em tempo real'],
        color: 'red'
      },
      after: {
        title: 'IA em Tempo Real',
        icon: <FaRobot />,
        benefits: ['Decisões automáticas', 'Atualização instantânea', 'Dashboard 24/7'],
        color: 'green'
      }
    },
    {
      category: 'Multas',
      before: {
        title: 'Processo Manual',
        icon: <FaExclamationTriangle />,
        painPoints: ['Multas perdidas', 'Prazos vencidos', 'Custos altos'],
        color: 'red'
      },
      after: {
        title: 'Automação Inteligente',
        icon: <FaBell />,
        benefits: ['Detecção automática', 'Contestações otimizadas', 'Economia garantida'],
        color: 'green'
      }
    },
    {
      category: 'Manutenção',
      before: {
        title: 'Corretiva (Reativa)',
        icon: <FaWrench />,
        painPoints: ['Paradas inesperadas', 'Custos imprevistos', 'Baixa disponibilidade'],
        color: 'red'
      },
      after: {
        title: 'Preditiva (Proativa)',
        icon: <FaChartLine />,
        benefits: ['Antecipação de falhas', 'Custos otimizados', 'Alta disponibilidade'],
        color: 'green'
      }
    },
    {
      category: 'Financeiro',
      before: {
        title: 'Controle Básico',
        icon: <FaDollarSign />,
        painPoints: ['Custos ocultos', 'ROI incerto', 'Sem previsibilidade'],
        color: 'red'
      },
      after: {
        title: 'Analytics Avançado',
        icon: <MdAnalytics />,
        benefits: ['Custos transparentes', 'ROI mensurável', 'Previsões precisas'],
        color: 'green'
      }
    }
  ];

  return (
    <div className="before-after-section">
      <div className="section-header">
        <PremiumBadge text="TRANSFORMAÇÃO REAL" color="purple" />
        <h2 className="section-title">
          Antes vs <span className="gradient-text">Depois da IA</span>
        </h2>
        <p className="section-description">
          Veja como empresas estão transformando desafios em resultados extraordinários
        </p>
      </div>

      <div className="comparison-tabs">
        <button 
          className={`comparison-tab ${activeTab === 'before' ? 'active' : ''}`}
          onClick={() => setActiveTab('before')}
        >
          <FaEyeSlash />
          <span>Sem Transita.AI</span>
        </button>
        <div className="tab-divider">
          <MdCompareArrows />
        </div>
        <button 
          className={`comparison-tab ${activeTab === 'after' ? 'active' : ''}`}
          onClick={() => setActiveTab('after')}
        >
          <FaEye />
          <span>Com Transita.AI</span>
        </button>
      </div>

      <div className="comparison-grid">
        {comparisons.map((comparison, index) => (
          <div key={index} className="comparison-card">
            <div className="comparison-category">
              <div className="category-icon">
                {activeTab === 'before' ? comparison.before.icon : comparison.after.icon}
              </div>
              <h3>{comparison.category}</h3>
            </div>

            <div className="comparison-content">
              <div className="comparison-state">
                <h4 className={`state-title ${activeTab === 'before' ? 'negative' : 'positive'}`}>
                  {activeTab === 'before' ? comparison.before.title : comparison.after.title}
                </h4>
                
                <div className="state-details">
                  {activeTab === 'before' ? (
                    <div className="pain-points">
                      {comparison.before.painPoints.map((point, i) => (
                        <div key={i} className="pain-point">
                          <div className="point-icon">
                            <MdWarning />
                          </div>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="benefits">
                      {comparison.after.benefits.map((benefit, i) => (
                        <div key={i} className="benefit">
                          <div className="benefit-icon">
                            <MdCheckCircle />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`state-metrics ${activeTab === 'before' ? 'negative' : 'positive'}`}>
                  {activeTab === 'before' ? (
                    <div className="metric negative">
                      <FaArrowDown />
                      <span>Prejuízo</span>
                    </div>
                  ) : (
                    <div className="metric positive">
                      <FaArrowUp />
                      <span>Lucro</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="comparison-visual">
                <div className="visual-container">
                  {activeTab === 'before' ? (
                    <div className="visual-before">
                      <div className="chart-negative">
                        {[30, 45, 25, 60, 35].map((height, i) => (
                          <div key={i} className="bar" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                      <div className="visual-label">Ineficiência</div>
                    </div>
                  ) : (
                    <div className="visual-after">
                      <div className="chart-positive">
                        {[85, 90, 88, 92, 95].map((height, i) => (
                          <div key={i} className="bar" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                      <div className="visual-label">Eficiência</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="comparison-impact">
              <div className="impact-value">
                {activeTab === 'before' ? '-32%' : '+68%'}
              </div>
              <div className="impact-label">
                {activeTab === 'before' ? 'Perda de Eficiência' : 'Ganho de Eficiência'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="transformation-summary">
        <div className="summary-card">
          <h3>Resultado da Transformação</h3>
          <div className="summary-metrics">
            <div className="summary-metric">
              <div className="metric-value">45%</div>
              <div className="metric-label">Redução de Custos</div>
            </div>
            <div className="summary-metric">
              <div className="metric-value">67%</div>
              <div className="metric-label">Aumento de Eficiência</div>
            </div>
            <div className="summary-metric">
              <div className="metric-value">320%</div>
              <div className="metric-label">ROI Médio</div>
            </div>
            <div className="summary-metric">
              <div className="metric-value">98%</div>
              <div className="metric-label">Satisfação</div>
            </div>
          </div>
          <p className="summary-note">
            *Baseado em dados reais de clientes nos últimos 12 meses
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente Como Funciona em 3 Passos
const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: "Conecte sua Frota",
      icon: <FaPlug />,
      description: "Integração rápida com qualquer sistema ou hardware. Comece em minutos.",
      details: [
        "Integração API em 24h",
        "Sem necessidade de hardware adicional",
        "Compatible com todos os sistemas"
      ],
      color: "blue",
      duration: "2 dias"
    },
    {
      number: 2,
      title: "A IA Analisa Tudo",
      icon: <FaRobot />,
      description: "Nossa inteligência artificial processa dados em tempo real e gera insights.",
      details: [
        "Análise preditiva 24/7",
        "Alertas inteligentes",
        "Otimização automática"
      ],
      color: "purple",
      duration: "Imediato"
    },
    {
      number: 3,
      title: "Você Lucra Mais",
      icon: <FaChartLine />,
      description: "Tome decisões baseadas em dados e veja os resultados financeiros.",
      details: [
        "ROI visível em 30 dias",
        "Redução de custos garantida",
        "Escalabilidade automática"
      ],
      color: "green",
      duration: "30 dias"
    }
  ];

  return (
    <div className="how-it-works-section">
      <div className="section-header">
        <PremiumBadge text="SIMPLES E PODEROSO" color="blue" />
        <h2 className="section-title">
          Como Funciona em <span className="gradient-text">3 Passos</span>
        </h2>
        <p className="section-description">
          Implementação rápida, resultados imediatos. Foco no que importa: seu lucro.
        </p>
      </div>

      <div className="steps-container">
        <div className="steps-progress">
          <div className="progress-line">
            <div 
              className="progress-fill" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          <div className="steps-indicators">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-indicator ${activeStep === index ? 'active' : ''}`}
                onClick={() => setActiveStep(index)}
                data-color={step.color}
              >
                <div className="indicator-number">{step.number}</div>
                <div className="indicator-dot" />
              </button>
            ))}
          </div>
        </div>

        <div className="steps-content">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`step-card ${activeStep === index ? 'active' : ''}`}
              style={{ display: activeStep === index ? 'block' : 'none' }}
            >
              <div className="step-header">
                <div className="step-icon" style={{ background: `var(--${step.color}-500)` }}>
                  {step.icon}
                </div>
                <div className="step-titles">
                  <div className="step-number">Passo {step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <div className="step-duration">
                    <FaClock />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>

              <p className="step-description">{step.description}</p>

              <div className="step-details">
                {step.details.map((detail, i) => (
                  <div key={i} className="step-detail">
                    <div className="detail-check">
                      <FaCheckCircle />
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="step-visual">
                <div className={`visual-animation step-${step.number}`}>
                  {step.number === 1 && (
                    <div className="connection-animation">
                      <div className="device">
                        <FaTruck />
                        <span>Veículo</span>
                      </div>
                      <div className="connection-line">
                        <div className="data-flow" />
                      </div>
                      <div className="device">
                        <FaCloud />
                        <span>Plataforma</span>
                      </div>
                    </div>
                  )}
                  {step.number === 2 && (
                    <div className="analysis-animation">
                      <div className="ai-brain">
                        <FaRobot />
                      </div>
                      <div className="data-points">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="data-point" />
                        ))}
                      </div>
                      <div className="insights">
                        <div className="insight">📈 +45%</div>
                        <div className="insight">💰 R$ 28K</div>
                        <div className="insight">⏱️ -3h</div>
                      </div>
                    </div>
                  )}
                  {step.number === 3 && (
                    <div className="results-animation">
                      <div className="profit-chart">
                        <div className="chart-growth">
                          {[30, 45, 65, 85, 95].map((height, i) => (
                            <div key={i} className="growth-bar" style={{ height: `${height}%` }} />
                          ))}
                        </div>
                      </div>
                      <div className="profit-metrics">
                        <div className="profit-metric">
                          <div className="metric-value">R$ 28.470</div>
                          <div className="metric-label">Economia Mensal</div>
                        </div>
                        <div className="profit-metric">
                          <div className="metric-value">320%</div>
                          <div className="metric-label">ROI</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="steps-navigation">
          <button 
            className="nav-btn"
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            <FaChevronLeft />
            <span>Anterior</span>
          </button>
          
          <div className="steps-counter">
            <span className="current-step">{activeStep + 1}</span>
            <span className="steps-total">/{steps.length}</span>
          </div>
          
          <button 
            className="nav-btn"
            onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStep === steps.length - 1}
          >
            <span>Próximo</span>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="implementation-timeline">
        <h3>Timeline de Implementação</h3>
        <div className="timeline-steps">
          <div className="timeline-step">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-title">Dia 1-2: Integração</div>
              <div className="timeline-desc">Conectamos sua frota</div>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-title">Dia 3-7: Análise</div>
              <div className="timeline-desc">IA identifica oportunidades</div>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-title">Dia 8-30: Otimização</div>
              <div className="timeline-desc">Resultados começam a aparecer</div>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-title">Mês 2+: Escala</div>
              <div className="timeline-desc">Economia crescente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente ROI Calculator
const ROICalculator = () => {
  const [vehicles, setVehicles] = useState(10);
  const [monthlyKm, setMonthlyKm] = useState(50000);
  const [avgCost, setAvgCost] = useState(2.5);
  const [efficiency, setEfficiency] = useState(25);

  const calculateROI = () => {
    const monthlyFuelCost = monthlyKm * avgCost;
    const monthlySavings = monthlyFuelCost * (efficiency / 100);
    const annualSavings = monthlySavings * 12;
    const finesSavings = vehicles * 250; // Média de multas por veículo
    const maintenanceSavings = vehicles * 500; // Manutenção preditiva
    const totalMonthlySavings = monthlySavings + finesSavings + maintenanceSavings;
    const totalAnnualSavings = totalMonthlySavings * 12;
    
    return {
      monthlyFuelCost,
      monthlySavings,
      annualSavings,
      finesSavings,
      maintenanceSavings,
      totalMonthlySavings,
      totalAnnualSavings,
      roiPercentage: Math.round((totalAnnualSavings / (vehicles * 200)) * 100) // Investimento estimado
    };
  };

  const results = calculateROI();

  return (
    <div className="roi-calculator-section">
      <div className="section-header">
        <PremiumBadge text="CALCULADORA DE ROI" color="green" />
        <h2 className="section-title">
          Veja Quanto Você Pode <span className="gradient-text">Economizar</span>
        </h2>
        <p className="section-description">
          Simule o retorno do investimento baseado na sua operação atual
        </p>
      </div>

      <div className="calculator-container">
        <div className="calculator-inputs">
          <div className="input-group">
            <label htmlFor="vehicles">
              <FaTruck />
              <span>Número de Veículos</span>
            </label>
            <div className="input-with-slider">
              <input
                type="range"
                id="vehicles"
                min="1"
                max="100"
                value={vehicles}
                onChange={(e) => setVehicles(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">
                <span>{vehicles}</span>
                <div className="value-badge">veículos</div>
              </div>
            </div>
            <div className="input-presets">
              {[5, 10, 25, 50, 100].map(preset => (
                <button
                  key={preset}
                  className={`preset-btn ${vehicles === preset ? 'active' : ''}`}
                  onClick={() => setVehicles(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="monthlyKm">
              <GiPathDistance />
              <span>Quilometragem Mensal Total</span>
            </label>
            <div className="input-with-slider">
              <input
                type="range"
                id="monthlyKm"
                min="1000"
                max="500000"
                step="1000"
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">
                <span>{monthlyKm.toLocaleString()}</span>
                <div className="value-badge">km/mês</div>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="avgCost">
              <FaGasPump />
              <span>Custo Médio por Km</span>
            </label>
            <div className="input-with-slider">
              <input
                type="range"
                id="avgCost"
                min="1"
                max="5"
                step="0.1"
                value={avgCost}
                onChange={(e) => setAvgCost(parseFloat(e.target.value))}
                className="slider"
              />
              <div className="slider-value">
                <span>R$ {avgCost.toFixed(2)}</span>
                <div className="value-badge">por km</div>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="efficiency">
              <FaChartLine />
              <span>Ganho de Eficiência Esperado</span>
            </label>
            <div className="input-with-slider">
              <input
                type="range"
                id="efficiency"
                min="15"
                max="40"
                value={efficiency}
                onChange={(e) => setEfficiency(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">
                <span>{efficiency}%</span>
                <div className="value-badge">redução de custos</div>
              </div>
            </div>
            <div className="efficiency-notes">
              <div className="note">
                <FaCheckCircle />
                <span>Média dos clientes: 25-35%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="calculator-results">
          <div className="results-header">
            <h3>Seu Retorno Financeiro</h3>
            <div className="results-badge">
              <FaPercent />
              <span>ROI {results.roiPercentage}%</span>
            </div>
          </div>

          <div className="results-main">
            <div className="main-result">
              <div className="result-label">Economia Mensal Estimada</div>
              <div className="result-value">
                R$ {results.totalMonthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="result-trend">
                <FaArrowUp />
                <span>Recorrente todo mês</span>
              </div>
            </div>

            <div className="results-breakdown">
              <h4>Detalhamento da Economia</h4>
              <div className="breakdown-items">
                <div className="breakdown-item">
                  <div className="item-label">
                    <FaGasPump />
                    <span>Combustível</span>
                  </div>
                  <div className="item-value">
                    R$ {results.monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="item-label">
                    <FaBell />
                    <span>Multas</span>
                  </div>
                  <div className="item-value">
                    R$ {results.finesSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="item-label">
                    <FaWrench />
                    <span>Manutenção</span>
                  </div>
                  <div className="item-value">
                    R$ {results.maintenanceSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

            <div className="annual-projection">
              <div className="projection-header">
                <h4>Projeção Anual</h4>
                <div className="projection-badge">12 meses</div>
              </div>
              <div className="projection-value">
                R$ {results.totalAnnualSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="projection-chart">
                {[30, 45, 65, 85, 95, 100].map((height, i) => (
                  <div key={i} className="chart-column">
                    <div 
                      className="column-fill" 
                      style={{ height: `${height}%` }}
                    />
                    <div className="column-label">Mês {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="roi-summary">
              <div className="roi-metric">
                <div className="metric-value">{results.roiPercentage}%</div>
                <div className="metric-label">Retorno sobre Investimento</div>
              </div>
              <div className="roi-metric">
                <div className="metric-value">
                  {Math.ceil(1000000 / results.totalAnnualSavings)} meses
                </div>
                <div className="metric-label">Payback</div>
              </div>
            </div>
          </div>

          <div className="results-cta">
            <button className="transita-btn transita-btn-primary transita-btn-xl">
              <span>Quero Essa Economia</span>
              <FaArrowUp />
            </button>
            <div className="results-guarantee">
              <FaShieldAlt />
              <span>Garantia de resultados em 90 dias ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Segurança & Compliance
const SecurityCompliance = () => {
  const [activeSecurity, setActiveSecurity] = useState('lgpd');

  const securityFeatures = [
    {
      id: 'lgpd',
      title: 'LGPD Compliance',
      icon: <AiFillSafetyCertificate />,
      description: 'Total conformidade com a Lei Geral de Proteção de Dados',
      features: [
        'Anonimização de dados',
        'Consentimento explícito',
        'Relatórios de auditoria',
        'DPO dedicado'
      ],
      certifications: ['LGPD', 'ISO 27001']
    },
    {
      id: 'encryption',
      title: 'Criptografia Avançada',
      icon: <FaLock />,
      description: 'Proteção de dados em trânsito e em repouso',
      features: [
        'AES-256 encryption',
        'SSL/TLS 1.3',
        'Chaves criptográficas próprias',
        'Zero-knowledge architecture'
      ],
      certifications: ['FIPS 140-2', 'NIST']
    },
    {
      id: 'sla',
      title: 'SLA 99.9%',
      icon: <FaShieldAlt />,
      description: 'Disponibilidade garantida com compensação financeira',
      features: [
        '99.9% uptime garantido',
        'Backup automático',
        'Recuperação de desastres',
        'Monitoramento 24/7'
      ],
      certifications: ['SLA 99.9%', 'ISO 22301']
    },
    {
      id: 'backup',
      title: 'Backup Automático',
      icon: <FaCloud />,
      description: 'Proteção contra perda de dados com recuperação instantânea',
      features: [
        'Backup em tempo real',
        '3 cópias em locais diferentes',
        'Recuperação em 15 minutos',
        'Versionamento ilimitado'
      ],
      certifications: ['RPO 5min', 'RTO 15min']
    }
  ];

  const complianceStandards = [
    { name: 'ISO 27001', icon: <BsShieldCheck />, status: 'Certificado' },
    { name: 'LGPD', icon: <AiFillSafetyCertificate />, status: 'Compliant' },
    { name: 'SOC 2', icon: <TbShieldCheck />, status: 'Em auditoria' },
    { name: 'NIST', icon: <MdSecurity />, status: 'Alinhado' },
    { name: 'GDPR', icon: <FaShieldAlt />, status: 'Compliant' },
    { name: 'HIPAA', icon: <IoShieldCheckmark />, status: 'Compatível' }
  ];

  return (
    <div className="security-compliance-section">
      <div className="section-header">
        <PremiumBadge text="SEGURANÇA & COMPLIANCE" color="blue" />
        <h2 className="section-title">
          Segurança de <span className="gradient-text">Nível Empresarial</span>
        </h2>
        <p className="section-description">
          Proteção de dados, conformidade regulatória e disponibilidade garantida para sua operação
        </p>
      </div>

      <div className="compliance-standards">
        <h3>Padrões e Certificações</h3>
        <div className="standards-grid">
          {complianceStandards.map((standard, index) => (
            <div key={index} className="standard-card">
              <div className="standard-icon">{standard.icon}</div>
              <div className="standard-name">{standard.name}</div>
              <div className={`standard-status ${standard.status.toLowerCase()}`}>
                {standard.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="security-features">
        <div className="security-selector">
          {securityFeatures.map((feature) => (
            <button
              key={feature.id}
              className={`security-tab ${activeSecurity === feature.id ? 'active' : ''}`}
              onClick={() => setActiveSecurity(feature.id)}
            >
              <div className="tab-icon">{feature.icon}</div>
              <span className="tab-title">{feature.title}</span>
            </button>
          ))}
        </div>

        <div className="security-content">
          {securityFeatures.map((feature) => (
            <div 
              key={feature.id}
              className={`security-detail ${activeSecurity === feature.id ? 'active' : ''}`}
            >
              <div className="detail-header">
                <h3>{feature.title}</h3>
                <p className="detail-description">{feature.description}</p>
              </div>

              <div className="detail-features">
                <h4>Recursos</h4>
                <div className="features-grid">
                  {feature.features.map((feat, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-check">
                        <FaCheckCircle />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-certifications">
                <h4>Certificações</h4>
                <div className="certifications-list">
                  {feature.certifications.map((cert, index) => (
                    <div key={index} className="certification-badge">
                      {cert}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-visual">
                <div className={`security-visual visual-${feature.id}`}>
                  {feature.id === 'lgpd' && (
                    <div className="data-protection">
                      <div className="data-layers">
                        <div className="layer">Dados</div>
                        <div className="layer protection">Criptografia</div>
                        <div className="layer audit">Auditoria</div>
                      </div>
                    </div>
                  )}
                  {feature.id === 'encryption' && (
                    <div className="encryption-visual">
                      <div className="lock-animation">
                        <FaLock className="pulse" />
                      </div>
                      <div className="key-rotation">
                        <div className="key">🔑</div>
                        <div className="arrow">→</div>
                        <div className="key">🔐</div>
                      </div>
                    </div>
                  )}
                  {feature.id === 'sla' && (
                    <div className="sla-visual">
                      <div className="uptime-meter">
                        <div className="meter-value">99.9%</div>
                        <div className="meter-bar">
                          <div className="bar-fill" style={{ width: '99.9%' }} />
                        </div>
                        <div className="meter-label">Uptime</div>
                      </div>
                    </div>
                  )}
                  {feature.id === 'backup' && (
                    <div className="backup-visual">
                      <div className="backup-locations">
                        <div className="location">SP</div>
                        <div className="location">RJ</div>
                        <div className="location">MG</div>
                      </div>
                      <div className="data-sync">
                        <div className="sync-line" />
                        <div className="sync-dot" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="security-guarantee">
        <div className="guarantee-card">
          <div className="guarantee-icon">
            <FaShieldAlt />
          </div>
          <div className="guarantee-content">
            <h3>Garantia de Segurança</h3>
            <p>
              Nossa infraestrutura é auditada regularmente por empresas independentes. 
              Oferecemos seguro contra violação de dados e compensação financeira por downtime.
            </p>
            <div className="guarantee-features">
              <div className="guarantee-feature">
                <FaCheckCircle />
                <span>Auditorias trimestrais</span>
              </div>
              <div className="guarantee-feature">
                <FaCheckCircle />
                <span>Seguro de R$ 1M contra violação</span>
              </div>
              <div className="guarantee-feature">
                <FaCheckCircle />
                <span>Compensação por downtime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente FAQ Estratégico
const StrategicFAQ = () => {
  const [activeCategory, setActiveCategory] = useState('implementation');
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      id: 'implementation',
      title: 'Implementação',
      icon: <FaCog />,
      questions: [
        {
          id: 'impl1',
          question: 'Precisa instalar hardware nos veículos?',
          answer: 'Não é obrigatório. Funcionamos via API com sistemas existentes. Para dados em tempo real, recomendamos dispositivos GPS simples que fornecemos sem custo adicional no plano empresarial.',
          short: 'Não. Funcionamos com sistemas existentes via API.'
        },
        {
          id: 'impl2',
          question: 'Quanto tempo para implementar?',
          answer: 'Em média 2-5 dias úteis. Para frotas pequenas (< 10 veículos), pode ser em 24h. A integração é não-invasiva e não interrompe suas operações.',
          short: '2-5 dias úteis. Frotas pequenas em 24h.'
        },
        {
          id: 'impl3',
          question: 'Funciona com meu sistema atual?',
          answer: 'Sim, temos integração nativa com os principais sistemas do mercado (TOTVS, SAP, Protheus) e API aberta para integração personalizada.',
          short: 'Sim, integramos com todos os sistemas principais.'
        }
      ]
    },
    {
      id: 'results',
      title: 'Resultados',
      icon: <FaChartLine />,
      questions: [
        {
          id: 'res1',
          question: 'Quanto tempo para ver resultados financeiros?',
          answer: 'Primeiros resultados em 30 dias, ROI visível em 90 dias. Oferecemos garantia de resultados: se não economizar, devolvemos seu dinheiro.',
          short: '30 dias para resultados, 90 dias para ROI garantido.'
        },
        {
          id: 'res2',
          question: 'Qual economia média dos clientes?',
          answer: 'Clientes relatam redução de 25-40% nos custos operacionais. ROI médio de 320% no primeiro ano. Casos específicos podem variar.',
          short: '25-40% redução de custos, 320% ROI médio.'
        },
        {
          id: 'res3',
          question: 'Funciona com frota pequena (1-5 veículos)?',
          answer: 'Sim, perfeito para pequenas frotas. O plano Essencial é projetado para até 5 veículos e já mostra resultados significativos.',
          short: 'Sim, plano especial para frotas pequenas.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Suporte',
      icon: <RiCustomerService2Line />,
      questions: [
        {
          id: 'sup1',
          question: 'Tem suporte humano ou só bot?',
          answer: 'Suporte humano especializado 24/7 via chat, telefone e email. Além de bot para questões simples, temos especialistas para casos complexos.',
          short: 'Suporte humano 24/7 com especialistas.'
        },
        {
          id: 'sup2',
          question: 'Qual o tempo de resposta do suporte?',
          answer: 'Resposta em até 5 minutos para clientes empresariais, 15 minutos para outros planos. SLA de resolução de 4 horas para problemas críticos.',
          short: '5 minutos resposta, 4 horas resolução (SLA).'
        },
        {
          id: 'sup3',
          question: 'Oferecem treinamento?',
          answer: 'Sim, treinamento completo para equipe incluso. Online para todos, presencial para planos empresariais. Materiais sempre atualizados.',
          short: 'Sim, treinamento completo incluso.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Segurança',
      icon: <FaLock />,
      questions: [
        {
          id: 'sec1',
          question: 'Meus dados estão seguros?',
          answer: 'Totalmente. Criptografia AES-256, conformidade LGPD/GDPR, backup automático em 3 locais, auditorias trimestrais independentes.',
          short: 'Sim, criptografia AES-256 + LGPD + auditorias.'
        },
        {
          id: 'sec2',
          question: 'Vocês vendem meus dados?',
          answer: 'Nunca. Seus dados são seus. Política de zero compartilhamento com terceiros. Contrato com cláusulas de confidencialidade robustas.',
          short: 'Nunca. Política de zero compartilhamento.'
        },
        {
          id: 'sec3',
          question: 'O que acontece se houver queda no sistema?',
          answer: 'SLA 99.9% de disponibilidade. Em caso de queda, compensação financeira automática. Backup automático garante zero perda de dados.',
          short: 'SLA 99.9% + compensação financeira.'
        }
      ]
    }
  ];

  const activeCategoryData = faqCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="strategic-faq-section">
      <div className="section-header">
        <PremiumBadge text="FAQ ESTRATÉGICO" color="orange" />
        <h2 className="section-title">
          Perguntas que <span className="gradient-text">Fecham Negócio</span>
        </h2>
        <p className="section-description">
          Respostas diretas para as principais dúvidas dos tomadores de decisão
        </p>
      </div>

      <div className="faq-categories">
        {faqCategories.map((category) => (
          <button
            key={category.id}
            className={`faq-category ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <span className="category-title">{category.title}</span>
          </button>
        ))}
      </div>

      <div className="faq-container">
        <div className="faq-questions">
          {activeCategoryData.questions.map((item) => (
            <div 
              key={item.id}
              className={`faq-item ${openQuestions.includes(item.id) ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleQuestion(item.id)}
              >
                <div className="question-text">{item.question}</div>
                <div className="question-icon">
                  {openQuestions.includes(item.id) ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              
              <div className="faq-answer">
                <div className="answer-short">
                  <div className="short-label">Resposta direta:</div>
                  <p>{item.short}</p>
                </div>
                <div className="answer-full">
                  <div className="full-label">Detalhamento:</div>
                  <p>{item.answer}</p>
                </div>
                
                <div className="answer-cta">
                  <button className="cta-btn">
                    <FaComments />
                    <span>Falar com especialista</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-sidebar">
          <div className="sidebar-card">
            <h3>📞 Fale Diretamente</h3>
            <p>Converse com um especialista sem compromisso</p>
            <div className="contact-options">
              <button className="contact-option">
                <FaWhatsapp />
                <span>WhatsApp</span>
                <div className="option-badge">Resposta em 5min</div>
              </button>
              <button className="contact-option">
                <FaPhone />
                <span>Ligação</span>
                <div className="option-badge">Imediato</div>
              </button>
              <button className="contact-option">
                <FaVideo />
                <span>Videochamada</span>
                <div className="option-badge">Agendar</div>
              </button>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>🎯 Garantias</h3>
            <div className="guarantees-list">
              <div className="guarantee">
                <FaCheckCircle />
                <span>ROI em 90 dias ou devolução</span>
              </div>
              <div className="guarantee">
                <FaCheckCircle />
                <span>Implementação sem risco</span>
              </div>
              <div className="guarantee">
                <FaCheckCircle />
                <span>Suporte 24/7 com humano</span>
              </div>
              <div className="guarantee">
                <FaCheckCircle />
                <span>Cancelamento sem multa</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>📊 Dados Reais</h3>
            <div className="real-stats">
              <div className="real-stat">
                <div className="stat-value">96%</div>
                <div className="stat-label">Clientes Renovam</div>
              </div>
              <div className="real-stat">
                <div className="stat-value">4.8/5</div>
                <div className="stat-label">Avaliação</div>
              </div>
              <div className="real-stat">
                <div className="stat-value">24h</div>
                <div className="stat-label">Resposta</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-cta">
        <div className="cta-content">
          <h3>Ainda com dúvidas?</h3>
          <p>Agende uma demonstração personalizada com nosso time de especialistas</p>
          <button className="transita-btn transita-btn-primary transita-btn-xl">
            <span>Agendar Demonstração Personalizada</span>
            <FaVideo />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Feature Card com Hover 3D
const FeatureCard = ({ icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`transita-feature-card ${isHovered ? 'hovered' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-index={index}
    >
      <div className="feature-gradient" />
      <div className="feature-content">
        <div className="feature-icon-wrapper">
          <div className="feature-icon-glow" />
          <div className="feature-icon">{icon}</div>
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <div className="feature-link">
          <span>Saiba mais</span>
          <FaChevronRight />
        </div>
      </div>
      
      {isHovered && (
        <div className="feature-hover-glow" />
      )}
    </div>
  );
};

// Componente Solution Card Interativo
const SolutionCard = ({ number, title, description, features, icon, delay = 0, stats }) => {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`transita-solution-card ${isVisible ? 'visible' : ''} ${expanded ? 'expanded' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="solution-number">
        {String(number).padStart(2, '0')}
      </div>
      
      <div className="solution-header">
        <div className="solution-icon-wrapper">
          <div className="solution-icon-glow" />
          <div className="solution-icon">{icon}</div>
        </div>
        <div className="solution-title-container">
          <h3 className="solution-title">{title}</h3>
          <button 
            className="solution-expand-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Recolher' : 'Expandir'}
          >
            {expanded ? <FaCompressAlt /> : <FaExpandAlt />}
          </button>
        </div>
      </div>
      
      <p className="solution-description">{description}</p>
      
      <div className="solution-features">
        {features.slice(0, expanded ? features.length : 4).map((feature, index) => (
          <div key={index} className="solution-feature">
            <div className="feature-check">
              <FaCheckCircle />
            </div>
            <span className="feature-text">{feature}</span>
          </div>
        ))}
      </div>
      
      {stats && (
        <div className="solution-stats">
          {stats.map((stat, index) => (
            <div key={index} className="solution-stat">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      
      <div className="solution-actions">
        <button className="transita-btn transita-btn-primary">
          <span>Ver Demonstração</span>
          <FaPlay />
        </button>
        <button className="transita-btn transita-btn-ghost">
          <span>Documentação</span>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

// Componente Timeline Interativa
const Timeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach(item => observer.observe(item));
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="transita-timeline" ref={timelineRef}>
      <div className="timeline-line">
        <div className="timeline-progress" />
      </div>
      
      {items.map((item, index) => (
        <div 
          key={index}
          className={`timeline-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          <div className="timeline-dot">
            <div className="dot-ring" />
            <div className="dot-core" />
          </div>
          
          <div className="timeline-content">
            <div className="timeline-year">{item.year}</div>
            <h4 className="timeline-title">{item.title}</h4>
            <p className="timeline-description">{item.description}</p>
            
            {index === activeIndex && (
              <div className="timeline-highlights">
                {item.highlights?.map((highlight, hIndex) => (
                  <div key={hIndex} className="timeline-highlight">
                    <FaBolt />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente Plan Card Premium
const PlanCard = ({ title, price, description, features, popular = false, recommended = false, type = 'monthly' }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const calculatePrice = () => {
    if (isAnnual && type === 'monthly') {
      return `R$ ${(parseInt(price) * 0.8).toFixed(0)}/mês`;
    }
    return `R$ ${price}/mês`;
  };

  return (
    <div 
      className={`transita-plan-card ${popular ? 'popular' : ''} ${recommended ? 'recommended' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className="plan-badge">
          <FaCrown />
          <span>Mais Popular</span>
        </div>
      )}
      
      {recommended && (
        <div className="plan-recommended">
          <FaStar />
          <span>Recomendado</span>
        </div>
      )}
      
      <div className="plan-header">
        <div className="plan-icon">
          {popular ? <FaCrown /> : recommended ? <FaStar /> : <FaCheckCircle />}
        </div>
        <h3 className="plan-title">{title}</h3>
        <div className="plan-price">{calculatePrice()}</div>
        <div className="plan-period">
          {isAnnual ? 'Anual (20% OFF)' : 'Mensal'}
          <button 
            className="plan-toggle"
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Alternar período"
          >
            <FaSync />
          </button>
        </div>
      </div>
      
      <p className="plan-description">{description}</p>
      
      <div className="plan-features">
        {features.map((feature, index) => (
          <div key={index} className="plan-feature">
            <div className="feature-check">
              <FaCheckCircle />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="plan-footer">
        <button className="transita-btn transita-btn-primary">
          <span>Começar Agora</span>
          <FaArrowUp />
        </button>
        
        {popular && (
          <div className="plan-benefits">
            <div className="benefit">
              <FaShieldAlt />
              <span>30 dias grátis</span>
            </div>
            <div className="benefit">
              <FaUsers />
              <span>Suporte prioritário</span>
            </div>
          </div>
        )}
      </div>
      
      {isHovered && <div className="plan-hover-glow" />}
    </div>
  );
};

// Componente Contact Channel Avançado
const ContactChannel = ({ icon, title, description, responseTime, availability, status, actionText, actionIcon, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`transita-contact-channel channel-${color} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="channel-header">
        <div className="channel-icon-wrapper">
          <div className="channel-icon-glow" />
          <div className="channel-icon">{icon}</div>
        </div>
        
        <div className="channel-status">
          <div className={`status-indicator ${status === 'Online' ? 'online' : status === 'Disponível' ? 'available' : 'offline'}`}>
            <div className="status-pulse" />
          </div>
          <span className="status-text">{status}</span>
        </div>
      </div>
      
      <div className="channel-content">
        <h4 className="channel-title">{title}</h4>
        <p className="channel-description">{description}</p>
        
        <div className="channel-metrics">
          <div className="channel-metric">
            <div className="metric-label">
              <FaClock />
              <span>Tempo de Resposta</span>
            </div>
            <div className="metric-value">{responseTime}</div>
          </div>
          
          <div className="channel-metric">
            <div className="metric-label">
              <FaCalendarAlt />
              <span>Disponibilidade</span>
            </div>
            <div className="metric-value">{availability}</div>
          </div>
        </div>
      </div>
      
      <button className="transita-btn transita-btn-gradient">
        {actionText} {actionIcon}
      </button>
    </div>
  );
};

// ==========================================================================
// COMPONENTE PRINCIPAL
// ==========================================================================

const TransitaAI = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const dashboardRef = useRef(null);
  const solutionsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent * 100);
      
      // Detect active section
      const sections = ['hero', 'demo', 'solutions', 'social', 'comparison', 'howitworks', 'roi', 'dashboard', 'history', 'security', 'faq', 'plans', 'contact'];
      const sectionOffsets = sections.map(section => {
        const el = document.getElementById(section);
        return el ? el.offsetTop : 0;
      });
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollTop >= sectionOffsets[i] - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Criar partículas avançadas
    const createParticles = () => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const particles = [];
      const colors = ['#0A6CFF', '#FF6A00', '#10B981', '#8B5CF6', '#EC4899'];
      
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'transita-particle';
        
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${Math.random() * 0.4 + 0.1};
          filter: blur(${size / 2}px);
          z-index: 1;
          pointer-events: none;
        `;
        
        hero.appendChild(particle);
        particles.push(particle);
        
        // Animar partícula
        const duration = Math.random() * 20 + 15;
        const xMove = Math.random() * 200 - 100;
        const yMove = Math.random() * 200 - 100;
        
        particle.style.animation = `
          transita-particle-float ${duration}s ease-in-out infinite,
          transita-particle-opacity ${duration}s ease-in-out infinite,
          transita-particle-rotate ${duration * 2}s linear infinite
        `;
        
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
      }
    };
    
    // Criar grid interativo
    const createGrid = () => {
      const dashboard = dashboardRef.current;
      if (!dashboard) return;
      
      const grid = document.createElement('div');
      grid.className = 'interactive-grid';
      
      for (let i = 0; i < 50; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line';
        grid.appendChild(line);
      }
      
      dashboard.appendChild(grid);
    };
    
    createParticles();
    createGrid();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Mouse follower effect
  useEffect(() => {
    const cursor = document.querySelector('.mouse-follower');
    if (cursor) {
      cursor.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);

  // Dados das soluções
  const solutions = [
    {
      number: 1,
      title: 'Gestão Inteligente de Multas',
      description: 'Sistema automático de identificação, gerenciamento e contestação de multas. Receba alertas em tempo real, acompanhe prazos e reduza custos em até 60% com nossa plataforma inteligente.',
      features: [
        'Identificação automática de infrações',
        'Contestações otimizadas com IA',
        'Alertas em tempo real',
        'Relatórios detalhados e personalizáveis',
        'Integração com órgãos de trânsito',
        'Histórico completo de multas'
      ],
      icon: <FaBell />,
      stats: [
        { value: '60%', label: 'Redução de custos' },
        { value: '24h', label: 'Tempo de resposta' },
        { value: '99%', label: 'Precisão' }
      ]
    },
    {
      number: 2,
      title: 'Gestão de Motoristas',
      description: 'Controle completo da equipe de motoristas com monitoramento de desempenho, treinamentos, compliance e análise de comportamento. Aumente a segurança e eficiência da sua operação.',
      features: [
        'Perfil completo de motoristas',
        'Treinamentos personalizados',
        'Sistema de pontuação',
        'Compliance em tempo real',
        'Análise de comportamento',
        'Relatórios de desempenho'
      ],
      icon: <FaUserCog />,
      stats: [
        { value: '40%', label: 'Mais segurança' },
        { value: '25%', label: 'Eficiência' },
        { value: '85%', label: 'Satisfação' }
      ]
    },
    {
      number: 3,
      title: 'Manutenção Preditiva',
      description: 'Sistema de manutenção preditiva que antecipa falhas e otimiza agendamentos. Reduza downtime em 45% e estenda a vida útil da frota com manutenção inteligente.',
      features: [
        'Agendamento automático',
        'Histórico completo de manutenções',
        'Alertas preditivos',
        'Custos otimizados',
        'Monitoramento de peças',
        'Relatórios de vida útil'
      ],
      icon: <FaWrench />,
      stats: [
        { value: '45%', label: 'Menos downtime' },
        { value: '30%', label: 'Economia' },
        { value: '20%', label: 'Vida útil' }
      ]
    },
    {
      number: 4,
      title: 'Controle Financeiro',
      description: 'Gestão financeira completa da operação logística. Controle de custos por veículo, análise de ROI, relatórios fiscais e integração com sistemas contábeis.',
      features: [
        'Custos por veículo detalhados',
        'Análise de ROI avançada',
        'Relatórios fiscais automáticos',
        'Integração contábil completa',
        'Previsões financeiras',
        'Dashboard customizável'
      ],
      icon: <FaDollarSign />,
      stats: [
        { value: '35%', label: 'Redução custos' },
        { value: '50%', label: 'ROI' },
        { value: '100%', label: 'Conformidade' }
      ]
    }
  ];

  // Dados da timeline
  const timelineItems = [
    {
      year: '2018',
      title: 'Fundação',
      description: 'Criação da Transita.AI com foco em transformar a logística brasileira',
      highlights: ['Startup fundada', 'Primeiro protótipo', 'Equipe de 5 pessoas']
    },
    {
      year: '2019',
      title: 'Primeiros Clientes',
      description: 'Implementação para 10 empresas pioneiras no setor logístico',
      highlights: ['10 primeiros clientes', 'Crescimento 300%', 'Equipe 20 pessoas']
    },
    {
      year: '2020',
      title: 'Expansão Nacional',
      description: 'Presença em 5 estados brasileiros e crescimento acelerado',
      highlights: ['5 estados', '+100 clientes', 'Investimento série A']
    },
    {
      year: '2021',
      title: 'IA Avançada',
      description: 'Implementação de algoritmos de machine learning próprios',
      highlights: ['Patentes registradas', 'IA própria', 'Prêmios de inovação']
    },
    {
      year: '2022',
      title: 'Escala Nacional',
      description: 'Atendimento em todo território nacional com 100+ colaboradores',
      highlights: ['Todo Brasil', '+500 clientes', '100 colaboradores']
    }
  ];

  // Dados dos planos
  const plans = [
    {
      title: 'Essencial',
      price: '49',
      description: 'Para pequenas frotas iniciantes',
      features: [
        'Até 5 veículos ativos',
        'Rastreamento básico GPS',
        'Relatórios simples',
        'Suporte por email',
        'App móvel básico',
        'Atualizações mensais'
      ]
    },
    {
      title: 'Profissional',
      price: '99',
      description: 'Ideal para empresas em crescimento',
      popular: true,
      features: [
        'Até 20 veículos ativos',
        'Rastreamento avançado',
        'Otimização de rotas com IA',
        'Suporte 24/7 prioritário',
        'API completa',
        'Dashboard personalizável',
        'Relatórios avançados',
        'Integrações ilimitadas'
      ]
    },
    {
      title: 'Empresarial',
      price: '249',
      description: 'Solução completa para grandes empresas',
      recommended: true,
      features: [
        'Frota ilimitada',
        'Todos os recursos premium',
        'Dashboard customizado',
        'Suporte dedicado 24/7',
        'Consultoria estratégica',
        'Treinamentos presenciais',
        'SLA 99.9%',
        'Integração white-label'
      ]
    }
  ];

  // Dados dos canais de contato
  const contactChannels = [
    {
      icon: <FaComments />,
      title: 'Chat em Tempo Real',
      description: 'Suporte técnico imediato com nossos especialistas',
      responseTime: 'Resposta em ≤ 5min',
      availability: '24 horas / 7 dias',
      status: 'Online',
      actionText: 'Iniciar Chat',
      actionIcon: <FaChevronRight />,
      color: 'blue'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp Business',
      description: 'Atendimento rápido pelo WhatsApp',
      responseTime: 'Resposta em ≤ 15min',
      availability: '24 horas / 7 dias',
      status: 'Online',
      actionText: 'Conversar Agora',
      actionIcon: <FaChevronRight />,
      color: 'green'
    },
    {
      icon: <FaVideo />,
      title: 'Videochamada',
      description: 'Suporte personalizado com screenshare',
      responseTime: 'Agendamento em 24h',
      availability: 'Seg-Sex: 9h-18h',
      status: 'Disponível',
      actionText: 'Agendar Chamada',
      actionIcon: <FaCalendarAlt />,
      color: 'purple'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Corporativo',
      description: 'Para propostas comerciais e parcerias',
      responseTime: 'Resposta em ≤ 4h',
      availability: 'Seg-Sex: 9h-18h',
      status: 'Disponível',
      actionText: 'Enviar Email',
      actionIcon: <FaChevronRight />,
      color: 'orange'
    }
  ];

  // Dados das features
  const features = [
    {
      icon: <MdAnalytics />,
      title: 'Analytics em Tempo Real',
      description: 'Monitoramento contínuo de todas as métricas operacionais com atualizações em tempo real.'
    },
    {
      icon: <FaBell />,
      title: 'Alertas Inteligentes',
      description: 'Notificações proativas para problemas e oportunidades de otimização.'
    },
    {
      icon: <MdLocationOn />,
      title: 'Monitoramento GPS',
      description: 'Rastreamento preciso de toda a frota com atualizações a cada 30 segundos.'
    },
    {
      icon: <FaChartBar />,
      title: 'Relatórios Automáticos',
      description: 'Relatórios detalhados com insights acionáveis para tomada de decisão.'
    },
    {
      icon: <MdOutlineEco />,
      title: 'Sustentabilidade',
      description: 'Monitoramento de emissões e rotas ecológicas para reduzir impacto ambiental.'
    },
    {
      icon: <MdSecurity />,
      title: 'Segurança Total',
      description: 'Sistema multicamada com criptografia de ponta a ponta e compliance total.'
    }
  ];

  // Dados dos valores
  const values = [
    {
      icon: <MdTrendingUp />,
      title: 'Inovação Constante',
      description: 'Buscamos constantemente novas tecnologias e soluções criativas para superar expectativas.'
    },
    {
      icon: <FaHandshake />,
      title: 'Parceria Estratégica',
      description: 'Trabalhamos lado a lado com nossos clientes, construindo relações de longo prazo.'
    },
    {
      icon: <IoShieldCheckmark />,
      title: 'Confiança Total',
      description: 'Segurança, transparência e confiabilidade são a base de todas as nossas relações.'
    },
    {
      icon: <FaLeaf />,
      title: 'Sustentabilidade',
      description: 'Compromisso com operações eco-friendly e responsabilidade ambiental em todas as ações.'
    }
  ];

  return (
    <div className="transita-ai">
      {/* Mouse Follower */}
      <div className="mouse-follower" />
      
      {/* Scroll Progress Bar */}
      <div className="transita-scroll-progress">
        <div 
          className="transita-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="progress-glow" />
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="section-navigation">
        {['hero', 'demo', 'solutions', 'social', 'comparison', 'howitworks', 'roi', 'dashboard', 'history', 'security', 'faq', 'plans', 'contact'].map((section) => (
          <a 
            key={section}
            href={`#${section}`}
            className={`nav-dot ${activeSection === section ? 'active' : ''}`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          >
            <div className="dot-ring" />
            <div className="dot-core" />
          </a>
        ))}
      </div>
      
      {/* Hero Section */}
      <section 
        id="hero"
        ref={heroRef}
        className="transita-hero-section"
      >
        <div className="hero-background">
          <VideoHero />
        </div>
      </section>

      {/* NOVA SEÇÃO: Mini Demo Interativa */}
      <section id="demo" className="demo-section">
        <div className="container">
          <InteractiveDemo />
        </div>
      </section>

      {/* Soluções Section */}
      <section id="solutions" className="transita-solutions-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="SOLUÇÕES INTELIGENTES" color="blue" />
            <h2 className="section-title">
              Transforme sua <span className="gradient-text">Operação Logística</span>
            </h2>
            <p className="section-description">
              Tecnologia avançada desenvolvida para maximizar eficiência, reduzir custos e transformar 
              completamente sua operação com inteligência artificial.
            </p>
          </div>
          
          <div ref={solutionsRef} className="solutions-grid">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                number={solution.number}
                title={solution.title}
                description={solution.description}
                features={solution.features}
                icon={solution.icon}
                delay={index * 150}
                stats={solution.stats}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: Prova Social REAL */}
      <section id="social" className="social-proof-section">
        <div className="container">
          <SocialProof />
        </div>
      </section>

      {/* NOVA SEÇÃO: Antes vs Depois */}
      <section id="comparison" className="before-after-section">
        <div className="container">
          <BeforeAfterComparison />
        </div>
      </section>

      {/* NOVA SEÇÃO: Como Funciona em 3 Passos */}
      <section id="howitworks" className="how-it-works-section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>

      {/* NOVA SEÇÃO: ROI Calculator */}
      <section id="roi" className="roi-calculator-section">
        <div className="container">
          <ROICalculator />
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="transita-dashboard-section">
        <div className="dashboard-background">
          <div className="dashboard-gradient" />
          <div ref={dashboardRef} className="dashboard-grid" />
        </div>
        
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="DASHBOARD INTELIGENTE" color="purple" />
            <h2 className="section-title">
              Controle Total em <span className="gradient-text">Tempo Real</span>
            </h2>
          </div>
          
          <div className="dashboard-content">
            <div className="dashboard-text">
              <h3 className="dashboard-subtitle">
                Tudo que você precisa em <span className="highlight">um só lugar</span>
              </h3>
              <p className="dashboard-description">
                Monitoramento completo da sua frota com análises preditivas, alertas inteligentes 
                e tomada de decisão baseada em dados em tempo real.
              </p>
              
              <div className="features-grid">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
            
            <div className="dashboard-preview-large">
              <div className="preview-header">
                <h3>Visão Geral da Frota</h3>
                <div className="preview-actions">
                  <button className="preview-action">
                    <FaSync />
                    <span>Atualizar</span>
                  </button>
                  <button className="preview-action">
                    <FaChartLine />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>
              
              <div className="preview-content">
                <div className="live-metrics">
                  <div className="live-metric">
                    <div className="live-value">24</div>
                    <div className="live-label">Veículos Ativos</div>
                  </div>
                  <div className="live-metric">
                    <div className="live-value">18</div>
                    <div className="live-label">Rotas Otimizadas</div>
                  </div>
                  <div className="live-metric">
                    <div className="live-value">42</div>
                    <div className="live-label">Horas Economizadas</div>
                  </div>
                </div>
                
                <div className="performance-chart">
                  <div className="chart-header">
                    <h4>Desempenho da Frota</h4>
                    <div className="chart-period">Últimos 7 dias</div>
                  </div>
                  <div className="chart-bars">
                    {[65, 80, 45, 90, 70, 85, 95].map((height, index) => (
                      <div key={index} className="chart-bar-container">
                        <div 
                          className="chart-bar" 
                          style={{ height: `${height}%` }}
                        >
                          <div className="bar-value">{height}%</div>
                        </div>
                        <div className="bar-label">Dia {index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* História & Valores Section */}
      <section id="history" className="transita-history-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="NOSSA JORNADA" color="green" />
            <h2 className="section-title">
              História & <span className="gradient-text">Valores</span>
            </h2>
            <p className="section-description">
              Transformando a logística brasileira com tecnologia de ponta e inovação 
              contínua desde 2018.
            </p>
          </div>
          
          <div className="history-content">
            <div className="history-text">
              <p className="history-paragraph">
                Desde 2018, a <span className="highlight">Transita.AI</span> vem revolucionando 
                o setor logístico brasileiro através da tecnologia de ponta. Nossa missão é 
                simplificar a complexidade das operações logísticas, proporcionando eficiência, 
                redução de custos e sustentabilidade para empresas de todos os portes.
              </p>
              
              <div className="values-grid">
                {values.map((value, index) => (
                  <div key={index} className="value-card">
                    <div className="value-icon">{value.icon}</div>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="history-visual">
              <Timeline items={timelineItems} />
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: Segurança & Compliance */}
      <section id="security" className="security-compliance-section">
        <div className="container">
          <SecurityCompliance />
        </div>
      </section>

      {/* NOVA SEÇÃO: FAQ Estratégico */}
      <section id="faq" className="strategic-faq-section">
        <div className="container">
          <StrategicFAQ />
        </div>
      </section>

      {/* Planos Section */}
      <section id="plans" className="transita-plans-section">
        <div className="plans-background">
          <div className="plans-gradient" />
        </div>
        
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="PLANOS PREMIUM" color="orange" />
            <h2 className="section-title">
              Escolha o Plano <span className="gradient-text">Perfeito</span>
            </h2>
            <p className="section-description">
              Soluções que crescem com você, do essencial ao empresarial.
            </p>
          </div>
          
          <div className="plans-toggle">
            <div className="toggle-container">
              <span className="toggle-label">Mensal</span>
              <div className="toggle-switch">
                <div className="switch-track" />
                <div className="switch-thumb" />
              </div>
              <span className="toggle-label active">
                Anual <span className="discount">-20%</span>
              </span>
            </div>
          </div>
          
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                title={plan.title}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
                recommended={plan.recommended}
              />
            ))}
          </div>
          
          <div className="plans-footer">
            <div className="plans-guarantee">
              <FaShieldAlt />
              <span>Garantia de 30 dias ou seu dinheiro de volta</span>
            </div>
            <div className="plans-note">
              Todos os planos incluem atualizações gratuitas e suporte básico.
            </div>
          </div>
        </div>
      </section>
      
      {/* Contato Section */}
      <section id="contact" className="transita-contact-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="FALE CONOSCO" color="blue" />
            <h2 className="section-title">
              Estamos <span className="gradient-text">Prontos para Ajudar</span>
            </h2>
            <p className="section-description">
              Converse com nossos especialistas e transforme sua operação logística hoje mesmo.
            </p>
          </div>
          
          <div className="contact-content">
            <div className="contact-channels">
              <h3 className="contact-subtitle">Canais de Atendimento</h3>
              <p className="contact-description">
                Escolha a melhor forma de entrar em contato com nossa equipe especializada
              </p>
              
              <div className="channels-grid">
                {contactChannels.map((channel, index) => (
                  <ContactChannel
                    key={index}
                    icon={channel.icon}
                    title={channel.title}
                    description={channel.description}
                    responseTime={channel.responseTime}
                    availability={channel.availability}
                    status={channel.status}
                    actionText={channel.actionText}
                    actionIcon={channel.actionIcon}
                    color={channel.color}
                  />
                ))}
              </div>
            </div>
            
            <div className="contact-form-section">
              <div className="contact-form-wrapper">
                <h3 className="contact-subtitle">Envie uma Mensagem</h3>
                <p className="form-description">
                  Preencha o formulário abaixo e nossa equipe entrará em contato em até 2 horas úteis.
                </p>
                
                <form className="transita-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <FaUserCog />
                        <span>Nome Completo *</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Digite seu nome completo" 
                        className="form-input" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">
                        <FaEnvelope />
                        <span>Email *</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="seu@email.com" 
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">
                        <FaBuilding />
                        <span>Empresa</span>
                      </label>
                      <input 
                        type="text" 
                        id="company" 
                        placeholder="Nome da sua empresa" 
                        className="form-input" 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">
                        <FaPhone />
                        <span>Telefone *</span>
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        placeholder="(11) 99999-9999" 
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">
                      <FaFilter />
                      <span>Assunto *</span>
                    </label>
                    <select id="subject" className="form-select" required>
                      <option value="">Selecione o assunto</option>
                      <option value="suporte">Suporte Técnico</option>
                      <option value="comercial">Comercial</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="emergencia">Emergência</option>
                      <option value="parceria">Parceria</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">
                      <FaComments />
                      <span>Mensagem *</span>
                    </label>
                    <textarea 
                      id="message" 
                      placeholder="Descreva sua dúvida, problema ou solicitação..." 
                      rows="4" 
                      className="form-textarea" 
                      required 
                    />
                  </div>
                  
                  <div className="form-footer">
                    <div className="form-notice">
                      <FaShieldAlt />
                      <span>Seus dados estão seguros conosco. Não compartilhamos informações com terceiros.</span>
                    </div>
                    
                    <button type="submit" className="transita-btn transita-btn-primary transita-btn-xl">
                      <span>Enviar Mensagem</span>
                      <FaArrowUp />
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="contact-info">
                <div className="info-section">
                  <h4>
                    <FaMapMarkerAlt />
                    <span>Nossas Unidades</span>
                  </h4>
                  
                  <div className="office-card">
                    <div className="office-header">
                      <h5>São Paulo - Matriz</h5>
                      <PremiumBadge text="HQ" color="blue" />
                    </div>
                    <p>Av. Paulista, 1000 - 10º andar</p>
                    <p>Bela Vista, São Paulo - SP</p>
                    <div className="office-contact">
                      <FaPhone /> (11) 3333-4444
                    </div>
                    <div className="office-contact">
                      <FaEnvelope /> sp@transita.ai
                    </div>
                    <div className="office-hours">
                      <FaClock /> Seg-Sex: 8h às 18h
                    </div>
                  </div>
                  
                  <div className="office-card">
                    <div className="office-header">
                      <h5>Goiás - Anápolis</h5>
                      <PremiumBadge text="FILIAL" color="green" />
                    </div>
                    <p>Av. Brasil, 500 - Centro</p>
                    <p>Anápolis, Goiás - GO</p>
                    <div className="office-contact">
                      <FaPhone /> (62) 2222-3333
                    </div>
                    <div className="office-contact">
                      <FaEnvelope /> go@transita.ai
                    </div>
                    <div className="office-hours">
                      <FaClock /> Seg-Sex: 8h às 18h
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <h4>
                    <FaUsers />
                    <span>Conecte-se Conosco</span>
                  </h4>
                  
                  <div className="social-links">
                    <a href="#" className="social-link">
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </a>
                    <a href="#" className="social-link">
                      <FaInstagram />
                      <span>Instagram</span>
                    </a>
                    <a href="#" className="social-link">
                      <FaFacebook />
                      <span>Facebook</span>
                    </a>
                    <a href="#" className="social-link">
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransitaAI;