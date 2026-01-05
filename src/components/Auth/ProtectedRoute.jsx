import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
// import { api } from '../../services/api'; // DESATIVADO

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [userStatus, setUserStatus] = useState(null); // DESATIVADO
  // const [error, setError] = useState(null); // DESATIVADO
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // await checkUserStatus(currentUser); // DESATIVADO
      } else {
        setUser(null);
        // setUserStatus(null); // DESATIVADO
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // const checkUserStatus = async (currentUser) => { // DESATIVADO
  //   try {
  //     const token = await currentUser.getIdToken(true);
  //     localStorage.setItem('token', token);

  //     const response = await api.get('/users/status', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       timeout: 10000
  //     });

  //     if (response.data) {
  //       setUserStatus(response.data);
  //     } else {
  //       setUserStatus({ needs_onboarding: true });
  //     }

  //   } catch (error) {
  //     console.error('Erro ao verificar status do usuário:', error);
  //     setUserStatus({ needs_onboarding: true });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        background: 'linear-gradient(135deg, #000000, #1a1a1a)',
        color: '#ffffff'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #FFA000',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <div>Verificando acesso seguro...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Verificação de onboarding desativada
  // if (userStatus?.needs_onboarding && location.pathname !== '/onboarding') {
  //   return <Navigate to="/onboarding" replace />;
  // }

  return children;
};

export default ProtectedRoute;