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
import UserProfile from './pages/profiles/UserProfile.jsx';
import CompanyProfile from './pages/profiles/CompanyProfile.jsx';
import EmployeeProfile from './pages/profiles/EmployeeProfile.jsx';
import RegisterDriver from './pages/RegisterDriver/RegisterDriver.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import Support from './pages/Support/Support.jsx';
import Planos from './pages/Planos/Planos.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Multas from './pages/Multas/Multas.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import Login from './components/Auth/Login.jsx';
import Privacy from './pages/Privacy/Privacy.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import DevelopmentPopup from './components/DevelopmentPopup/DevelopmentPopup.jsx';
function AppContent() {
  const [user, setUser] = useState({ name: 'Usuário Teste', email: 'teste@email.com', role: 'COMPANY' }); // USUÁRIO FAKE
  const [loading, setLoading] = useState(false); // SEM LOADING
  const [globalLoading, setGlobalLoading] = useState(true);
  const [showDevPopup, setShowDevPopup] = useState(false);
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
    // Mostrar popup de desenvolvimento se não foi mostrado ainda
    const hasSeenDevPopup = localStorage.getItem('hasSeenDevPopup');
    if (!hasSeenDevPopup) {
      setShowDevPopup(true);
    }
  }, []);

  const handleGlobalLoadingComplete = () => {
    setGlobalLoading(false);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleDevPopupClose = () => {
    setShowDevPopup(false);
    localStorage.setItem('hasSeenDevPopup', 'true');
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <NotificationProvider>
      <div className="app">
        {globalLoading && <GlobalLoading onComplete={handleGlobalLoadingComplete} />}
        <DevelopmentPopup isVisible={showDevPopup} onClose={handleDevPopupClose} />
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
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login initialMode={searchParams.get('mode') || 'login'} onLogin={handleLogin} />}
              />
              
              <Route
                path="/support"
                element={<Support />}
              />
              <Route
                path="/planos"
                element={<Planos />}
              />

                <Route
                path="/search"
                element={<Search />}
              />
              <Route
                path="/privacy"
                element={<Privacy />}
              />
              
          
              {/* Rotas Protegidas */}
              <Route
                path="/profile"
                element={<ProtectedRoute><UserProfile /></ProtectedRoute>}
              />

              <Route
                path="/profile/company"
                element={<ProtectedRoute><CompanyPorofile /></ProtectedRoute>}
              />

              <Route
                path="/profile/employee"
                element={<ProtectedRoute><EmployeeProfile /></ProtectedRoute>}
              />

              <Route
                path="/dashboard"
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
              />

              <Route
                path="/settings"
                element={<ProtectedRoute><Settings /></ProtectedRoute>}
              />

              <Route
                path="/multas"
                element={<ProtectedRoute><Multas /></ProtectedRoute>}
              />

              <Route
                path="/register-driver"
                element={<ProtectedRoute><RegisterDriver /></ProtectedRoute>}
              />
              {/* Rota 404 - Página não encontrada */}
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