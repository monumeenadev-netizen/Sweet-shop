const adminService = require('../services/adminService');

const adminController = {
  // Dashboard Stats
  async getDashboardStats(req, res) {
    try {
      const stats = await adminService.getDashboardStats();
      res.json({ stats });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Discount Management
  async createDiscount(req, res) {
    try {
      const discount = await adminService.createDiscount(req.body);
      res.status(201).json({ discount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllDiscounts(req, res) {
    try {
      const discounts = await adminService.getAllDiscounts();
      res.json({ discounts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateDiscount(req, res) {
    try {
      const discount = await adminService.updateDiscount(req.params.id, req.body);
      res.json({ discount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteDiscount(req, res) {
    try {
      await adminService.deleteDiscount(req.params.id);
      res.json({ message: 'Discount deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async validateDiscount(req, res) {
    try {
      const { code, orderAmount } = req.body;
      const result = await adminService.validateDiscount(code, orderAmount);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Banner Management
  async createBanner(req, res) {
    try {
      const banner = await adminService.createBanner(req.body);
      res.status(201).json({ banner });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllBanners(req, res) {
    try {
      const banners = await adminService.getAllBanners();
      res.json({ banners });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getActiveBanners(req, res) {
    try {
      const banners = await adminService.getActiveBanners();
      res.json({ banners });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateBanner(req, res) {
    try {
      const banner = await adminService.updateBanner(req.params.id, req.body);
      res.json({ banner });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteBanner(req, res) {
    try {
      await adminService.deleteBanner(req.params.id);
      res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // User Management
  async getAllUsers(req, res) {
    try {
      const users = await adminService.getAllUsers();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUserRole(req, res) {
    try {
      const { role } = req.body;
      const user = await adminService.updateUserRole(req.params.id, role);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await adminService.deleteUser(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = adminController;