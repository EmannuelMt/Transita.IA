import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { searchIndex } from '../../services/searchIndex';
import './Search.css';

// Hook personalizado para buscar parâmetros da URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pega o parâmetro 'q' da URL e sanitiza
  const q = (query.get('q') || '').trim().toLowerCase();
  
  // Verifica se o parâmetro 'q' existe na URL
  const hasQueryParam = query.has('q');
  
  // Redireciona para NotFound se tentarem acessar /search sem parâmetro 'q'
  useEffect(() => {
    if (!hasQueryParam) {
      navigate('/not-found', { replace: true });
      return;
    }
  }, [hasQueryParam, navigate]);
  
  // Se não há parâmetro 'q', não renderiza nada (será redirecionado pelo useEffect)
  if (!hasQueryParam) {
    return null;
  }

  // Filtra os resultados da busca
  const results = q
    ? searchIndex.filter(item => {
        if (!item || !item.title || !item.keywords || !item.excerpt) {
          return false;
        }
        
        // Cria uma string concatenada para busca
        const searchableText = (
          item.title + ' ' + 
          (Array.isArray(item.keywords) ? item.keywords.join(' ') : '') + ' ' + 
          item.excerpt
        ).toLowerCase();
        
        return searchableText.includes(q);
      })
    : [];

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h2>
            Resultados para: 
            <span className="search-query">
              {q || '—'}
            </span>
          </h2>
          <p className="search-sub">
            {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="search-results">
          {/* Mensagem para busca vazia */}
          {!q && (
            <div className="search-empty-state">
              <p className="search-empty">
                Digite algo na barra de pesquisa para buscar no site.
              </p>
              <Link to="/" className="search-home-link">
                Voltar para Home
              </Link>
            </div>
          )}

          {/* Lista de resultados */}
          {results.map((r) => (
            <div key={r.path} className="search-card">
              <h3>
                <Link to={r.path} className="search-card-title">
                  {r.title}
                </Link>
              </h3>
              <p className="search-excerpt">
                {r.excerpt}
              </p>
              <div className="search-keywords">
                {Array.isArray(r.keywords) && r.keywords.map((keyword, index) => (
                  <span key={index} className="search-keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link to={r.path} className="search-link">
                Ver mais &rarr;
              </Link>
            </div>
          ))}

          {/* Mensagem para nenhum resultado encontrado */}
          {q && results.length === 0 && (
            <div className="search-no-results">
              <p className="search-empty">
                Nenhum resultado encontrado para "{q}".
              </p>
              <p className="search-suggestions">
                Sugestões:
              </p>
              <ul className="search-suggestions-list">
                <li>Verifique a ortografia</li>
                <li>Tente termos mais gerais</li>
                <li>Use palavras-chave diferentes</li>
              </ul>
              <Link to="/" className="search-home-link">
                Voltar para Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;