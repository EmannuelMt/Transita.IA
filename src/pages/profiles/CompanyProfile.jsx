import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX, FiUsers, FiSettings } from 'react-icons/fi';
// import { useAuth } from '../../contexts/AuthContext'; // DESATIVADO
// const { user, updateProfile, getEmployees } = useAuth(); // DESATIVADO

// VALORES FIXOS PARA DESATIVAR AUTENTICAÇÃO
const user = { name: 'Empresa Teste', email: 'empresa@teste.com', role: 'COMPANY' };
const updateProfile = async () => console.log('Update desativado');
const getEmployees = async () => ({ success: true, employees: [] });

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user?.company) {
      setFormData({
        name: user.company.name || '',
        phone: user.company.phone || '',
        address: user.company.address || ''
      });
    }

    // Buscar funcionários da empresa
    const fetchEmployees = async () => {
      const result = await getEmployees();
      if (result.success) {
        setEmployees(result.employees);
      }
    };

    fetchEmployees();
  }, [user, getEmployees]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateProfile(formData);

    if (result.success) {
      setIsEditing(false);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    if (user?.company) {
      setFormData({
        name: user.company.name || '',
        phone: user.company.phone || '',
        address: user.company.address || ''
      });
    }
    setIsEditing(false);
  };

  if (!user?.company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiHome className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.company.name}</h1>
                <p className="text-gray-600">Perfil da Empresa</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiEdit2 className="h-4 w-4" />
              <span>{isEditing ? 'Editar' : 'Editar Perfil'}</span>
            </button>
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiBuilding className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">CNPJ</p>
                  <p className="font-medium">{user.company.cnpj}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FiMail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <FiSave className="h-4 w-4" />
                          <span>Salvar</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FiX className="h-4 w-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Telefone</p>
                      <p className="font-medium">{user.company.phone || 'Não informado'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Endereço</p>
                      <p className="font-medium">{user.company.address || 'Não informado'}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Employees Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FiUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Funcionários</h2>
                <p className="text-gray-600">{employees.length} funcionários cadastrados</p>
              </div>
            </div>
          </div>

          {employees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FiUser className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiMail className="h-3 w-3" />
                      <span>{employee.email}</span>
                    </div>
                    {employee.phone && (
                      <div className="flex items-center space-x-2">
                        <FiPhone className="h-3 w-3" />
                        <span>{employee.phone}</span>
                      </div>
                    )}
                    {employee.department && (
                      <div className="flex items-center space-x-2">
                        <FiBuilding className="h-3 w-3" />
                        <span>{employee.department}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum funcionário cadastrado ainda.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyProfile;