// NotFound.jsx
import React, { useState } from 'react';
import './NotFound.css';
import notFoundImage from './image.png';

const NotFound = () => {
  const [activeButton, setActiveButton] = useState(null);
  
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = () => {
    window.location.href = '/busca';
  };

  const handleContact = () => {
    window.location.href = '/contato?origem=404';
  };

  const handleReport = () => {
    window.location.href = '/relatar-problema?pagina=' + encodeURIComponent(window.location.href);
  };

  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-content">
          {/* Cabeçalho Profissional */}
          <header className="notfound-header">
            <div className="header-content">
              <div className="brand-logo">
                <div className="logo-symbol">404</div>
                <div className="logo-text">
                  <span className="logo-primary">Erro</span>
                  <span className="logo-secondary">Não Encontrado</span>
                </div>
              </div>
              
              <nav className="header-nav">
                <button 
                  className="nav-link"
                  onClick={handleGoHome}
                >
                  Início
                </button>
                <span className="nav-separator">•</span>
                <button 
                  className="nav-link"
                  onClick={() => window.location.href = '/suporte'}
                >
                  Suporte
                </button>
                <span className="nav-separator">•</span>
                <button 
                  className="nav-link"
                  onClick={() => window.location.href = '/ajuda'}
                >
                  Ajuda
                </button>
              </nav>
            </div>
          </header>

          <main className="notfound-main">
            {/* Área Principal de Erro */}
            <div className="error-display">
              <div className="error-code-section">
                <div className="error-code">
                  <span className="error-digit">4</span>
                  <span className="error-digit">0</span>
                  <span className="error-digit">4</span>
                </div>
                
                <div className="error-divider">
                  <div className="divider-line"></div>
                  <div className="divider-dot"></div>
                  <div className="divider-line"></div>
                </div>
                
                <div className="error-content">
                  <h1 className="error-title">
                    Página Não Encontrada
                  </h1>
                  <p className="error-subtitle">
                    O recurso que você está procurando não existe ou foi movido
                  </p>
                </div>
              </div>
              
              <div className="error-message">
                <p className="message-text">
                  Desculpe pelo inconveniente. A página pode ter sido removida, 
                  renomeada ou temporariamente indisponível.
                </p>
                <div className="message-actions">
                  <button 
                    className="message-action-btn"
                    onClick={handleReport}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 11H8.0075" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 8V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Relatar Problema
                  </button>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="content-wrapper">
              {/* Seção da Imagem */}
              <div className="image-section">
                <div className="image-container">
                  <div className="image-frame">
                    <img 
                      src={notFoundImage} 
                      alt="Recurso não encontrado - Ilustração de erro 404" 
                      className="notfound-image"
                    />
                    <div className="image-overlay">
                      <div className="overlay-grid">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="grid-cell"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="image-caption">
                    <div className="caption-icon">⚠️</div>
                    <div className="caption-text">
                      <strong>Recurso Indisponível</strong>
                      <span>Verifique o endereço ou tente novamente</span>
                    </div>
                  </div>
                </div>
                
                {/* Status do Sistema */}
                <div className="system-status">
                  <div className="status-header">
                    <h3 className="status-title">Status do Sistema</h3>
                    <div className="status-time">
                      {new Date().toLocaleTimeString('pt-BR')}
                    </div>
                  </div>
                  
                  <div className="status-grid">
                    <div className="status-item">
                      <div className="status-indicator active"></div>
                      <div className="status-info">
                        <div className="status-name">Serviço Principal</div>
                        <div className="status-value">Operacional</div>
                      </div>
                    </div>
                    
                    <div className="status-item">
                      <div className="status-indicator warning"></div>
                      <div className="status-info">
                        <div className="status-name">Recurso Solicitado</div>
                        <div className="status-value">Não Encontrado</div>
                      </div>
                    </div>
                    
                    <div className="status-item">
                      <div className="status-indicator active"></div>
                      <div className="status-info">
                        <div className="status-name">Rede</div>
                        <div className="status-value">Conectado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Painel de Ações */}
              <div className="actions-section">
                <div className="section-header">
                  <h2 className="section-title">
                    O que você gostaria de fazer?
                  </h2>
                  <p className="section-subtitle">
                    Selecione uma das opções abaixo para continuar
                  </p>
                </div>

                <div className="actions-grid">
                  <button 
                    className={`action-card ${activeButton === 'voltar' ? 'active' : ''}`}
                    onClick={handleGoBack}
                    onMouseEnter={() => setActiveButton('voltar')}
                    onMouseLeave={() => setActiveButton(null)}
                  >
                    <div className="card-header">
                      <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="card-badge">1</div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">Voltar à Página Anterior</h3>
                      <p className="card-description">
                        Retorne para a página onde você estava navegando
                      </p>
                    </div>
                    
                    <div className="card-footer">
                      <span className="card-hint">Atalho: Ctrl + ←</span>
                      <div className="card-arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button 
                    className={`action-card ${activeButton === 'buscar' ? 'active' : ''}`}
                    onClick={handleSearch}
                    onMouseEnter={() => setActiveButton('buscar')}
                    onMouseLeave={() => setActiveButton(null)}
                  >
                    <div className="card-header">
                      <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="card-badge">2</div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">Buscar no Site</h3>
                      <p className="card-description">
                        Encontre o conteúdo desejado usando nossa ferramenta de busca
                      </p>
                    </div>
                    
                    <div className="card-footer">
                      <span className="card-hint">Use palavras-chave</span>
                      <div className="card-arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button 
                    className={`action-card ${activeButton === 'inicio' ? 'active' : ''}`}
                    onClick={handleGoHome}
                    onMouseEnter={() => setActiveButton('inicio')}
                    onMouseLeave={() => setActiveButton(null)}
                  >
                    <div className="card-header">
                      <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="card-badge">3</div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">Ir para o Início</h3>
                      <p className="card-description">
                        Navegue até a página principal do site
                      </p>
                    </div>
                    
                    <div className="card-footer">
                      <span className="card-hint">Página inicial</span>
                      <div className="card-arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button 
                    className={`action-card ${activeButton === 'contato' ? 'active' : ''}`}
                    onClick={handleContact}
                    onMouseEnter={() => setActiveButton('contato')}
                    onMouseLeave={() => setActiveButton(null)}
                  >
                    <div className="card-header">
                      <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="card-badge">4</div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">Falar com Suporte</h3>
                      <p className="card-description">
                        Entre em contato com nossa equipe para assistência
                      </p>
                    </div>
                    
                    <div className="card-footer">
                      <span className="card-hint">Resposta em 24h</span>
                      <div className="card-arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Informações Técnicas */}
            <div className="technical-section">
              <div className="technical-header">
                <h3 className="technical-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 13H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 10V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Informações Técnicas
                </h3>
                <button 
                  className="technical-copy"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  Copiar URL
                </button>
              </div>
              
              <div className="technical-grid">
                <div className="technical-item">
                  <div className="technical-label">Código do Erro</div>
                  <div className="technical-value">404 Not Found</div>
                </div>
                
                <div className="technical-item">
                  <div className="technical-label">URL Solicitada</div>
                  <div className="technical-value url">
                    {window.location.pathname}
                  </div>
                </div>
                
                <div className="technical-item">
                  <div className="technical-label">Horário do Erro</div>
                  <div className="technical-value">
                    {new Date().toLocaleString('pt-BR')}
                  </div>
                </div>
                
                <div className="technical-item">
                  <div className="technical-label">ID da Sessão</div>
                  <div className="technical-value code">
                    {Math.random().toString(36).substr(2, 12).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Rodapé */}
          <footer className="notfound-footer">
            <div className="footer-content">
              <div className="footer-main">
                <div className="footer-brand">
                  <div className="footer-logo">404</div>
                  <div className="footer-text">
                    <div className="footer-title">Central de Erros</div>
                    <div className="footer-subtitle">Sistema de navegação assistida</div>
                  </div>
                </div>
                
                <div className="footer-links">
                  <div className="link-group">
                    <div className="link-title">Navegação</div>
                    <a href="/mapa-site" className="footer-link">Mapa do Site</a>
                    <a href="/acessibilidade" className="footer-link">Acessibilidade</a>
                    <a href="/faq" className="footer-link">Perguntas Frequentes</a>
                  </div>
                  
                  <div className="link-group">
                    <div className="link-title">Suporte</div>
                    <a href="/contato" className="footer-link">Contato</a>
                    <a href="/suporte" className="footer-link">Suporte Técnico</a>
                    <a href="/status" className="footer-link">Status do Sistema</a>
                  </div>
                  
                  <div className="link-group">
                    <div className="link-title">Legal</div>
                    <a href="/privacidade" className="footer-link">Política de Privacidade</a>
                    <a href="/termos" className="footer-link">Termos de Uso</a>
                    <a href="/cookies" className="footer-link">Política de Cookies</a>
                  </div>
                </div>
              </div>
              
              <div className="footer-bottom">
                <div className="footer-copyright">
                  © {new Date().getFullYear()} Todos os direitos reservados.
                </div>
                <div className="footer-version">
                  Versão 1.0.0 • Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default NotFound;