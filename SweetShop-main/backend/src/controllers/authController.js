// REFACTOR: Add input validation (email format, password strength)
// REFACTOR: Consider centralizing error handling
const authService = require('../services/authService');

const authController = {
  async register(req, res) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const user = await authService.register(email, password, role);

      res.status(201).json({ user });
    } catch (error) {
      console.error('Register error:', error.message);
      if (error.message === 'User already exists') {
        return res.status(400).json({ error: 'Email already registered' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const result = await authService.loginUser(email, password);

      res.status(200).json(result);
    } catch (error) {
      console.error('Login user error:', error.message);
      if (error.message === 'User not found' || error.message === 'Invalid password' || error.message === 'Access denied') {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const result = await authService.loginAdmin(email, password);

      res.status(200).json(result);
    } catch (error) {
      console.error('Login admin error:', error.message);
      if (error.message === 'User not found' || error.message === 'Invalid password' || error.message === 'Access denied') {
        return res.status(401).json({ error: 'Invalid admin credentials' });
      }
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
