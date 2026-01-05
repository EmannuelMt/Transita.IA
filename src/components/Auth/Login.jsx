import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaGithub, 
  FaArrowLeft,
  FaLock,
  FaUser,
  FaEnvelope,
  FaKey,
  FaCheckCircle,
  FaBuilding,
  FaChartLine,
  FaUsers,
  FaDatabase,
  FaCloud,
  FaChevronRight,
  FaShieldAlt,
  FaBolt,
  FaStar,
  FaMagic,
  FaUserPlus,
  FaSignInAlt,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaCrown,
  FaRocket,
  FaInfinity,
  FaCogs,
  FaSync,
  FaGlobe,
  FaServer,
  FaCode,
  FaTerminal,
  FaMicrochip,
  FaSatellite,
  FaNetworkWired,
  FaFingerprint,
  FaQrcode,
  FaUserShield,
  FaBrain,
  FaRobot,
  FaCubes,
  FaShieldVirus,
  FaPlug,
  FaChartBar,
  FaCog,
  FaDatabase as FaData,
  FaFileCode,
  FaLayerGroup,
  FaFire,
  FaTachometerAlt,
  FaLink,
  FaServer as FaServerAlt,
  FaSitemap,
  FaDesktop,
  FaMobile,
  FaIdCard,
  FaTablet,
  FaWifi,
  FaSatelliteDish,
  FaEthernet,
  FaMemory,
  FaHdd,
  FaMicrochip as FaChip,
  FaCloudUploadAlt,
  FaSyncAlt,
  FaExpandAlt,
  FaCompressAlt,
  FaCodeBranch,
  FaProjectDiagram,
  FaNetworkWired as FaTopology,
  FaWaveSquare,
  FaSignal,
  FaBroadcastTower,
  FaServer as FaCluster,
  FaCubes as FaBlockchain,
  FaLockOpen,
  FaUserCheck,
  FaUserClock,
  FaUserLock,
  FaUserCog,
  FaUserFriends,
  FaUserTag,
  FaUserSecret,
  FaUserMd,
  FaUserNinja,
  FaUserAstronaut,
  FaUserTie,
  FaUserGraduate,
  FaUserEdit,
  FaUserTimes,
  FaUserPlus as FaUserAdd,
  FaUserMinus,
  FaUserCircle,
  FaIdBadge,
  FaIdCardAlt,
  FaAddressCard,
  FaCreditCard,
  FaKey as FaKeyAlt,
  FaUnlockAlt,
  FaLock as FaLockAlt,
  FaFingerprint as FaBiometric,
  FaQrcode as FaQr,
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
  FaDesktop as FaDesktopAlt,
  FaGamepad,
  FaKeyboard,
  FaMouse,
  FaHeadset,
  FaCamera,
  FaVideo,
  FaMicrophone,
  FaHeadphones,
  FaVolumeUp,
  FaWifi as FaWifiAlt
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logotipofretevelocidadelaranja from '../../assets/images/Logo/Logotipofretevelocidadelaranja.png';
import styles from './Auth.module.css';

