const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users, companies, employees } = require('../userService');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthService {
  // Gerar hash da senha
  async hashPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  // Verificar senha
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Gerar token JWT
  generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Verificar token JWT
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Login
  async login(email, password) {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  // Registrar empresa
  async registerCompany(companyData) {
    const { name, email, password, cnpj, phone, address } = companyData;

    // Verificar se email já existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Verificar se CNPJ já existe
    const existingCompany = companies.find(c => c.cnpj === cnpj);
    if (existingCompany) {
      throw new Error('CNPJ já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await this.hashPassword(password);

    // Criar empresa
    const companyId = `comp_${Date.now()}`;
    const company = {
      id: companyId,
      name,
      email,
      cnpj,
      phone,
      address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Criar usuário
    const userId = `user_${Date.now()}`;
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      role: 'COMPANY',
      companyId,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Salvar no "banco"
    companies.push(company);
    users.push(user);

    const token = this.generateToken(user);
    return { user, company, token };
  }

  // Registrar funcionário
  async registerEmployee(employeeData, companyId) {
    const { name, email, password, phone, position, department } = employeeData;

    // Verificar se email já existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Verificar se empresa existe
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    // Hash da senha
    const hashedPassword = await this.hashPassword(password);

    // Criar funcionário
    const employeeId = `emp_${Date.now()}`;
    const employee = {
      id: employeeId,
      name,
      email,
      phone,
      position,
      department,
      companyId,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Criar usuário
    const userId = `user_${Date.now()}`;
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      role: 'EMPLOYEE',
      companyId,
      employeeId,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Salvar no "banco"
    employees.push(employee);
    users.push(user);

    const token = this.generateToken(user);
    return { user, employee, token };
  }

  // Middleware para verificar autenticação
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      const decoded = this.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Token inválido' });
    }
  }

  // Middleware para verificar permissões por role
  authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      next();
    };
  }
}

module.exports = new AuthService();