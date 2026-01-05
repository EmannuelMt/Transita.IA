const express = require('express');
const authService = require('./authService');
const { users, companies, employees } = require('../userService');

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Rota de registro de empresa
router.post('/register/company', async (req, res) => {
  try {
    const { name, email, password, cnpj, phone, address } = req.body;

    if (!name || !email || !password || !cnpj) {
      return res.status(400).json({ error: 'Nome, email, senha e CNPJ são obrigatórios' });
    }

    const result = await authService.registerCompany({
      name,
      email,
      password,
      cnpj,
      phone,
      address
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota de registro de funcionário
router.post('/register/employee', authService.authenticateToken, authService.authorizeRoles('COMPANY'), async (req, res) => {
  try {
    const { name, email, password, phone, position, department } = req.body;
    const companyId = req.user.companyId;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    const result = await authService.registerEmployee({
      name,
      email,
      password,
      phone,
      position,
      department
    }, companyId);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para obter perfil do usuário
router.get('/profile', authService.authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    let profile = { ...user };
    delete profile.password;

    if (user.role === 'COMPANY') {
      const company = companies.find(c => c.id === user.companyId);
      if (company) {
        profile.company = company;
      }
    } else if (user.role === 'EMPLOYEE') {
      const employee = employees.find(e => e.id === user.employeeId);
      if (employee) {
        profile.employee = employee;
      }
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar perfil
router.put('/profile', authService.authenticateToken, async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { name, phone, position, department, address } = req.body;

    if (user.role === 'COMPANY') {
      const company = companies.find(c => c.id === user.companyId);
      if (company) {
        if (name) company.name = name;
        if (phone) company.phone = phone;
        if (address) company.address = address;
        company.updatedAt = new Date().toISOString();
      }
    } else if (user.role === 'EMPLOYEE') {
      const employee = employees.find(e => e.id === user.employeeId);
      if (employee) {
        if (name) employee.name = name;
        if (phone) employee.phone = phone;
        if (position) employee.position = position;
        if (department) employee.department = department;
        employee.updatedAt = new Date().toISOString();
      }
    }

    user.updatedAt = new Date().toISOString();

    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para alterar senha
router.put('/change-password', authService.authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
    }

    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar senha atual
    const isValidPassword = await authService.verifyPassword(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Senha atual incorreta' });
    }

    // Hash da nova senha
    user.password = await authService.hashPassword(newPassword);
    user.updatedAt = new Date().toISOString();

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter funcionários da empresa (apenas para COMPANY)
router.get('/employees', authService.authenticateToken, authService.authorizeRoles('COMPANY'), (req, res) => {
  try {
    const companyId = req.user.companyId;
    const companyEmployees = employees.filter(e => e.companyId === companyId);

    res.json(companyEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;