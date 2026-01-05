import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaMicrosoft,
  FaArrowLeft,
  FaLock,
  FaUser,
  FaEnvelope,
  FaKey,
  FaCheckCircle,
  FaBuilding,
  FaChartLine,
  FaUsers,
  FaServer,
  FaPlug,
  FaFingerprint,
  FaShieldAlt,
  FaBolt,
  FaInfinity,
  FaSignInAlt,
  FaUserPlus,
  FaArrowRight,
  FaRocket,
  FaQrcode,
  FaMobileAlt,
  FaIdCard,
  FaShieldVirus,
  FaUserShield,
  FaUserTie,
  FaChevronRight,
  FaSync,
  FaQuestionCircle,
  FaPhone,
  FaCalendarAlt,
  FaFileAlt,
  FaDatabase,
  FaDesktop,
  FaHistory,
  FaHeadset,
  FaClock,
  FaCheck
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logotipofretevelocidadelaranja from '../../assets/images/Logo/Logotipofretevelocidadelaranja.png';
import styles from './EmployeeAuth.module.css';

const EmployeeAuth = ({ initialMode = 'login' }) => {
  const [authMode, setAuthMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    position: '',
    mfaCode: '',
    termsAccepted: false,
    rememberMe: false,
    useSSO: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [particles, setParticles] = useState([]);
  const [activeMfaMethod, setActiveMfaMethod] = useState('app');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  // Departamentos da empresa
  const departments = [
    'TI & Infraestrutura',
    'Desenvolvimento',
    'Operações',
    'Suporte Técnico',
    'Segurança',
    'Administrativo',
    'RH',
    'Financeiro',
    'Marketing',
    'Vendas',
    'Motoristas'
  ];

  // Métodos de autenticação MFA
  const mfaMethods = [
    {
      id: 'app',
      icon: <FaMobileAlt />,
      title: "App Authenticator",
      description: "Código via Google Authenticator",
      active: true,
      color: 'var(--color-primary)'
    },
    {
      id: 'sms',
      icon: <FaMobileAlt />,
      title: "SMS",
      description: "Código enviado por SMS",
      active: true,
      color: 'var(--color-cyan)'
    },
    {
      id: 'email',
      icon: <FaEnvelope />,
      title: "E-mail",
      description: "Código enviado por e-mail",
      active: true,
      color: 'var(--color-orange)'
    },
    {
      id: 'biometric',
      icon: <FaFingerprint />,
      title: "Biometria",
      description: "Reconhecimento facial/digital",
      active: true,
      color: 'var(--color-purple)'
    }
  ];

  // Features por modo
  const modeFeatures = {
    login: [
      { icon: <FaChartLine />, text: 'Dashboard de desempenho' },
      { icon: <FaServer />, text: 'Acesso a sistemas internos' },
      { icon: <FaCalendarAlt />, text: 'Gestão de horários' },
      { icon: <FaFileAlt />, text: 'Documentos corporativos' },
      { icon: <FaUsers />, text: 'Comunicação interna' }
    ],
    signup: [
      { icon: <FaCheckCircle />, text: 'Cadastro único para todos os sistemas' },
      { icon: <FaShieldAlt />, text: 'Segurança de nível empresarial' },
      { icon: <FaSync />, text: 'Sincronização automática de dados' },
      { icon: <FaDesktop />, text: 'Acesso multi-dispositivo' },
      { icon: <FaHeadset />, text: 'Suporte 24/7' }
    ],
    mfa: [
      { icon: <FaFingerprint />, text: 'Múltiplos métodos de autenticação' },
      { icon: <FaShieldVirus />, text: 'Proteção contra ataques' },
      { icon: <FaHistory />, text: 'Logs de acesso detalhados' },
      { icon: <FaMobileAlt />, text: 'Acesso móvel seguro' },
      { icon: <FaClock />, text: 'Códigos com tempo limitado' }
    ]
  };

  // Efeitos
  useEffect(() => {
    // Inicializar partículas
    const interval = setInterval(() => {
      if (containerRef.current && particles.length < 15) {
        createParticle();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Atualizar força da senha
    if (formData.password) {
      checkPasswordStrength(formData.password);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  // Funções auxiliares
  const createParticle = () => {
    const colors = [
      'rgba(37, 99, 235, 0.4)',
      'rgba(14, 165, 233, 0.3)',
      'rgba(139, 92, 246, 0.3)',
      'rgba(6, 182, 212, 0.3)'
    ];
    
    const particle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      life: 100,
      opacity: 0.6
    };

    setParticles(prev => [...prev.slice(-14), particle]);
  };

  const updateParticles = () => {
    setParticles(prev =>
      prev
        .map(p => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
          life: p.life - 0.3,
          opacity: (p.life / 100) * 0.6
        }))
        .filter(p => p.life > 0)
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
    if ((password.match(/[0-9]/g) || []).length >= 2) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (!/(.)\1\1/.test(password) && !/(123|abc|qwe)/i.test(password)) strength++;
    
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const employeeIdRegex = /^[A-Z0-9]{6,10}$/;

    if (authMode === 'signup') {
      if (!formData.employeeId.trim()) {
        errors.employeeId = 'ID do funcionário é obrigatório';
      } else if (!employeeIdRegex.test(formData.employeeId)) {
        errors.employeeId = 'ID inválido (6-10 caracteres alfanuméricos)';
      }

      if (!formData.name.trim()) errors.name = 'Nome completo é obrigatório';
      if (!formData.department) errors.department = 'Departamento é obrigatório';
      if (!formData.position.trim()) errors.position = 'Cargo é obrigatório';
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem';
      }
      
      if (!formData.termsAccepted) {
        errors.termsAccepted = 'Você deve aceitar os termos e políticas';
      }
    }

    if (!formData.email) {
      errors.email = 'E-mail corporativo é obrigatório';
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

  const switchAuthMode = async (mode) => {
    if (isTransitioning || mode === authMode) return;
    
    setIsTransitioning(true);
    
    // Animação de saída
    if (formRef.current) {
      formRef.current.classList.add(styles.fadeOut);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Atualizar estado
    setAuthMode(mode);
    setFormErrors({});
    
    // Reset form data based on mode
    if (mode === 'login') {
      setFormData({
        email: '',
        password: '',
        rememberMe: formData.rememberMe,
        useSSO: formData.useSSO
      });
    } else if (mode === 'signup') {
      setFormData({
        employeeId: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        position: '',
        termsAccepted: false
      });
    } else {
      setFormData(prev => ({ ...prev, mfaCode: '' }));
    }
    
    // Criar partículas de transição
    createTransitionParticles(mode);
    
    // Animação de entrada
    if (formRef.current) {
      formRef.current.classList.remove(styles.fadeOut);
      formRef.current.classList.add(styles.fadeIn);
      
      setTimeout(() => {
        formRef.current.classList.remove(styles.fadeIn);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const createTransitionParticles = (mode) => {
    const colors = {
      login: ['rgba(37, 99, 235, 0.5)', 'rgba(14, 165, 233, 0.4)'],
      signup: ['rgba(16, 185, 129, 0.5)', 'rgba(6, 182, 212, 0.4)'],
      mfa: ['rgba(139, 92, 246, 0.5)', 'rgba(236, 72, 153, 0.4)']
    };
    
    const modeColors = colors[mode] || colors.login;
    
    for (let i = 0; i < 8; i++) {
      const particle = {
        id: Date.now() + Math.random() + i,
        x: 50 + (Math.random() - 0.5) * 10,
        y: 50 + (Math.random() - 0.5) * 10,
        color: modeColors[Math.floor(Math.random() * modeColors.length)],
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 80,
        opacity: 0.8
      };
      
      setParticles(prev => [...prev, particle]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      containerRef.current?.classList.add(styles.shake);
      setTimeout(() => containerRef.current?.classList.remove(styles.shake), 500);
      return;
    }

    try {
      setLoading(true);
      
      // Efeito de carregamento
      if (formRef.current) {
        formRef.current.classList.add(styles.loading);
      }
      
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Animação de sucesso
      await animateSuccess();
      
      // Se for login, mostrar MFA
      if (authMode === 'login') {
        switchAuthMode('mfa');
      } else if (authMode === 'mfa') {
        navigate('/dashboard/employee');
      } else {
        // Se for signup, mostrar sucesso
        setTimeout(() => {
          switchAuthMode('login');
        }, 2000);
      }
      
    } catch (error) {
      console.error('Erro:', error);
      containerRef.current?.classList.add(styles.errorShake);
      setTimeout(() => containerRef.current?.classList.remove(styles.errorShake), 500);
    } finally {
      setLoading(false);
      if (formRef.current) {
        formRef.current.classList.remove(styles.loading);
      }
    }
  };

  const animateSuccess = async () => {
    // Efeito de partículas de sucesso
    for (let i = 0; i < 12; i++) {
      const colors = ['rgba(16, 185, 129, 0.6)', 'rgba(34, 197, 94, 0.5)', 'rgba(6, 182, 212, 0.5)'];
      const particle = {
        id: Date.now() + Math.random() + i,
        x: 50 + (Math.random() - 0.5) * 15,
        y: 50 + (Math.random() - 0.5) * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        life: 120,
        opacity: 0.7
      };
      setParticles(prev => [...prev, particle]);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'var(--color-error)';
    if (passwordStrength <= 2) return 'var(--color-warning)';
    if (passwordStrength <= 3) return 'var(--color-orange)';
    return 'var(--color-success)';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Muito Fraca';
    if (passwordStrength <= 2) return 'Fraca';
    if (passwordStrength <= 3) return 'Boa';
    if (passwordStrength === 4) return 'Forte';
    return 'Excelente';
  };

  // Componentes de formulário
  const renderLoginForm = () => (
    <motion.div
      key="login"
      className={styles.authForm}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.formHeader}>
        <motion.div 
          className={styles.formIcon}
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <FaSignInAlt />
        </motion.div>
        <h2>Acesso aos Funcionário</h2>
        <p>Entre com suas credenciais corporativas</p>
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
          placeholder="seu.nome@empresa.com"
          className={formErrors.email ? styles.error : ''}
        />
        {formErrors.email && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.email}
          </motion.span>
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
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formErrors.password && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.password}
          </motion.span>
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
          <span>Manter conectado</span>
        </label>
        
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="useSSO"
            checked={formData.useSSO}
            onChange={handleChange}
          />
          <span className={styles.checkmark}></span>
          <span>Usar SSO Corporativo</span>
        </label>
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading || isTransitioning}
      >
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>Autenticando...</span>
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.formHeader}>
        <motion.div 
          className={styles.formIcon}
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <FaUserPlus />
        </motion.div>
        <h2>Cadastro de Funcionário</h2>
        <p>Preencha seus dados para acesso ao sistema</p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.inputLabel}>
            <FaIdCard />
            <span>ID do Funcionário *</span>
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Ex: EMP00123"
            className={formErrors.employeeId ? styles.error : ''}
          />
          {formErrors.employeeId && (
            <motion.span 
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formErrors.employeeId}
            </motion.span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel}>
            <FaUser />
            <span>Nome Completo *</span>
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
            <motion.span 
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formErrors.name}
            </motion.span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.inputLabel}>
            <FaBuilding />
            <span>Departamento *</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`${styles.selectInput} ${formErrors.department ? styles.error : ''}`}
          >
            <option value="">Selecione um departamento</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {formErrors.department && (
            <motion.span 
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formErrors.department}
            </motion.span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel}>
            <FaUserTie />
            <span>Cargo *</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Ex: Desenvolvedor Senior"
            className={formErrors.position ? styles.error : ''}
          />
          {formErrors.position && (
            <motion.span 
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formErrors.position}
            </motion.span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaEnvelope />
          <span>E-mail Corporativo *</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu.nome@empresa.com"
          className={formErrors.email ? styles.error : ''}
        />
        {formErrors.email && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.email}
          </motion.span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaKey />
          <span>Senha *</span>
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
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className={styles.strengthInfo}>
              <span>Força: <strong>{getStrengthText()}</strong></span>
              <span>{passwordStrength}/5 requisitos</span>
            </div>
          </div>
        )}
        
        {formErrors.password && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.password}
          </motion.span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaLock />
          <span>Confirmar Senha *</span>
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
            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formErrors.confirmPassword && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.confirmPassword}
          </motion.span>
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
            <Link to="/terms/employee" className={styles.termsLink}>Termos de Uso</Link>{' '}
            e{' '}
            <Link to="/policies/employee" className={styles.termsLink}>Políticas Internas</Link>
          </span>
        </label>
        {formErrors.termsAccepted && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.termsAccepted}
          </motion.span>
        )}
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading || isTransitioning}
      >
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>Criando acesso...</span>
          </>
        ) : (
          <>
            <span>Finalizar Cadastro</span>
            <FaCheckCircle />
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.formHeader}>
        <motion.div 
          className={styles.formIcon}
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <FaShieldAlt />
        </motion.div>
        <h2>Verificação em Duas Etapas</h2>
        <p>Escolha seu método de autenticação</p>
      </div>

      <div className={styles.mfaMethods}>
        {mfaMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`${styles.mfaMethod} ${activeMfaMethod === method.id ? styles.active : ''}`}
            onClick={() => setActiveMfaMethod(method.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ '--method-color': method.color }}
          >
            <div className={styles.mfaIcon}>
              {method.icon}
            </div>
            <div className={styles.mfaContent}>
              <h4>{method.title}</h4>
              <p>{method.description}</p>
            </div>
            {activeMfaMethod === method.id && (
              <div className={styles.activeBadge}>
                <FaCheck />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.inputLabel}>
          <FaQrcode />
          <span>Código de Autenticação *</span>
        </label>
        <input
          type="text"
          name="mfaCode"
          value={formData.mfaCode}
          onChange={handleChange}
          placeholder="Digite o código de 6 dígitos"
          className={formErrors.mfaCode ? styles.error : ''}
          maxLength="6"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        {formErrors.mfaCode && (
          <motion.span 
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formErrors.mfaCode}
          </motion.span>
        )}
        
        <div className={styles.mfaHelp}>
          <motion.button 
            type="button" 
            className={styles.mfaHelpButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSync />
            <span>Enviar novo código</span>
          </motion.button>
          <motion.button 
            type="button" 
            className={styles.mfaHelpButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaQuestionCircle />
            <span>Problemas com autenticação?</span>
          </motion.button>
        </div>
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading || isTransitioning || !formData.mfaCode}
      >
        {loading ? (
          <>
            <div className={styles.spinner}></div>
            <span>Verificando...</span>
          </>
        ) : (
          <>
            <span>Verificar e Acessar</span>
            <FaArrowRight />
          </>
        )}
        <div className={styles.buttonGlow} />
      </motion.button>
    </motion.div>
  );

  return (
    <div className={styles.authContainer} ref={containerRef}>
      {/* Sistema de Partículas */}
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
              opacity: particle.opacity,
              filter: `blur(${particle.size}px)`
            }}
          />
        ))}
      </div>

      {/* Grid Background Sutil */}
      <div className={styles.gridBackground} />

      {/* Gradientes de Fundo */}
      <div className={styles.gradientBackground}>
        <div className={styles.gradientPrimary} />
        <div className={styles.gradientSecondary} />
      </div>

      {/* Wrapper Principal */}
      <div className={styles.authWrapper}>
        {/* Header */}
        <motion.header
          className={styles.authHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.brandSection}>
            <motion.div 
              className={styles.logoContainer}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={Logotipofretevelocidadelaranja} alt="Logotipofretevelocidadelaranja" className={styles.logo} />
              <div className={styles.logoGlow} />
            </motion.div>
            <div className={styles.brandInfo}>
                <h1>Transita.IA</h1>
              <h1>Portal do Funcionário</h1>
              <p>Sistema de Autenticação Corporativa</p>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <motion.a
              href="/"
              className={styles.backButton}
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowLeft />
              <span>Voltar ao Portal</span>
            </motion.a>
            <div className={styles.statusIndicator}>
              <motion.div 
                className={styles.statusDot}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span>
                {authMode === 'login' ? '🔐 Acesso' : 
                 authMode === 'signup' ? '📝 Cadastro' : 
                 '🛡️ Verificação'}
              </span>
            </div>
          </div>
        </motion.header>

        <div className={styles.authContent}>
          {/* Coluna de Autenticação */}
          <div className={styles.authColumn}>
            {/* Tabs de Autenticação */}
            <motion.div 
              className={styles.authTabs}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.button
                className={`${styles.authTab} ${authMode === 'login' ? styles.active : ''}`}
                onClick={() => switchAuthMode('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTransitioning}
              >
                <FaSignInAlt />
                <span>Login</span>
                {authMode === 'login' && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tabIndicator"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.button>

              <motion.button
                className={`${styles.authTab} ${authMode === 'signup' ? styles.active : ''}`}
                onClick={() => switchAuthMode('signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTransitioning}
              >
                <FaUserPlus />
                <span>Primeiro Acesso</span>
                {authMode === 'signup' && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tabIndicator"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.button>

              <motion.button
                className={`${styles.authTab} ${authMode === 'mfa' ? styles.active : ''}`}
                onClick={() => switchAuthMode('mfa')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTransitioning}
              >
                <FaShieldAlt />
                <span>MFA</span>
                {authMode === 'mfa' && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tabIndicator"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.button>
            </motion.div>

            {/* Container dos Formulários */}
            <div className={styles.formsContainer} ref={formRef}>
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {authMode === 'login' && renderLoginForm()}
                  {authMode === 'signup' && renderSignupForm()}
                  {authMode === 'mfa' && renderMFAForm()}
                </AnimatePresence>
              </form>

              {/* Login Social */}
              {authMode === 'login' && (
                <motion.div 
                  className={styles.socialLogin}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className={styles.socialDivider}>
                    <span>ou acesse com</span>
                  </div>
                  <div className={styles.socialButtons}>
                    <motion.button
                      type="button"
                      className={`${styles.socialButton} ${styles.google}`}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGoogle />
                      <span>Google </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Coluna de Informações */}
          <motion.div 
            className={styles.infoColumn}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Indicador de Modo */}
            <div className={styles.modeIndicator}>
              <motion.h3
                key={authMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {authMode === 'login' ? '🔓 Acesso Corporativo' : 
                 authMode === 'signup' ? '🚀 Bem-vindo à Empresa' : 
                 '🛡️ Segurança Avançada'}
              </motion.h3>
              <motion.p
                key={`${authMode}-desc`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {authMode === 'login' ? 'Acesse sistemas internos e ferramentas da empresa' : 
                 authMode === 'signup' ? 'Complete seu cadastro para começar a trabalhar' : 
                 'Proteção adicional para dados corporativos sensíveis'}
              </motion.p>
            </div>

            {/* Lista de Recursos */}
            <div className={styles.featuresList}>
              <h4>Recursos Disponíveis:</h4>
              <ul>
                {modeFeatures[authMode]?.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <span className={styles.featureIcon}>{feature.icon}</span>
                    {feature.text}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Estatísticas */}
            <div className={styles.statsBox}>
              <motion.div 
                className={styles.statItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className={styles.statIcon}>
                  <FaUsers />
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>500+</span>
                  <span className={styles.statLabel}>Funcionários</span>
                </div>
              </motion.div>
              <motion.div 
                className={styles.statItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className={styles.statIcon}>
                  <FaShieldAlt />
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>99.99%</span>
                  <span className={styles.statLabel}>Uptime</span>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div 
              className={styles.ctaBox}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h4>Precisa de ajuda?</h4>
              <p>Entre em contato com o nosso suporte técnico</p>
              <div className={styles.ctaButtons}>
                <motion.button
                  className={styles.ctaButtonSecondary}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:suporte@empresa.com')}
                >
                  <FaEnvelope />
                  <span>E-mail</span>
                </motion.button>
                <motion.button
                  className={styles.ctaButtonPrimary}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('tel:+5511999999999')}
                >
                  <FaPhone />
                  <span>Telefone</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className={styles.authFooter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.footerContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Empresa. Todos os direitos reservados.
            </p>
            <div className={styles.footerLinks}>
              <Link to="/security">Segurança</Link>
              <Link to="/privacy">Privacidade</Link>
              <Link to="/help">Ajuda</Link>
              <Link to="/contact">Contato</Link>
            </div>
          </div>
          <motion.div 
            className={styles.securityBadge}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FaShieldAlt />
            <span>ISO 27001 & SOC 2</span>
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
};

export default EmployeeAuth;