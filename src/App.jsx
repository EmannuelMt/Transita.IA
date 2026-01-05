import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { onAuthChange } from './firebase/auth';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Search from './pages/Search/Search.jsx';
import GlobalLoading from './components/GlobalLoading/GlobalLoading.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import CompanyProfile from './pages/profiles/CompanyProfile.jsx';
import EmployeeProfile from './pages/profiles/EmployeeProfile.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import Support from './pages/Support/Support.jsx';
import Planos from './pages/Planos/Planos.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import EmployeeAuth from './components/auth/EmployeeAuth.jsx';
import Login from './components/auth/Login.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

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