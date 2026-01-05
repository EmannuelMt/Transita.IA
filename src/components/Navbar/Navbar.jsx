import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import {
  FiHome,
  FiTruck,
  FiUser,
  FiLogIn,
  FiSearch,
  FiSettings,
  FiBarChart2,
  FiBell,
  FiMenu,
  FiX,
  FiShield,
  FiHelpCircle,
  FiLogOut,
  FiClock,
  FiCreditCard,
  FiNavigation,
  FiAlertTriangle,
  FiMap,
  FiLayers,
  FiStar,
  FiCheckCircle,
  FiChevronRight,
  FiChevronLeft,
  FiZap,
  FiTrendingUp,
  FiMapPin,
  FiMessageSquare,
  FiActivity,
  FiGlobe,
  FiPackage
} from 'react-icons/fi';
import {
  HiOutlineUserCircle,
  HiOutlineCog,
  HiOutlineCreditCard,
  HiOutlineChartBar,
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlineOfficeBuilding,
  HiOutlineDeviceMobile
} from 'react-icons/hi';
import { RiDashboardLine, RiNotificationLine, RiRoadMapLine } from 'react-icons/ri';
import { TbRoute, TbReceipt } from 'react-icons/tb';

import { useNotifications } from '../../contexts/NotificationContext';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
// import { useAuth } from '../../contexts/AuthContext'; // DESATIVADO

import Logotipofretevelocidadelaranja from '../../assets/images/Logo/Logotipofretevelocidadelaranja.png';
import './Navbar.css';
import { searchIndex } from '../../services/searchIndex';

// Componente de ícone animado premium otimizado
const PremiumIcon = memo(({ icon: Icon, isActive, size = 20, color, animation = 'float' }) => {
  const controls = useAnimationControls();
  
  useEffect(() => {
    if (isActive && animation === 'pulse') {
      controls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.8, repeat: Infinity, repeatDelay: 2 }
      });
    }
  }, [isActive, animation, controls]);

  const animations = {
    float: {
      y: [0, -2, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
    },
    spin: {
      rotate: [0, 360],
      transition: { duration: 25, repeat: Infinity, ease: "linear" }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity }
    },
    bounce: {
      y: [0, -3, 0],
      transition: { duration: 1.2, repeat: Infinity }
    }
  };

  return (
    <motion.div
      className={`premium-icon-wrapper ${isActive ? 'active' : ''}`}
      animate={isActive && animation ? animations[animation] : {}}
      whileHover={{
        scale: 1.12,
        rotate: 3,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={{ scale: 0.92 }}
      style={{ 
        color: isActive ? color : 'var(--gray-light)',
        filter: isActive ? `drop-shadow(0 0 6px ${color}40)` : 'none'
      }}
    >
      <Icon size={size} />
      {isActive && (
        <motion.div
          className="icon-glow"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 0.25 }}
          transition={{ duration: 0.4 }}
          style={{ 
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
          }}
        />
      )}
    </motion.div>
  );
});

