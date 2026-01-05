import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { onAuthChange } from './firebase/auth';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import NotFound from './pages/NotFound/NotFound';
import Search from './pages/Search/Search';
import { api } from './services/api';
import GlobalLoading from './components/GlobalLoading/GlobalLoading';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './components/auth/Login';
import CompanyProfile from './pages/profiles/CompanyProfile';
import EmployeeProfile from './pages/profiles/EmployeeProfile';
import { NotificationProvider } from './contexts/NotificationContext';
import Support from './pages/Support/Support';
import Planos from './pages/Planos/Planos';
import EmployeeAuth from './components/Auth/EmployeeAuth';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const [user, setUser] = useState({ name: 'Usuário Teste', email: 'teste@email.com', role: 'COMPANY' }); // USUÁRIO FAKE
  const [loading, setLoading] = useState(false); // SEM LOADING
  const [globalLoading, setGlobalLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const { isAuthenticated, logout } = useAuth(); // DESATIVADO
  const isAuthenticated = true; // SEMPRE AUTENTICADO
  const logout = () => console.log('Logout desativado'); // LOG APENAS

  // useEffect(() => {
  //   const unsubscribe = onAuthChange((user) => {
  //     setUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []); // DESATIVADO

  useEffect(() => {
    const t = setTimeout(() => setGlobalLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // skip initial load
    if (!globalLoading) {
      setGlobalLoading(true);
      const t = setTimeout(() => setGlobalLoading(false), 800);
      return () => clearTimeout(t);
    }

  }, [location.pathname]);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <NotificationProvider>
      <div className="app">
        {globalLoading && <GlobalLoading isVisible />}
        {true && (
          <Navbar
            onLogout={handleLogout}
          />
        )}

        <div className="app-content">
          <main className={`main-content ${isAuthenticated ? 'with-navbar' : ''}`}>
            <Routes>
              {/* Rotas Públicas */}
              <Route
                path="/login"
                element={<Login initialMode={searchParams.get('mode') || 'login'} />}
              />

              <Route
                path="/employee-auth"
                element={<EmployeeAuth />}
              />

              <Route
                path="/support"
                element={<Support />}
              />
              <Route
                path="/planos"
                element={<Planos />}
              />
              {/* Rota pública: Home */}
              <Route
                path="/"
                element={
                  <Home user={user} />
                }
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/profile/company"
                element={<CompanyProfile />}
              />

              <Route
                path="/profile/employee"
                element={<EmployeeProfile />}
              />

              {/* Rota 404 - Página não encontrada */}
              <Route
                path="/search"
                element={<Search />}
              />
              <Route
                path="*"
                element={
                  <NotFound />
                }
              />
            </Routes>
          </main>
        </div>
        {true && <Footer />}
        <BackToTop />
      </div>
    </NotificationProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;