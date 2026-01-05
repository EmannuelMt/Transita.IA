import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompanyProfile from './pages/profiles/CompanyProfile';
import EmployeeProfile from './pages/profiles/EmployeeProfile';
import { NotificationProvider } from './contexts/NotificationContext';
import Support from './pages/Support/Support';
import Planos from './pages/Planos/Planos';
// import { AuthProvider, useAuth } from './contexts/AuthContext'; // DESATIVADO

function AppContent() {
  const [user, setUser] = useState({ name: 'Usuário Teste', email: 'teste@email.com', role: 'COMPANY' }); // USUÁRIO FAKE
  const [loading, setLoading] = useState(false); // SEM LOADING
  const [globalLoading, setGlobalLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
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
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
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
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;