// Componente de item de navegação otimizado
const NavigationItem = memo(({ 
  icon, 
  label, 
  description, 
  path, 
  isActive, 
  onClick,
  color = 'var(--blue-vibrant)',
  badge,
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemControls = useAnimationControls();

  const handleHoverStart = () => {
    setIsHovered(true);
    itemControls.start({
      x: 6,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    itemControls.start({
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    });
  };

  return (
    <motion.div
      className="nav-item-wrapper"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ x: 4 }}
    >
      <Link
        to={path}
        className={`nav-item ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
        onClick={onClick}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        style={{ '--item-color': color }}
      >
        <motion.div 
          className="nav-item-background"
          animate={{
            opacity: isActive ? 0.15 : isHovered ? 0.08 : 0,
            background: isActive 
              ? `linear-gradient(90deg, ${color}40, ${color}20, transparent)` 
              : 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)'
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="nav-icon">
          <PremiumIcon
            icon={icon}
            isActive={isActive}
            color={color}
            animation={badge === 'NOVO' ? 'pulse' : 'float'}
          />
        </div>
        
        <div className="nav-content">
          <div className="nav-header">
            <motion.span 
              className="nav-label"
              animate={{ color: isActive ? 'var(--white)' : isHovered ? 'var(--white)' : 'var(--gray-light)' }}
            >
              {label}
            </motion.span>
            {badge && (
              <motion.span 
                className="nav-badge"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                whileHover={{ scale: 1.1, y: -1 }}
              >
                {badge}
              </motion.span>
            )}
          </div>
          <motion.span 
            className="nav-description"
            animate={{ opacity: isActive ? 0.9 : isHovered ? 0.8 : 0.6 }}
          >
            {description}
          </motion.span>
        </div>
        
        {isActive && (
          <motion.div
            className="active-indicator"
            layoutId="activeIndicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600 }}
          >
            <motion.div 
              className="active-pulse"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.4, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
        
        <motion.div 
          className="nav-hover-arrow"
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            x: isHovered ? 0 : -8,
            rotate: isHovered ? 0 : -90
          }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <FiChevronRight />
        </motion.div>

        <motion.div 
          className="nav-hover-line"
          animate={{ 
            width: isHovered ? '100%' : '0%',
            opacity: isHovered ? 0.1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
});

// Componente de item do menu do usuário otimizado
const UserMenuItem = memo(({ 
  icon, 
  label, 
  description, 
  path, 
  isActive, 
  onClick,
  customOnClick,
  color = 'var(--blue-vibrant)',
  badge,
  index 
}) => {
  return (
    <motion.div
      className="user-menu-item-wrapper"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ x: -4 }}
    >
      {customOnClick ? (
        <button
          className={`user-menu-item ${isActive ? 'active' : ''}`}
          onClick={customOnClick}
          style={{ '--item-color': color }}
        >
          <div className="user-menu-icon">
            <PremiumIcon
              icon={icon}
              isActive={isActive}
              color={color}
              size={18}
            />
          </div>
          
          <div className="user-menu-content">
            <div className="user-menu-header">
              <span className="user-menu-label">{label}</span>
              {badge && (
                <motion.span 
                  className="user-menu-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {badge}
                </motion.span>
              )}
            </div>
            <span className="user-menu-description">{description}</span>
          </div>
          
          {isActive && (
            <motion.div
              className="user-menu-active-indicator"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 600 }}
              style={{ 
                background: `linear-gradient(90deg, ${color}, ${color}80)`,
                boxShadow: `0 0 12px ${color}40`
              }}
            />
          )}
          
          <motion.div 
            className="user-menu-hover-arrow"
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronLeft />
          </motion.div>
        </button>
      ) : (
        <Link
          to={path}
          className={`user-menu-item ${isActive ? 'active' : ''}`}
          onClick={onClick}
          style={{ '--item-color': color }}
        >
          <div className="user-menu-icon">
            <PremiumIcon
              icon={icon}
              isActive={isActive}
              color={color}
              size={18}
            />
          </div>
          
          <div className="user-menu-content">
            <div className="user-menu-header">
              <span className="user-menu-label">{label}</span>
              {badge && (
                <motion.span 
                  className="user-menu-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {badge}
                </motion.span>
              )}
            </div>
            <span className="user-menu-description">{description}</span>
          </div>
          
          {isActive && (
            <motion.div
              className="user-menu-active-indicator"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 600 }}
              style={{ 
                background: `linear-gradient(90deg, ${color}, ${color}80)`,
                boxShadow: `0 0 12px ${color}40`
              }}
            />
          )}
          
          <motion.div 
            className="user-menu-hover-arrow"
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronLeft />
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
});

// Componente de estatística do usuário
const UserStat = memo(({ icon: Icon, value, label, color }) => (
  <motion.div 
    className="stat-item"
    whileHover={{ 
      scale: 1.05,
      y: -2,
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
    }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="stat-icon" style={{ color }}>
      <Icon size={16} />
    </div>
    <div className="stat-content">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </motion.div>
));

// Componente principal Sidebar otimizado
const PremiumSidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { unreadCount, isPanelOpen, setIsPanelOpen } = useNotifications();
  // VALORES FIXOS PARA DESATIVAR AUTENTICAÇÃO
  const isCompany = true;
  const isEmployee = false;
  const user = { name: 'Usuário Teste', email: 'teste@email.com', displayName: 'Usuário Teste' };
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchWrapperRef = useRef(null);

  // Filter suggestions with a small debounce
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }

    const term = searchTerm.trim().toLowerCase();
    const id = setTimeout(() => {
      const results = searchIndex.filter(item => {
        const hay = (item.title + ' ' + item.keywords.join(' ') + ' ' + item.excerpt).toLowerCase();
        return hay.includes(term);
      }).slice(0, 12);

      setSuggestions(results);
      setShowSuggestions(true);
      setActiveIndex(-1);
    }, 120);

    return () => clearTimeout(id);
  }, [searchTerm]);

  // Close suggestions on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        navigate(suggestions[activeIndex].path);
        setShowSuggestions(false);
      } else {
        const term = searchTerm && searchTerm.trim();
        if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const isActive = useCallback((path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    console.log('handleProfileClick called');
    console.log('isCompany:', isCompany);
    console.log('isEmployee:', isEmployee);
    console.log('user:', user);
    closeAll();
    if (isCompany) {
      console.log('Navigating to /profile/company');
      navigate('/profile/company');
    } else if (isEmployee) {
      console.log('Navigating to /profile/employee');
      navigate('/profile/employee');
    } else {
      console.log('No role detected, navigating to /login');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    closeAll();
    onLogout();
    navigate('/login');
  };

  const navigationItems = [
    {
      path: '/',
      icon: FiHome,
      label: 'Início',
      description: 'Página inicial do sistema',
      color: 'var(--blue-vibrant)'
    },
    {
      path: '/dashboard',
      icon: RiDashboardLine,
      label: 'Dashboard',
      description: 'Métricas e analytics em tempo real',
      color: 'var(--blue-primary)',
      badge: 'LIVE'
    },
    {
      path: '/Multas',
      icon: FiAlertTriangle,
      label: 'Multas',
      description: 'Gestão inteligente de multas',
      color: 'var(--orange-primary)',
      badge: 'NOVO'
    },
    {
      path: '/monitoramento',
      icon: FiNavigation,
      label: 'Monitoramento',
      description: 'Rastreamento em tempo real',
      color: 'var(--blue-dark)',
      badge: 'GPS'
    },
    {
      path: '/motoristas',
      icon: FiUser,
      label: 'Motoristas',
      description: 'Gerenciamento de motoristas',
      color: 'var(--orange-soft)'
    },
    {
      path: '/veiculos',
      icon: HiOutlineTruck,
      label: 'Veículos',
      description: 'Gerenciamento de veículos',
      color: 'var(--blue-vibrant)'
    },
    {
      path: '/relatorios',
      icon: FiLayers,
      label: 'Relatórios',
      description: 'Relatórios detalhados e analytics',
      color: 'var(--blue-primary)'
    },
    {
      path: '/manutencao',
      icon: FiSettings,
      label: 'Manutenção',
      description: 'Controle de manutenção preventiva',
      color: 'var(--orange-primary)'
    },
    {
      path: '/financeiro',
      icon: FiCreditCard,
      label: 'Financeiro',
      description: 'Gestão financeira e pagamentos',
      color: 'var(--green-primary)'
    }
  ];

  const userMenuItems = [
      {
      path: '/profile',
      icon: FiUser,
      label: 'Meu Perfil',
      description: 'Gerencie suas informações pessoais',
      color: 'var(--blue-vibrant)',
      badge: 'NOVO'
    },
    {
      path: '/historico',
      icon: FiClock,
      label: 'Histórico',
      description: 'Veja seu histórico completo',
      color: 'var(--blue-primary)'
    },
    {
      path: '/planos',
      icon: FiCreditCard,
      label: 'Assinatura',
      description: 'Gerencie sua assinatura Premium',
      color: 'var(--orange-primary)'
    },
    {
      path: '/configuracoes',
      icon: FiSettings,
      label: 'Configurações',
      description: 'Configurações da conta',
      color: 'var(--blue-dark)'
    },
    {
      path: '/privacidade',
      icon: FiShield,
      label: 'Privacidade',
      description: 'Configurações de privacidade e segurança',
      color: 'var(--blue-vibrant)'
    },
    {
      path: '/support',
      icon: FiHelpCircle,
      label: 'Ajuda & Suporte',
      description: 'Central de ajuda e suporte 24/7',
      color: 'var(--orange-soft)'
    },
    {
      path: '/notificacoes',
      icon: FiBell,
      label: 'Notificações',
      description: 'Configurar alertas e notificações',
      color: 'var(--blue-primary)'
    },
    {
      path: '/mensagens',
      icon: FiMessageSquare,
      label: 'Mensagens',
      description: 'Caixa de entrada e mensagens',
      color: 'var(--orange-soft)'
    }
  ];

  const userStats = [
    
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 45,
        mass: 0.7
      }
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 45,
        delay: 0.1
      }
    }
  };

  const userMenuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 45,
        mass: 0.7
      }
    },
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 45,
        delay: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 35,
        mass: 0.5,
        delay: 0.1
      }
    }
  };

  return (
    <>
      {/* Header otimizado */}
      <motion.header
        className="premium-sidebar-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="header-container">
          <motion.button
            className="menu-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Abrir menu lateral"
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu />
            <motion.span 
              className="menu-toggle-dot"
              animate={isSidebarOpen ? { 
                scale: 1.3, 
                backgroundColor: 'var(--blue-vibrant)',
                boxShadow: '0 0 8px var(--blue-vibrant)'
              } : {}}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.div 
            className="header-logo"
            whileHover={{ scale: 1.01 }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-container">
              <img 
                src={Logotipofretevelocidadelaranja} 
                alt="Transita AI Pro" 
                className="logo-image-optimized"
              />
              <motion.div 
                className="logo-glow"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="logo-text">
              <span className="logo-primary">Transita AI</span>
            </div>
          </motion.div>

          <div className="header-search">
            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                const term = searchTerm && searchTerm.trim();
                if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
              }}
            >
              <button
                type="button"
                className="search-toggle-btn"
                onClick={() => searchInputRef.current && searchInputRef.current.focus()}
                aria-label="Focar pesquisa"
              >
                <FiSearch />
              </button>
                <div ref={searchWrapperRef} style={{ position: 'relative' }}>
                <input
                  ref={searchInputRef}
                  className="search-input"
                  placeholder="Pesquisar no site..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
                />

                {showSuggestions && (
                  <div className="search-suggestions">
                    {suggestions.length === 0 ? (
                      <div className="suggestion-empty">Nenhum resultado rápido</div>
                    ) : (
                      <>
                        <div className="search-suggestions-header">
                          <div className="suggestions-title">Resultados rápidos</div>
                          <div className="suggestions-count">{suggestions.length} encontrados</div>
                        </div>
                        {suggestions.map((s, idx) => (
                          <div
                            key={s.path}
                            className={`search-suggestion-item ${idx === activeIndex ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onMouseDown={(ev) => {
                              // use onMouseDown to prevent input blur before click
                              ev.preventDefault();
                              navigate(s.path);
                              setShowSuggestions(false);
                            }}
                          >
                            <div className="suggestion-title">{s.title}</div>
                            <div className="suggestion-excerpt">{s.excerpt}</div>
                          </div>
                        ))}

                        <div className="search-suggestions-footer">
                          <button
                            type="button"
                            className="search-see-all"
                            onMouseDown={(ev) => {
                              ev.preventDefault();
                              const term = searchTerm && searchTerm.trim();
                              if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
                              else navigate('/search');
                              setShowSuggestions(false);
                            }}
                          >
                            Ver todos resultados
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
                </div>
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => {
                    setSearchTerm('');
                    searchInputRef.current && searchInputRef.current.focus();
                  }}
                  aria-label="Limpar pesquisa"
                >
                  <FiX />
                </button>
              )}
            </form>
          </div>

          <div className="header-actions">
            <motion.button
              className="notification-btn"
              aria-label="Notificações"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RiNotificationLine />
              {unreadCount > 0 && (
                <motion.span
                  className="notification-counter"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 700 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {user ? (
              <motion.button
                className="user-menu-btn"
                onClick={toggleUserMenu}
                aria-label="Menu do usuário"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="user-avatar-header" />
                ) : (
                  <HiOutlineUserCircle />
                )}
                <motion.span 
                  className="user-status-dot"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(0, 255, 0, 0)',
                      '0 0 0 6px rgba(0, 255, 0, 0.3)',
                      '0 0 0 0 rgba(0, 255, 0, 0)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.button>
            ) : (
              <motion.button
                className="login-btn-header"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiLogIn />
                <span>Login</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Overlay */}
      <AnimatePresence>
        {(isSidebarOpen || isUserMenuOpen) && (
          <motion.div
            className="premium-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Principal */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            className="premium-sidebar-main"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="sidebar-gradient-overlay" />
            
            <div className="sidebar-header-section">
              <div className="sidebar-brand">
                <motion.div 
                  className="brand-logo"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="brand-logo-container">
                    <img 
                      src={Logotipofretevelocidadelaranja} 
                      alt="Transita AI Pro" 
                      className="brand-logo-image"
                    />
                  </div>
                </motion.div>
                <div className="brand-text">
                  <h3>Transita AI</h3>
                  <motion.span 
                    className="brand-subtitle"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    Professional Edition
                  </motion.span>
                </div>
              </div>
              <motion.button
                className="close-sidebar-btn"
                onClick={closeAll}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <FiX />
              </motion.button>
            </div>

            <div className="sidebar-nav-container">
              <div className="nav-section-label">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Navegação Principal
                </motion.span>
                <motion.div 
                  className="section-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                />
              </div>
              
              <nav className="sidebar-nav">
                {navigationItems.map((item, index) => (
                  <NavigationItem
                    key={item.path}
                    {...item}
                    isActive={isActive(item.path)}
                    onClick={closeAll}
                    index={index}
                  />
                ))}
              </nav>

              <div className="sidebar-info-card">
                <motion.div 
                  className="info-card-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FiZap className="info-icon" />
                  <div>
                    <span className="info-title">Sistema Otimizado</span>
                    <span className="info-description">Performance máxima garantida</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="sidebar-footer">
              {user ? (
                <motion.div
                  className="user-preview-card"
                  onClick={toggleUserMenu}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="user-preview-content">
                    <div className="user-avatar-preview">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" />
                      ) : (
                        <HiOutlineUserCircle />
                      )}
                      <div className="premium-badge">
                        <FiStar size={10} />
                      </div>
                    </div>
                    <div className="user-info-preview">
                      <span className="user-name">{user.displayName || user.email}</span>
                      <span className="user-plan">
                        <FiZap size={12} /> Plano Premium
                      </span>
                    </div>
                  </div>
                  <motion.div 
                    className="user-preview-arrow"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiChevronRight />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="login-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/login" className="premium-login-btn" onClick={closeAll}>
                    <div className="login-btn-content">
                      <div className="login-icon-wrapper">
                        <FiLogIn />
                      </div>
                      <div>
                        <span className="login-title">Fazer Login</span>
                        <span className="login-subtitle">Acesse sua conta</span>
                      </div>
                    </div>
                    <motion.div 
                      className="login-arrow"
                      whileHover={{ x: 3 }}
                    >
                      <FiChevronRight />
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Menu do Usuário */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.aside
            className="premium-user-menu"
            variants={userMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="user-menu-gradient-overlay" />
            
            <div className="user-menu-header-section">
              <div className="user-profile-card">
                <motion.div
                  className="user-avatar-large"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User" />
                  ) : (
                    <HiOutlineUserCircle />
                  )}
                  <motion.div 
                    className="online-status"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div className="user-info-details">
                  <motion.h4
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {user?.displayName || user?.email}
                  </motion.h4>
                  <motion.span 
                    className="user-plan-badge"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <FiCreditCard /> Plano Premium
                  </motion.span>
                  <motion.span 
                    className="user-email"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {user?.email}
                  </motion.span>
                </div>
              </div>
              <motion.button
                className="close-user-menu-btn"
                onClick={closeAll}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <FiX />
              </motion.button>
            </div>

            <div className="user-menu-nav-container">
              <div className="user-section-label">
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Minha Conta
                </motion.span>
                <motion.div 
                  className="user-section-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                />
              </div>
              
              <nav className="user-menu-nav">
                {userMenuItems.map((item, index) => (
                  <UserMenuItem
                    key={item.path || item.label}
                    {...item}
                    isActive={item.path ? isActive(item.path) : false}
                    onClick={closeAll}
                    customOnClick={item.onClick}
                    index={index}
                  />
                ))}
              </nav>

              <div className="user-stats-container">
                <div className="user-stats-label">
                  <span>Estatísticas</span>
                </div>
                <div className="user-stats-grid">
                  {userStats.map((stat, index) => (
                    <UserStat key={index} {...stat} />
                  ))}
                </div>
              </div>
            </div>

            <div className="user-menu-footer">
              <motion.button
                className="premium-logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="logout-btn-content">
                  <div className="logout-icon-wrapper">
                    <FiLogOut />
                  </div>
                  <span>Sair da Conta</span>
                </div>
                <motion.div 
                  className="logout-arrow"
                  whileHover={{ x: 3 }}
                >
                  <FiChevronLeft />
                </motion.div>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Painel de Notificações */}
      <NotificationPanel />
    </>
  );
};

export default PremiumSidebar;