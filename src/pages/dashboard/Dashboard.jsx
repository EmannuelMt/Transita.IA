import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiHome, FiTrendingUp, FiUsers } from 'react-icons/fi';

const Dashboard = () => {
  const { user, isCompany, isEmployee, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleProfileClick = () => {
    if (isCompany) {
      navigate('/profile/company');
    } else if (isEmployee) {
      navigate('/profile/employee');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${isCompany ? 'bg-blue-100' : 'bg-green-100'}`}>
                {isCompany ? (
                  <FiHome className={`h-8 w-8 ${isCompany ? 'text-blue-600' : 'text-green-600'}`} />
                ) : (
                  <FiUser className={`h-8 w-8 ${isCompany ? 'text-blue-600' : 'text-green-600'}`} />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bem-vindo, {isCompany ? user.company?.name : user.employee?.name}!
                </h1>
                <p className="text-gray-600">
                  {isCompany ? 'Painel da Empresa' : 'Painel do Funcionário'}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FiUser className="h-4 w-4" />
                <span>Ver Perfil</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span>Sair</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiTrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Multas Registradas</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FiUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {isCompany ? '0' : '1'}
                </p>
                <p className="text-gray-600">
                  {isCompany ? 'Funcionários' : 'Colaborador'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FiBuilding className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-gray-600">Veículos Cadastrados</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Atividades Recentes</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiUser className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sistema inicializado</p>
                  <p className="text-sm text-gray-600">Bem-vindo ao Transita.IA!</p>
                </div>
                <span className="text-sm text-gray-500">Agora</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            <div className="space-y-3">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
              >
                <FiUser className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Gerenciar Perfil</p>
                  <p className="text-sm text-gray-600">Atualizar informações pessoais</p>
                </div>
              </button>

              {isCompany && (
                <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <FiUsers className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Gerenciar Funcionários</p>
                    <p className="text-sm text-gray-600">Adicionar ou editar colaboradores</p>
                  </div>
                </button>
              )}

              <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <FiBuilding className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Gerenciar Veículos</p>
                  <p className="text-sm text-gray-600">Cadastrar e monitorar frota</p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;