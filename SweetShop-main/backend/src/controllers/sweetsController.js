// REFACTOR: Consolidate error handling and response formatting
// REFACTOR: Add request validation middleware
const sweetsService = require('../services/sweetsService');

const sweetsController = {
  async createSweet(req, res) {
    try {
      const { name, category, price, quantity, image } = req.body;

      if (!name || !category || !price) {
        return res.status(400).json({ error: 'Name, category, and price are required' });
      }

      const sweet = await sweetsService.createSweet({
        name,
        category,
        price,
        quantity: quantity || 0,
        image,
      });

      res.status(201).json({ sweet });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Sweet name already exists' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async getAllSweets(req, res) {
    try {
      const sweets = await sweetsService.getAllSweets();
      res.status(200).json({ sweets });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async searchSweets(req, res) {
    try {
      const filters = {
        name: req.query.name,
        category: req.query.category,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
      };

      const sweets = await sweetsService.searchSweets(filters);
      res.status(200).json({ sweets });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateSweet(req, res) {
    try {
      const { id } = req.params;
      const { name, category, price, quantity, image } = req.body;

      const sweet = await sweetsService.updateSweet(id, {
        name,
        category,
        price,
        quantity,
        image,
      });

      res.status(200).json({ sweet });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Sweet name already exists' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async deleteSweet(req, res) {
    try {
      const { id } = req.params;

      const result = await sweetsService.deleteSweet(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async purchaseSweet(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const userId = req.user.id;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Valid quantity required' });
      }

      const sweet = await sweetsService.purchaseSweet(id, userId, quantity);
      res.status(200).json({ sweet });
    } catch (error) {
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      if (error.message === 'Insufficient quantity available') {
        return res.status(400).json({ error: 'Insufficient quantity available' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async restockSweet(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Valid quantity required' });
      }

      const sweet = await sweetsService.restockSweet(id, quantity);
      res.status(200).json({ sweet });
    } catch (error) {
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = sweetsController;
