import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiLock, FiArrowRight, FiBriefcase, FiUser, 
  FiHash, FiCheckCircle, FiShield, FiEye, FiEyeOff,
  FiZap, FiMap, FiActivity, FiTrendingUp, FiAlertCircle
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useValidation from '../../hooks/useValidation';
import logo from '../../assets/images/Logo/logo.svg';
import './Login.css';

const Login = ({ onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [userType, setUserType] = useState('company');
  const [showPassword, setShowPassword] = useState(false);
  const [floatingLabels, setFloatingLabels] = useState({});
  const [particles, setParticles] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [cnpjData, setCnpjData] = useState(null);
  const [cepData, setCepData] = useState(null);
  
  const navigate = useNavigate();
  const { login, registerCompany, registerEmployee, loading: authLoading, error: authError } = useAuth();
  const { 
    validateCNPJ, 
    validateCEP, 
    validateEmail: validateEmailService,
    validatePassword: validatePasswordService,
    validations,
    loading: validationLoading,
    errors: validationErrors
  } = useValidation();

  // Configuração dos dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // CNPJ para empresa, ID para funcionário
    email: '',
    password: '',
    phone: '',
    cep: '',
    position: '',
    inviteToken: ''
  });

  // Geração de partículas de fundo
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Ativa floating label quando há conteúdo
    if (value.trim() !== '') {
      setFloatingLabels(prev => ({ ...prev, [name]: true }));
    } else {
      setFloatingLabels(prev => ({ ...prev, [name]: false }));
    }

    // Limpar erros de servidor
    setServerError(null);
  };

  const handleFocus = (fieldName) => {
    setFloatingLabels(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]?.trim()) {
      setFloatingLabels(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Validar CNPJ em tempo real
  const handleCNPJBlur = async () => {
    if (formData.identifier) {
      console.log('[Login] Validando CNPJ:', formData.identifier);
      const result = await validateCNPJ(formData.identifier);
      if (result) {
        console.log('[Login] ✅ CNPJ válido, dados:', result);
        setCnpjData(result);
        // Auto-preencher dados
        setFormData(prev => ({
          ...prev,
          name: result.name || prev.name
        }));
      } else {
        console.log('[Login] ❌ CNPJ inválido');
      }
    }
  };

  // Validar CEP em tempo real
  const handleCEPBlur = async () => {
    if (formData.cep) {
      const result = await validateCEP(formData.cep);
      if (result) {
        setCepData(result);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    try {
      let result;

      if (mode === 'login') {
        // Login
        if (!formData.email || !formData.password) {
          setServerError('Email e senha são obrigatórios');
          return;
        }

        result = await login(formData.email, formData.password);
      } else {
        // Register
        if (userType === 'company') {
          // Validar dados obrigatórios
          if (!formData.name || !formData.identifier || !formData.email || !formData.password) {
            setServerError('Preencha todos os campos obrigatórios');
            return;
          }

          // Validar CNPJ
          if (!validations.cnpj) {
            setServerError('Por favor, valide o CNPJ corretamente');
            return;
          }

          result = await registerCompany({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            cnpj: formData.identifier,
            cep: formData.cep,
            phone: formData.phone
          });
        } else {
          // Register funcionário
          if (!formData.name || !formData.email || !formData.password || !formData.inviteToken) {
            setServerError('Nome, email, senha e token de convite são obrigatórios');
            return;
          }

          result = await registerEmployee({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            position: formData.position,
            inviteToken: formData.inviteToken
          });
        }
      }

      if (result.success) {
        setSuccessMessage('Autenticação realizada com sucesso!');
        
        setTimeout(() => {
          if (onLogin) {
            onLogin(userType);
          }
          navigate(userType === 'company' ? '/profile/company' : '/profile/employee');
        }, 1500);
      } else {
        setServerError(result.error);
      }
    } catch (error) {
      setServerError('Erro inesperado. Tente novamente.');
      console.error('Form submission error:', error);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Limpar dados do formulário ao mudar de tipo
    setFormData({
      name: '',
      identifier: '',
      email: '',
      password: '',
      phone: '',
      cep: '',
      position: '',
      inviteToken: ''
    });
    setCnpjData(null);
    setCepData(null);
    setServerError(null);
    setFloatingLabels({});
  };

  // Animação de entrada
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="login-container">
      {/* Grid Pattern */}
      <div className="grid-pattern"></div>
      
      {/* Background Particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{ 
              x: `${particle.x}vw`, 
              y: `${particle.y}vh`,
              opacity: 0 
            }}
            animate={{ 
              y: `-${particle.y + 100}vh`,
              opacity: [0, 0.5, 0.3, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: userType === 'company' 
                ? 'rgba(16, 185, 129, 0.6)' 
                : 'rgba(59, 130, 246, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Background Gradient */}
      <div className={`background-gradient ${userType}-mode`}>
        <motion.div 
          className="gradient-shape shape-1"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="gradient-shape shape-2"
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="gradient-shape shape-3"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Connection Lines */}
      <div className="connection-lines">
        <div className="connection-line line-1"></div>
        <div className="connection-line line-2"></div>
        <div className="connection-line line-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        {/* Empresa Elements */}
        <motion.div 
          className="floating-element company warehouse"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🏭
        </motion.div>
        <motion.div 
          className="floating-element company gear"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          ⚙️
        </motion.div>
        
        {/* Funcionário Elements */}
        <motion.div 
          className="floating-element employee truck"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🚚
        </motion.div>
        <motion.div 
          className="floating-element employee satellite"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🛰️
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="login-content-wrapper"
      >
        {/* Left Side - Auth Form */}
        <div className="auth-section">
          <motion.div variants={itemVariants} className="brand-section">
            <motion.div 
              className={`brand-logo ${userType}-mode`}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 0.6,
                type: "spring"
              }}
            >
              <img src={logo} alt="Transita.IA" className="logo-svg" />
              <div className="logo-glow" />
            </motion.div>
            
            <div className="brand-text">
              <motion.h1 
                className="brand-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Transita<span className="brand-highlight">.IA</span>
              </motion.h1>
              <motion.p 
                className="brand-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Inteligência Logística Evolutiva
              </motion.p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="auth-container">
            <div className="auth-card">
              {/* User Type Selector */}
              <motion.div className="user-type-selector" layout>
                <motion.div 
                  className="selector-slider"
                  layoutId="selector"
                  animate={{
                    background: userType === 'company' 
                      ? 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
                
                <motion.button 
                  onClick={() => handleUserTypeChange('company')}
                  className={`selector-btn ${userType === 'company' ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiBriefcase className="btn-icon" />
                  <span>EMPRESA</span>
                  {userType === 'company' && (
                    <motion.div 
                      className="active-indicator"
                      layoutId="indicator"
                      initial={false}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    />
                  )}
                </motion.button>
                
                <motion.button 
                  onClick={() => handleUserTypeChange('employee')}
                  className={`selector-btn ${userType === 'employee' ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser className="btn-icon" />
                  <span>FUNCIONÁRIO</span>
                  {userType === 'employee' && (
                    <motion.div 
                      className="active-indicator"
                      layoutId="indicator"
                      initial={false}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    />
                  )}
                </motion.button>
              </motion.div>

              {/* Error Messages */}
              <AnimatePresence>
                {(serverError || authError) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="error-message"
                  >
                    <FiAlertCircle className="error-icon" />
                    <span>{serverError || authError}</span>
                  </motion.div>
                )}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="success-message"
                  >
                    <FiCheckCircle className="success-icon" />
                    <span>{successMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Section */}
              <motion.div className="form-section">
                <motion.div className="form-header">
                  <h2 className="form-title">
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={mode}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
                      </motion.span>
                    </AnimatePresence>
                  </h2>
                  <p className="form-subtitle">
                    {userType === 'company' 
                      ? 'Gestão logística inteligente' 
                      : 'Acesso operacional'}
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="auth-form">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`${mode}-${userType}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="form-content"
                    >
                      {mode === 'register' && (
                        <motion.div 
                          className="register-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Nome/Empresa */}
                          <div className="input-group">
                            <div className="input-wrapper">
                              <FiUser className="input-icon" />
                              <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('name')}
                                onBlur={() => handleBlur('name')}
                                className={`auth-input ${floatingLabels.name ? 'has-value' : ''}`}
                                placeholder=" "
                                disabled={authLoading}
                              />
                              <label className={`input-label ${floatingLabels.name ? 'floating' : ''}`}>
                                {userType === 'company' ? 'Nome da Empresa' : 'Nome Completo'}
                              </label>
                              <div className="input-underline" />
                            </div>
                          </div>

                          {/* CNPJ/ID ou Token */}
                          <div className="input-group">
                            <div className="input-wrapper">
                              <FiHash className="input-icon" />
                              <input 
                                type="text"
                                name={userType === 'company' ? 'identifier' : 'inviteToken'}
                                value={userType === 'company' ? formData.identifier : formData.inviteToken}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus(userType === 'company' ? 'identifier' : 'inviteToken')}
                                onBlur={() => {
                                  handleBlur(userType === 'company' ? 'identifier' : 'inviteToken');
                                  if (userType === 'company') {
                                    handleCNPJBlur();
                                  }
                                }}
                                className={`auth-input ${floatingLabels[userType === 'company' ? 'identifier' : 'inviteToken'] ? 'has-value' : ''} ${validationErrors[userType === 'company' ? 'cnpj' : ''] ? 'error' : ''}`}
                                placeholder=" "
                                disabled={authLoading}
                              />
                              <label className={`input-label ${floatingLabels[userType === 'company' ? 'identifier' : 'inviteToken'] ? 'floating' : ''}`}>
                                {userType === 'company' ? 'CNPJ' : 'Token de Convite'}
                              </label>
                              {validationLoading[userType === 'company' ? 'cnpj' : ''] && (
                                <div className="loading-spinner-small" />
                              )}
                              {validationErrors[userType === 'company' ? 'cnpj' : ''] && (
                                <span className="field-error">{validationErrors[userType === 'company' ? 'cnpj' : '']}</span>
                              )}
                              <div className="input-underline" />
                            </div>
                          </div>

                          {/* CEP (apenas para empresa) */}
                          {userType === 'company' && (
                            <div className="input-group">
                              <div className="input-wrapper">
                                <FiMap className="input-icon" />
                                <input 
                                  type="text"
                                  name="cep"
                                  value={formData.cep}
                                  onChange={handleInputChange}
                                  onFocus={() => handleFocus('cep')}
                                  onBlur={() => {
                                    handleBlur('cep');
                                    handleCEPBlur();
                                  }}
                                  className={`auth-input ${floatingLabels.cep ? 'has-value' : ''}`}
                                  placeholder=" "
                                  disabled={authLoading}
                                />
                                <label className={`input-label ${floatingLabels.cep ? 'floating' : ''}`}>
                                  CEP (opcional)
                                </label>
                                {validationLoading.cep && (
                                  <div className="loading-spinner-small" />
                                )}
                                <div className="input-underline" />
                              </div>
                            </div>
                          )}

                          {/* Telefone */}
                          <div className="input-group">
                            <div className="input-wrapper">
                              <FiHash className="input-icon" />
                              <input 
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('phone')}
                                onBlur={() => handleBlur('phone')}
                                className={`auth-input ${floatingLabels.phone ? 'has-value' : ''}`}
                                placeholder=" "
                                disabled={authLoading}
                              />
                              <label className={`input-label ${floatingLabels.phone ? 'floating' : ''}`}>
                                Telefone (opcional)
                              </label>
                              <div className="input-underline" />
                            </div>
                          </div>

                          {/* Posição (apenas para funcionário) */}
                          {userType === 'employee' && (
                            <div className="input-group">
                              <div className="input-wrapper">
                                <FiBriefcase className="input-icon" />
                                <input 
                                  type="text"
                                  name="position"
                                  value={formData.position}
                                  onChange={handleInputChange}
                                  onFocus={() => handleFocus('position')}
                                  onBlur={() => handleBlur('position')}
                                  className={`auth-input ${floatingLabels.position ? 'has-value' : ''}`}
                                  placeholder=" "
                                  disabled={authLoading}
                                />
                                <label className={`input-label ${floatingLabels.position ? 'floating' : ''}`}>
                                  Posição/Cargo (opcional)
                                </label>
                                <div className="input-underline" />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Email */}
                      <div className="input-group">
                        <div className="input-wrapper">
                          <FiMail className="input-icon" />
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            className={`auth-input ${floatingLabels.email ? 'has-value' : ''}`}
                            placeholder=" "
                            disabled={authLoading}
                          />
                          <label className={`input-label ${floatingLabels.email ? 'floating' : ''}`}>
                            E-mail Corporativo
                          </label>
                          <div className="input-underline" />
                        </div>
                      </div>

                      {/* Senha */}
                      <div className="input-group">
                        <div className="input-wrapper">
                          <FiLock className="input-icon" />
                          <input 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            className={`auth-input ${floatingLabels.password ? 'has-value' : ''}`}
                            placeholder=" "
                            disabled={authLoading}
                          />
                          <label className={`input-label ${floatingLabels.password ? 'floating' : ''}`}>
                            Senha
                          </label>
                          <button 
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={authLoading}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                          <div className="input-underline" />
                        </div>
                        {mode === 'login' && (
                          <button 
                            type="button"
                            className={`forgot-password ${userType}-mode`}
                            disabled={authLoading}
                          >
                            Esqueceu a senha?
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button 
                    type="submit"
                    disabled={authLoading}
                    className={`submit-btn ${userType}-mode`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={authLoading ? { 
                      scale: [1, 1.05, 1],
                      transition: { 
                        duration: 1,
                        repeat: Infinity 
                      }
                    } : {}}
                  >
                    {authLoading ? (
                      <div className="loading-wrapper">
                        <div className="loading-spinner" />
                        <span>Processando...</span>
                      </div>
                    ) : (
                      <>
                        <span>{mode === 'login' ? 'Acessar Sistema' : 'Criar Conta'}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity 
                          }}
                        >
                          <FiArrowRight className="btn-arrow" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>

                  {/* Toggle Mode */}
                  <div className="form-footer">
                    <motion.button 
                      type="button"
                      onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                      className="toggle-mode"
                      whileHover={{ scale: 1.05 }}
                      disabled={authLoading}
                    >
                      {mode === 'login' ? 'Não tem uma conta?' : 'Já possui conta?'}
                      <span className={`toggle-highlight ${userType}-mode`}>
                        {mode === 'login' ? ' Cadastre-se' : ' Fazer login'}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              {/* Security Badge */}
              <motion.div 
                className="security-badge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FiShield className="shield-icon" />
                <div className="security-info">
                  <span className="security-text">Protegido por Transita Guard</span>
                  <span className="security-version">v4.2 • AES-256</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Info Cards */}
        <motion.div variants={itemVariants} className="info-section">
          <AnimatePresence mode="wait">
            {userType === 'company' ? (
              <motion.div
                key="company-cards"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="info-cards"
              >
                <motion.div 
                  className="info-card company-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiTrendingUp className="card-icon" size={32} />
                  <h3 className="card-title">Gestão Corporativa</h3>
                  <p className="card-description">
                    Controle total sobre frotas, multas e custos operacionais.
                  </p>
                </motion.div>

                <motion.div 
                  className="info-card company-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiShield className="card-icon" size={32} />
                  <h3 className="card-title">Segurança Quantum</h3>
                  <p className="card-description">
                    Protocolos Zero Trust protegendo cada byte de informação da sua logística.
                  </p>
                </motion.div>

                <motion.div 
                  className="info-card company-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiZap className="card-icon" size={32} />
                  <h3 className="card-title">Sistema Global</h3>
                  <p className="card-description">
                    Infraestrutura de Próxima Geração. Integre-se ao ecossistema logístico mais avançado do país com escalabilidade neural.
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="employee-cards"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="info-cards"
              >
                <motion.div 
                  className="info-card employee-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiMap className="card-icon" size={32} />
                  <h3 className="card-title">Painel do Motorista</h3>
                  <p className="card-description">
                    Acesse suas rotas, histórico de viagens e bonificações.
                  </p>
                </motion.div>

                <motion.div 
                  className="info-card employee-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiShield className="card-icon" size={32} />
                  <h3 className="card-title">Segurança Quantum</h3>
                  <p className="card-description">
                    Protocolos Zero Trust protegendo cada byte de informação da sua logística.
                  </p>
                </motion.div>

                <motion.div 
                  className="info-card employee-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiActivity className="card-icon" size={32} />
                  <h3 className="card-title">Sistema Global</h3>
                  <p className="card-description">
                    Conectividade de Próxima Geração. Integre-se ao ecossistema logístico mais avançado do país com escalabilidade neural.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <motion.div 
            className={`decorative-dot dot-1 ${userType}-mode`}
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`decorative-dot dot-2 ${userType}-mode`}
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;