function Login({ initialMode = 'login' }) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'signup' | 'mfa'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    mfaCode: '',
    termsAccepted: false,
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [particles, setParticles] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [backgroundCards, setBackgroundCards] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const particlesInterval = useRef(null);

  // Cards específicos para Login
  const loginCards = [
    {
      id: 'performance',
      icon: <FaBolt />,
      title: "Performance Extrema",
      description: "Processamento distribuído com latência &lt; 5ms",
      stats: "99.9% Uptime",
      gradient: "var(--gradient-orange-neon)",
      features: ["Edge Computing", "Load Balancing", "Caching Inteligente"],
      pulse: true,
      color: "var(--orange-fire)"
    },
    {
      id: 'security',
      icon: <FaShieldAlt />,
      title: "Segurança Neural",
      description: "IA que detecta ameaças em tempo real",
      stats: "Zero Trust Security",
      gradient: "var(--gradient-blue-neon)",
      features: ["Machine Learning", "Behavior Analysis", "Threat Prevention"],
      pulse: true,
      color: "var(--blue-neon)"
    },
    {
      id: 'availability',
      icon: <FaServer />,
      title: "Alta Disponibilidade",
      description: "Infraestrutura multi-região com failover automático",
      stats: "99.99% SLA",
      gradient: "var(--gradient-purple-neon)",
      features: ["Multi-Region", "Auto-Failover", "Disaster Recovery"],
      pulse: true,
      color: "var(--purple)"
    }
  ];

  // Cards específicos para Criar Conta
  const signupCards = [
    {
      id: 'scalability',
      icon: <FaInfinity />,
      title: "Escalabilidade Ilimitada",
      description: "Arquitetura serverless que cresce com você",
      stats: "Auto-scaling",
      gradient: "var(--gradient-green-neon)",
      features: ["Serverless", "Elastic", "Pay-per-use"],
      pulse: true,
      color: "var(--green)"
    },
    {
      id: 'integrations',
      icon: <FaPlug />,
      title: "Integrações Nativas",
      description: "API-first com 150+ integrações prontas",
      stats: "150+ APIs",
      gradient: "var(--gradient-cyan-neon)",
      features: ["REST APIs", "Webhooks", "SDKs"],
      pulse: true,
      color: "var(--cyan)"
    },
    {
      id: 'infrastructure',
      icon: <FaNetworkWired />,
      title: "Infraestrutura Global",
      description: "Data centers em 15 regiões com sincronização automática",
      stats: "15 Regiões",
      gradient: "var(--gradient-pink-neon)",
      features: ["Global Network", "Low Latency", "Geo-Redundancy"],
      pulse: true,
      color: "var(--pink)"
    }
  ];

  // Cards específicos para MFA
  const mfaCards = [
    {
      id: 'biometric',
      icon: <FaFingerprint />,
      title: "Autenticação Biométrica",
      description: "Reconhecimento facial, digital e de íris",
      stats: "Nível 4 de Segurança",
      gradient: "var(--gradient-gold-neon)",
      features: ["Facial Recognition", "Fingerprint", "Iris Scan"],
      pulse: true,
      color: "var(--gold)"
    },
    {
      id: 'quantum',
      icon: <FaShieldVirus />,
      title: "Criptografia Quântica",
      description: "Proteção pós-quântica com chaves dinâmicas",
      stats: "Quantum Safe",
      gradient: "var(--gradient-teal-neon)",
      features: ["Post-Quantum", "Dynamic Keys", "Forward Secrecy"],
      pulse: true,
      color: "var(--teal)"
    },
    {
      id: 'zero',
      icon: <FaUserShield />,
      title: "Arquitetura Zero Trust",
      description: "Verificação contínua em todas as camadas",
      stats: "Never Trust, Always Verify",
      gradient: "var(--gradient-indigo-neon)",
      features: ["Continuous Auth", "Microsegmentation", "Least Privilege"],
      pulse: true,
      color: "var(--indigo)"
    }
  ];

  // Métodos de autenticação
  const authMethods = [
    {
      id: 'biometric',
      icon: <FaFingerprint />,
      title: "Biometria",
      description: "Reconhecimento facial e digital",
      active: true
    },
    {
      id: 'hardware',
      icon: <FaIdCard />,
      title: "Hardware Key",
      description: "YubiKey e dispositivos FIDO2",
      active: true
    },
    {
      id: 'mobile',
      icon: <FaMobileAlt />,
      title: "Mobile App",
      description: "Autenticação via app dedicado",
      active: true
    }
  ];

  const passwordRequirements = [
    { id: 'length', text: '12+ caracteres', met: false },
    { id: 'uppercase', text: 'Maiúsculas & minúsculas', met: false },
    { id: 'numbers', text: 'Números (0-9)', met: false },
    { id: 'symbols', text: 'Símbolos especiais', met: false },
    { id: 'sequence', text: 'Sem sequências', met: false }
  ];

  useEffect(() => {
    // Inicializar partículas
    particlesInterval.current = setInterval(() => {
      if (containerRef.current) {
        createParticle();
      }
    }, 100);

    return () => {
      clearInterval(particlesInterval.current);
    };
  }, []);

  useEffect(() => {
    // Atualizar cards de fundo baseado no modo atual
    switch(authMode) {
      case 'login':
        setBackgroundCards(loginCards);
        break;
      case 'signup':
        setBackgroundCards(signupCards);
        break;
      case 'mfa':
        setBackgroundCards(mfaCards);
        break;
    }
  }, [authMode]);

  useEffect(() => {
    if (formData.password) {
      checkPasswordStrength(formData.password);
    } else {
      setPasswordStrength(0);
      resetPasswordRequirements();
    }
  }, [formData.password]);

  const createParticle = () => {
    if (particles.length > 30) return;

    const colors = backgroundCards.map(card => card.color).filter(Boolean);
    if (colors.length === 0) colors.push('var(--blue-neon)', 'var(--orange-fire)');
    
    const newParticle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      life: 100
    };

    setParticles(prev => [...prev.slice(-29), newParticle]);
  };

  const updateParticles = () => {
    setParticles(prev =>
      prev
        .map(p => ({
          ...p,
          x: p.x + p.speedX,
          y: p.y + p.speedY,
          life: p.life - 2
        }))
        .filter(p => p.life > 0 && p.x > 0 && p.x < 100 && p.y > 0 && p.y < 100)
    );
  };

  useEffect(() => {
    const interval = setInterval(updateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (!/(.)\1\1/.test(password)) strength++;
    
    setPasswordStrength(strength);
  };

  const resetPasswordRequirements = () => {
    passwordRequirements.forEach(req => req.met = false);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (authMode === 'signup') {
      if (!formData.name.trim()) errors.name = 'Nome completo é obrigatório';
      if (!formData.company.trim()) errors.company = 'Nome da empresa é obrigatório';
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem';
      }
      if (!formData.termsAccepted) {
        errors.termsAccepted = 'Você deve aceitar os termos e condições';
      }
    }

    if (!formData.email) {
      errors.email = 'E-mail é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Por favor, insira um e-mail válido';
    }

    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 12) {
      errors.password = 'A senha deve ter pelo menos 12 caracteres';
    }

    if (authMode === 'mfa' && !formData.mfaCode) {
      errors.mfaCode = 'Código de autenticação é obrigatório';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const switchAuthMode = (mode) => {
    // Animação de transição
    containerRef.current.classList.add(styles.transitionActive);
    
    setTimeout(() => {
      setAuthMode(mode);
      containerRef.current.classList.remove(styles.transitionActive);
    }, 300);

    // Reset form data based on mode
    if (mode === 'login') {
      setFormData({
        email: '',
        password: '',
        rememberMe: formData.rememberMe
      });
    } else if (mode === 'signup') {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        termsAccepted: false
      });
    } else {
      setFormData(prev => ({ ...prev, mfaCode: '' }));
    }
    
    setFormErrors({});
    
    // Criar partículas da transição
    createTransitionParticles(mode);
  };

  const createTransitionParticles = (mode) => {
    const colors = mode === 'login' 
      ? ['var(--orange-fire)', 'var(--blue-neon)', 'var(--purple)']
      : mode === 'signup'
      ? ['var(--green)', 'var(--cyan)', 'var(--pink)']
      : ['var(--gold)', 'var(--teal)', 'var(--indigo)'];
    
    for (let i = 0; i < 20; i++) {
      const particle = {
        id: Date.now() + Math.random() + i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50 + (Math.random() - 0.5) * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 2,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4,
        life: 150
      };
      
      setParticles(prev => [...prev, particle]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      containerRef.current.classList.add(styles.shake);
      setTimeout(() => containerRef.current.classList.remove(styles.shake), 500);
      return;
    }

    try {
      setLoading(true);
      
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Animação de sucesso
      await animateSuccess();
      
      // Se for login, mostrar MFA
      if (authMode === 'login') {
        setTimeout(() => {
          switchAuthMode('mfa');
        }, 1000);
      } else if (authMode === 'mfa') {
        // Se for MFA, navegar para dashboard
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        // Se for signup, mostrar sucesso e ir para login
        setTimeout(() => {
          switchAuthMode('login');
        }, 2000);
      }
      
    } catch (error) {
      console.error('Erro:', error);
      containerRef.current.classList.add(styles.errorShake);
      setTimeout(() => containerRef.current.classList.remove(styles.errorShake), 500);
    } finally {
      setLoading(false);
    }
  };

  const animateSuccess = async () => {
    // Efeito de partículas
    for (let i = 0; i < 15; i++) {
      const colors = backgroundCards.map(card => card.color);
      const particle = {
        id: Date.now() + Math.random() + i,
        x: 50,
        y: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6,
        life: 100
      };
      setParticles(prev => [...prev, particle]);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'var(--color-error)';
    if (passwordStrength <= 2) return 'var(--color-warning)';
    if (passwordStrength <= 3) return 'var(--orange-ember)';
    return 'var(--color-success)';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Muito Fraca';
    if (passwordStrength <= 2) return 'Fraca';
    if (passwordStrength <= 3) return 'Boa';
    if (passwordStrength === 4) return 'Forte';
    return 'Excelente';
  };

  const renderLoginForm = () => (
    <motion.div
      key="login"
      className={styles.authForm}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.formHeader}>
        <div className={styles.formIcon}>
          <FaSignInAlt />
        </div>
        <h2>Acesso Rápido e Seguro</h2>
        <p>Entre com suas credenciais para acessar recursos premium</p>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaEnvelope />
          <span>E-mail Corporativo</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@empresa.com"
          className={formErrors.email ? styles.error : ''}
        />
        {formErrors.email && (
          <span className={styles.errorMessage}>{formErrors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaLock />
          <span>Senha</span>
        </label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            className={formErrors.password ? styles.error : ''}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formErrors.password && (
          <span className={styles.errorMessage}>{formErrors.password}</span>
        )}
      </div>

      <div className={styles.formOptions}>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <span className={styles.checkmark}></span>
          <span>Manter sessão ativa</span>
        </label>
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={() => {/* Implementar recuperação */}}
        >
          Esqueceu a senha?
        </button>
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>Verificando...</span>
          </>
        ) : (
          <>
            <span>Acessar Sistema</span>
            <FaArrowRight />
          </>
        )}
        <div className={styles.buttonGlow} />
      </motion.button>
    </motion.div>
  );

  const renderSignupForm = () => (
    <motion.div
      key="signup"
      className={styles.authForm}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.formHeader}>
        <div className={styles.formIcon}>
          <FaUserPlus />
        </div>
        <h2>Junte-se à Nossa Plataforma</h2>
        <p>Crie sua conta para desbloquear todo o potencial</p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.inputLabel}>
            <FaUser />
            <span>Nome Completo</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            className={formErrors.name ? styles.error : ''}
          />
          {formErrors.name && (
            <span className={styles.errorMessage}>{formErrors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel}>
            <FaBuilding />
            <span>Empresa</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nome da empresa"
            className={formErrors.company ? styles.error : ''}
          />
          {formErrors.company && (
            <span className={styles.errorMessage}>{formErrors.company}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaEnvelope />
          <span>E-mail Corporativo</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="empresa@dominio.com"
          className={formErrors.email ? styles.error : ''}
        />
        {formErrors.email && (
          <span className={styles.errorMessage}>{formErrors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaKey />
          <span>Senha</span>
        </label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 12 caracteres"
            className={formErrors.password ? styles.error : ''}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        {formData.password && (
          <div className={styles.passwordStrength}>
            <div className={styles.strengthMeter}>
              <motion.div
                className={styles.strengthFill}
                style={{ backgroundColor: getStrengthColor() }}
                initial={{ width: 0 }}
                animate={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
            <div className={styles.strengthInfo}>
              <span>Força: <strong>{getStrengthText()}</strong></span>
              <span>{passwordStrength}/5 requisitos</span>
            </div>
          </div>
        )}
        
        {formErrors.password && (
          <span className={styles.errorMessage}>{formErrors.password}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaLock />
          <span>Confirmar Senha</span>
        </label>
        <div className={styles.passwordInput}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Digite a senha novamente"
            className={formErrors.confirmPassword ? styles.error : ''}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formErrors.confirmPassword && (
          <span className={styles.errorMessage}>{formErrors.confirmPassword}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className={formErrors.termsAccepted ? styles.error : ''}
          />
          <span className={styles.checkmark}></span>
          <span>
            Concordo com os{' '}
            <Link to="/terms" className={styles.termsLink}>Termos de Serviço</Link>{' '}
            e{' '}
            <Link to="/privacy" className={styles.termsLink}>Política de Privacidade</Link>
          </span>
        </label>
        {formErrors.termsAccepted && (
          <span className={styles.errorMessage}>{formErrors.termsAccepted}</span>
        )}
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>Criando conta...</span>
          </>
        ) : (
          <>
            <span>Começar Jornada</span>
            <FaRocket />
          </>
        )}
        <div className={styles.buttonGlow} />
      </motion.button>
    </motion.div>
  );

  const renderMFAForm = () => (
    <motion.div
      key="mfa"
      className={styles.authForm}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.formHeader}>
        <div className={styles.formIcon}>
          <FaShieldAlt />
        </div>
        <h2>Camada Extra de Segurança</h2>
        <p>Escolha seu método preferido de verificação</p>
      </div>

      <div className={styles.mfaMethods}>
        {authMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`${styles.mfaMethod} ${activeCard === method.id ? styles.active : ''}`}
            onClick={() => setActiveCard(method.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.mfaIcon}>
              {method.icon}
            </div>
            <div className={styles.mfaContent}>
              <h4>{method.title}</h4>
              <p>{method.description}</p>
            </div>
            {method.active && <div className={styles.activeBadge} />}
          </motion.div>
        ))}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaQrcode />
          <span>Código de Autenticação</span>
        </label>
        <input
          type="text"
          name="mfaCode"
          value={formData.mfaCode}
          onChange={handleChange}
          placeholder="Digite o código de 6 dígitos"
          className={formErrors.mfaCode ? styles.error : ''}
          maxLength="6"
        />
        {formErrors.mfaCode && (
          <span className={styles.errorMessage}>{formErrors.mfaCode}</span>
        )}
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading || !activeCard}
      >
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>Verificando...</span>
          </>
        ) : (
          <>
            <span>Verificar e Acessar</span>
            <FaCheckCircle />
          </>
        )}
        <div className={styles.buttonGlow} />
      </motion.button>
    </motion.div>
  );

  return (
    <div className={styles.authContainer} ref={containerRef}>
      {/* Particle System */}
      <div className={styles.particleSystem}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.life / 100,
              filter: `blur(${particle.size / 2}px)`
            }}
          />
        ))}
      </div>

      {/* Animated Grid */}
      <div className={styles.gridBackground} />



      {/* Main Wrapper */}
      <div className={styles.authWrapper}>
        {/* Header */}
        <motion.div
          className={styles.authHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <img src={Logotipofretevelocidadelaranja} alt="Transita.IA" className={styles.logo} />
              <div className={styles.logoGlow} />
            </div>
            <div className={styles.brandInfo}>
              <h1>Transita.IA</h1>
              <h1>Painel Para Empresas</h1>
              <p>Sistema de Autenticação Avançada</p>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <Link to="/" className={styles.backButton}>
              <FaArrowLeft />
              <span>Voltar ao Inicio</span>
            </Link>
            <div className={styles.statusIndicator}>
              <div className={styles.statusDot} />
              <span>Sistema: {authMode === 'login' ? 'Acesso' : authMode === 'signup' ? 'Registro' : 'Verificação'}</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.authContent}>
          {/* Left Column - Auth Forms */}
          <div className={styles.authColumn}>
            {/* Auth Tabs */}
            <div className={styles.authTabs}>
              {[
                { id: 'login', label: 'Login', icon: <FaSignInAlt /> },
                { id: 'signup', label: 'Criar Conta', icon: <FaUserPlus /> },
                { id: 'mfa', label: 'MFA', icon: <FaShieldAlt /> }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`${styles.authTab} ${authMode === tab.id ? styles.active : ''}`}
                  onClick={() => switchAuthMode(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {authMode === tab.id && (
                    <motion.div
                      className={styles.tabIndicator}
                      layoutId="tabIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Forms Container */}
            <div className={styles.formsContainer}>
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {authMode === 'login' && renderLoginForm()}
                  {authMode === 'signup' && renderSignupForm()}
                  {authMode === 'mfa' && renderMFAForm()}
                </AnimatePresence>
              </form>

              {/* Social Login */}
              {authMode === 'login' && (
                <div className={styles.socialLogin}>
                  <div className={styles.socialDivider}>
                    <span>ou continue com</span>
                  </div>
                  <div className={styles.socialButtons} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                    <motion.button
                      type="button"
                      className={`${styles.socialButton} ${styles.google}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGoogle />
                      <span>Google</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className={styles.infoColumn}>
            {/* Mode Indicator */}
            <div className={styles.modeIndicator}>
              <h3>
                {authMode === 'login' ? '🔓 Acesso Rápido' : 
                 authMode === 'signup' ? '🚀 Comece Agora' : 
                 '🛡️ Verificação Dupla'}
              </h3>
              <p>
                {authMode === 'login' ? 'Acesse recursos premium com segurança máxima' : 
                 authMode === 'signup' ? 'Desbloqueie todo o potencial da nossa plataforma' : 
                 'Proteção adicional para sua conta'}
              </p>
            </div>

            {/* Features List */}
            <div className={styles.featuresList}>
              <h4>Recursos Incluídos:</h4>
              <ul>
                {authMode === 'login' ? (
                  <>
                    <li><FaBolt /> Latência ultra baixa (&lt; 5ms)</li>
                    <li><FaShieldAlt /> Detecção de ameaças em tempo real</li>
                    <li><FaServer /> 99.99% disponibilidade</li>
                    <li><FaChartLine /> Analytics avançados</li>
                    <li><FaSync /> Sincronização automática</li>
                  </>
                ) : authMode === 'signup' ? (
                  <>
                    <li><FaInfinity /> Escalabilidade automática</li>
                    <li><FaPlug /> 150+ integrações nativas</li>
                    <li><FaNetworkWired /> Infraestrutura global</li>
                    <li><FaCogs /> Configuração flexível</li>
                    <li><FaCodeBranch /> API-first design</li>
                  </>
                ) : (
                  <>
                    <li><FaFingerprint /> Autenticação biométrica</li>
                    <li><FaShieldVirus /> Criptografia quântica</li>
                    <li><FaUserShield /> Arquitetura Zero Trust</li>
                    <li><FaMobileAlt /> App móvel dedicado</li>
                    <li><FaIdCard /> Suporte a hardware keys</li>
                  </>
                )}
              </ul>
            </div>

            {/* Stats */}
            <div className={styles.statsBox}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  {authMode === 'login' ? <FaBolt /> : authMode === 'signup' ? <FaInfinity /> : <FaShieldAlt />}
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>
                    {authMode === 'login' ? '99.9%' : authMode === 'signup' ? 'Auto' : 'Nível 4'}
                  </span>
                  <span className={styles.statLabel}>
                    {authMode === 'login' ? 'Uptime' : authMode === 'signup' ? 'Scaling' : 'Security'}
                  </span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  {authMode === 'login' ? <FaUsers /> : authMode === 'signup' ? <FaPlug /> : <FaMobileAlt />}
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>
                    {authMode === 'login' ? '10K+' : authMode === 'signup' ? '150+' : '3+'}
                  </span>
                  <span className={styles.statLabel}>
                    {authMode === 'login' ? 'Usuários' : authMode === 'signup' ? 'APIs' : 'Métodos'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaBox}>
              <h4>Pronto para {authMode === 'login' ? 'entrar' : authMode === 'signup' ? 'começar' : 'verificar'}?</h4>
              <p>
                {authMode === 'login' ? 'Acesse agora recursos exclusivos' : 
                 authMode === 'signup' ? 'Experimente 14 dias grátis' : 
                 'Complete a verificação para acessar'}
              </p>
              <motion.button
                className={styles.ctaButton}
                onClick={() => authMode === 'signup' ? switchAuthMode('signup') : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {authMode === 'login' ? 'Acessar Agora' : 
                 authMode === 'signup' ? 'Começar Teste' : 
                 'Verificar Conta'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.authFooter}>
          <div className={styles.footerContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()}Transit.IA. Todos os direitos reservados.
            </p>
            <div className={styles.footerLinks}>
              <Link to="/security">Segurança</Link>
              <Link to="/compliance">Conformidade</Link>
              <Link to="/support">Suporte</Link>
              <Link to="/docs">Documentação</Link>
            </div>
          </div>
          <div className={styles.securityBadge}>
            <FaShieldAlt />
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;