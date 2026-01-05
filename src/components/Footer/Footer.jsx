import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logotipofretevelocidadelaranja from '../../assets/images/Logo/Logotipofretevelocidadelaranja.png';
import {
  FiTruck, FiLinkedin, FiTwitter, FiInstagram, FiMapPin, FiTrendingUp,
  FiHeadphones, FiPhone, FiMail, FiShield, FiInfo, FiPackage, FiClock,
  FiDollarSign, FiGlobe, FiDatabase, FiBox, FiNavigation, FiCpu,
  FiSettings, FiBarChart2, FiUser, FiMessageCircle, FiAward, FiStar, FiZap,
  FiChevronRight, FiCheck, FiArrowRight, FiBell, FiCalendar, FiDownload,
  FiFileText, FiPlay, FiExternalLink, FiActivity, FiTarget, FiSmartphone
} from 'react-icons/fi';
import './Footer.css';

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

const AnimatedIcon = ({ icon: Icon, color, size = 24, animation = "float" }) => {
  const animations = {
    float: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 2, repeat: Infinity }
    },
    rotate: {
      animate: { rotate: 360 },
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    },
    pulse: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 2, repeat: Infinity }
    }
  };

  return (
    <motion.div
      className="animated-icon"
      {...animations[animation]}
      style={{ color }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

// ============================================================================
// COMPONENTE DE LOGO
// ============================================================================

const LogoSection = () => {
  return (
    <motion.section 
      className="footer-logo-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-logo-container">
        <motion.div 
          className="footer-logo-wrapper"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="footer-logo-circle">
            <motion.div 
              className="footer-logo-orb"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            />
          </div>
          
          <div className="footer-logo-image-container">
            <img 
              src={Logotipofretevelocidadelaranja} 
              alt="Transita.AI" 
              className="footer-logo-image"
              loading="lazy"
            />
          </div>
          
          <div className="footer-logo-glow" />
        </motion.div>
        
        <div className="footer-logo-content">
          <motion.h2 
            className="footer-logo-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Transita<span className="footer-logo-highlight">.AI</span>
          </motion.h2>
          
          <motion.p 
            className="footer-logo-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Inteligência Avançada em Logística
          </motion.p>
          
          <div className="footer-logo-tags">
            {[
              { icon: FiCpu, text: "AI Powered", color: "#f97316" },
              { icon: FiZap, text: "Real-Time", color: "#3b82f6" },
              { icon: FiShield, text: "Enterprise", color: "#10b981" }
            ].map((tag, idx) => (
              <motion.span
                key={idx}
                className="footer-logo-tag"
                style={{ '--tag-color': tag.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <tag.icon className="footer-tag-icon" />
                <span>{tag.text}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="footer-logo-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p>Revolucionando a logística com tecnologia de ponta e inteligência artificial</p>
        <motion.a 
          href="/sobre" 
          className="footer-logo-link"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Conheça nossa história</span>
          <FiChevronRight className="footer-link-arrow" />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

// ============================================================================
// COMPONENTE DE ESTATÍSTICAS
// ============================================================================

const StatsSection = () => {
  const stats = useMemo(() => [
    {
      value: "2.847",
      label: "Veículos Ativos",
      icon: FiTruck,
      color: "#f97316",
      change: "+12%",
      desc: "Crescimento mensal"
    },
    {
      value: "98.3%",
      label: "Eficiência",
      icon: FiTrendingUp,
      color: "#10b981",
      change: "+5.2%",
      desc: "Otimização com IA"
    },
    {
      value: "R$ 42K",
      label: "Economia",
      icon: FiDollarSign,
      color: "#3b82f6",
      change: "-23%",
      desc: "Redução de custos"
    },
    {
      value: "24/7",
      label: "Suporte",
      icon: FiHeadphones,
      color: "#8b5cf6",
      change: "98%",
      desc: "Satisfação"
    }
  ], []);

  return (
    <motion.section 
      className="footer-stats-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="footer-stats-header">
        <motion.h3 
          className="footer-stats-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Números que <span className="footer-title-highlight">Impulsionam</span>
        </motion.h3>
        <motion.p 
          className="footer-stats-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Resultados reais que transformam operações
        </motion.p>
      </div>
      
      <div className="footer-stats-grid">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="footer-stat-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ 
              y: -10,
              scale: 1.05,
              boxShadow: `0 20px 40px ${stat.color}30`
            }}
            transition={{ 
              duration: 0.5,
              delay: idx * 0.1,
              type: "spring",
              stiffness: 300
            }}
            viewport={{ once: true }}
          >
            <div className="footer-stat-content">
              <motion.div 
                className="footer-stat-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon size={28} />
                <div 
                  className="footer-stat-glow"
                  style={{ background: stat.color }}
                />
              </motion.div>
              
              <div className="footer-stat-values">
                <motion.h4 
                  className="footer-stat-number"
                  whileHover={{ color: stat.color }}
                >
                  {stat.value}
                </motion.h4>
                <p className="footer-stat-label">{stat.label}</p>
              </div>
              
              <div className="footer-stat-details">
                <motion.span 
                  className="footer-stat-change"
                  whileHover={{ backgroundColor: stat.color + "40" }}
                >
                  <FiTrendingUp size={14} />
                  <span>{stat.change}</span>
                </motion.span>
                <p className="footer-stat-desc">{stat.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ============================================================================
// COMPONENTE DE SOLUÇÕES
// ============================================================================

const SolutionsSection = () => {
  const solutions = useMemo(() => [
    {
      title: "Roteirização IA",
      desc: "Otimização inteligente de rotas",
      icon: FiNavigation,
      color: "#f97316",
      features: ["IA Generativa", "Tempo Real", "Economia 30%"]
    },
    {
      title: "Gestão de Frota",
      desc: "Controle total da operação",
      icon: FiTruck,
      color: "#3b82f6",
      features: ["GPS Ativo", "Manutenção", "Combustível"]
    },
    {
      title: "Analytics",
      desc: "Insights em tempo real",
      icon: FiBarChart2,
      color: "#10b981",
      features: ["KPI Dashboard", "Previsões", "BI Integrado"]
    },
    {
      title: "Integrações",
      desc: "Ecosystema completo",
      icon: FiGlobe,
      color: "#8b5cf6",
      features: ["ERP/CRM", "Marketplaces", "APIs"]
    }
  ], []);

  return (
    <motion.section 
      className="footer-solutions-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="footer-solutions-header">
        <div className="footer-header-content">
          <motion.h2 
            className="footer-solutions-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Soluções <span className="footer-title-gradient">Completas</span>
          </motion.h2>
          <motion.p 
            className="footer-solutions-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Plataforma modular para logística 4.0
          </motion.p>
        </div>
        
        <motion.a 
          href="/solucoes"
          className="footer-solutions-cta"
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Ver todas as soluções</span>
          <FiArrowRight />
        </motion.a>
      </div>
      
      <div className="footer-solutions-grid">
        {solutions.map((solution, idx) => (
          <motion.div
            key={solution.title}
            className="footer-solution-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -15,
              scale: 1.02,
              boxShadow: `0 25px 50px ${solution.color}20`
            }}
            transition={{ 
              duration: 0.6,
              delay: idx * 0.1,
              type: "spring"
            }}
            viewport={{ once: true }}
          >
            <div className="footer-solution-header">
              <motion.div 
                className="footer-solution-icon"
                style={{ color: solution.color }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <solution.icon size={32} />
              </motion.div>
              <div>
                <h3 className="footer-solution-title">{solution.title}</h3>
                <p className="footer-solution-desc">{solution.desc}</p>
              </div>
            </div>
            
            <div className="footer-solution-features">
              {solution.features.map((feature, fIdx) => (
                <motion.span
                  key={feature}
                  className="footer-feature-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 + fIdx * 0.1 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
            
            <motion.div className="footer-solution-action">
              <motion.a
                href={`/solucoes/${solution.title.toLowerCase().replace(' ', '-')}`}
                className="footer-solution-link"
                style={{ '--link-color': solution.color }}
                whileHover={{ x: 5, color: solution.color }}
              >
                <span>Explorar solução</span>
                <FiArrowRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ============================================================================
// COMPONENTE DE CONTATO
// ============================================================================

const ContactSection = () => {
  const contacts = useMemo(() => [
    {
      type: "phone",
      icon: FiPhone,
      title: "Telefone",
      value: "+55 11 4002-8922",
      desc: "Seg-Sex, 8h às 18h",
      action: "tel:+551140028922",
      color: "#f97316"
    },
    {
      type: "email",
      icon: FiMail,
      title: "Email",
      value: "comercial@transita.ai",
      desc: "Resposta em 2h úteis",
      action: "mailto:comercial@transita.ai",
      color: "#3b82f6"
    },
    {
      type: "whatsapp",
      icon: FiMessageCircle,
      title: "WhatsApp",
      value: "+55 11 94002-8922",
      desc: "Atendimento rápido",
      action: "https://wa.me/5511940028922",
      color: "#10b981"
    },
    {
      type: "support",
      icon: FiHeadphones,
      title: "Suporte",
      value: "suporte@transita.ai",
      desc: "24/7 via ticket",
      action: "mailto:suporte@transita.ai",
      color: "#8b5cf6"
    }
  ], []);

  return (
    <motion.section 
      className="footer-contact-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="footer-contact-background">
        <div className="footer-contact-wave" />
        <div className="footer-contact-dots" />
      </div>
      
      <div className="footer-contact-content">
        <motion.div 
          className="footer-contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="footer-contact-title">
            Pronto para <span className="footer-contact-highlight">transformar</span> sua logística?
          </h2>
          <p className="footer-contact-subtitle">
            Fale com nossos especialistas
          </p>
        </motion.div>
        
        <div className="footer-contact-grid">
          {contacts.map((contact, idx) => (
            <motion.a
              key={contact.type}
              href={contact.action}
              className="footer-contact-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                boxShadow: `0 15px 30px ${contact.color}25`
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="footer-contact-icon-wrapper" style={{ '--icon-color': contact.color }}>
                <contact.icon size={24} />
                <div className="footer-contact-glow" style={{ background: contact.color }} />
              </div>
              
              <div className="footer-contact-info">
                <h4 className="footer-contact-name">{contact.title}</h4>
                <p className="footer-contact-value">{contact.value}</p>
                <span className="footer-contact-desc">{contact.desc}</span>
              </div>
              
              <div className="footer-contact-action">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight size={18} />
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <motion.div 
          className="footer-contact-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/demo"
            className="footer-cta-button footer-cta-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlay size={18} />
            <span>Solicitar Demonstração</span>
          </motion.a>
          
          <motion.a
            href="/contato"
            className="footer-cta-button footer-cta-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCalendar size={18} />
            <span>Agendar Consulta</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// RODAPÉ INFERIOR
// ============================================================================

const BottomFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const footerLinks = useMemo(() => [
    { name: "Início", href: "/", icon: FiChevronRight },
    { name: "Soluções", href: "/solucoes", icon: FiChevronRight },
    { name: "Preços", href: "/precos", icon: FiChevronRight },
    { name: "Clientes", href: "/clientes", icon: FiChevronRight },
    { name: "Sobre", href: "/sobre", icon: FiChevronRight },
    { name: "Contato", href: "/contato", icon: FiChevronRight }
  ], []);

  const legalLinks = useMemo(() => [
    { name: "Privacidade", href: "/privacidade" },
    { name: "Termos", href: "/termos" },
    { name: "LGPD", href: "/lgpd" },
    { name: "Cookies", href: "/cookies" },
    { name: "Segurança", href: "/seguranca" }
  ], []);

  const socialLinks = useMemo(() => [
    { icon: FiLinkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
    { icon: FiTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: FiInstagram, href: "#", label: "Instagram", color: "#E4405F" },
    { icon: FiMessageCircle, href: "#", label: "WhatsApp", color: "#25D366" }
  ], []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter submission logic
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <motion.div 
      className="footer-bottom-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="footer-bottom-container">
        <div className="footer-bottom-grid">
          {/* Coluna Empresa */}
          <div className="footer-bottom-column">
            <h3 className="footer-column-title">Empresa</h3>
            <div className="footer-company-info">
              <div className="footer-company-logo">
                TRANSITA<span className="footer-company-ai">.AI</span>
              </div>
              <p className="footer-company-desc">
                Tecnologia de ponta para logística inteligente e eficiente
              </p>
              <div className="footer-certifications">
                <div className="footer-certificate">
                  <FiShield size={16} />
                  <span>ISO 27001</span>
                </div>
                <div className="footer-certificate">
                  <FiCheck size={16} />
                  <span>LGPD Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Links */}
          <div className="footer-bottom-column">
            <h3 className="footer-column-title">Navegação</h3>
            <div className="footer-links-grid">
              {footerLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="footer-bottom-link"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5, color: "#f97316" }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <link.icon size={12} />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Coluna Newsletter */}
          <div className="footer-bottom-column">
            <h3 className="footer-column-title">Fique por dentro</h3>
            <div className="footer-newsletter">
              <p className="footer-newsletter-text">
                Insights e novidades sobre logística inteligente
              </p>
              <form onSubmit={handleSubmit} className="footer-newsletter-form">
                <div className="footer-newsletter-input-wrapper">
                  <FiMail className="footer-newsletter-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="footer-newsletter-input"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="footer-newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiArrowRight size={18} />
                </motion.button>
              </form>
              <div className="footer-legal-links">
                {legalLinks.map((link) => (
                  <a key={link.name} href={link.href} className="footer-legal-link">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>&copy; {currentYear} Transita.AI</span>
            <span>Todos os direitos reservados</span>
          </div>
          
          <div className="footer-social-links">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="footer-social-link"
                style={{ '--social-color': social.color }}
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="footer-simple">
      <div className="footer-container">
        {/* Seção Principal */}
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-title">Transita.AI</h2>
            <p className="footer-description">
              Revolucionando a logística com inteligência artificial, dados em tempo real e foco absoluto em ROI para nossos clientes.
            </p>
          </div>

          {/* Grid de Links */}
          <div className="footer-links-grid">
            {/* Coluna Plataforma */}
            <div className="footer-column">
              <h3 className="footer-column-title">Plataforma</h3>
              <ul className="footer-links">
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/multas">Gestão de Multas</a></li>
                <li><a href="/manutencao">Manutenção Preditiva</a></li>
                <li><a href="/rastreamento">Rastreamento</a></li>
              </ul>
            </div>

            {/* Coluna Empresa */}
            <div className="footer-column">
              <h3 className="footer-column-title">Empresa</h3>
              <ul className="footer-links">
                <li><a href="/sobre">Sobre nós</a></li>
                <li><a href="/carreiras">Carreiras</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/privacidade">Privacidade</a></li>
              </ul>
            </div>

            {/* Coluna Newsletter */}
            <div className="footer-column">
              <h3 className="footer-column-title">Newsletter</h3>
              <p className="footer-newsletter-text">
                Receba as últimas tendências de logística e IA.
              </p>
              <form onSubmit={handleSubmit} className="footer-newsletter-form">
                <div className="footer-input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu email"
                    className="footer-email-input"
                    required
                  />
                  <button type="submit" className="footer-submit-btn">
                    <FiArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 Transita.AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);