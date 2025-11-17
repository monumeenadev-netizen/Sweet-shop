const cartService = require('../services/cartService');

const cartController = {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCart(req.user.id);
      res.json({ cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addToCart(req, res) {
    try {
      const { sweetId, quantity } = req.body;
      const cart = await cartService.addToCart(req.user.id, sweetId, quantity);
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateCartItem(req, res) {
    try {
      const { sweetId, quantity } = req.body;
      const cart = await cartService.updateCartItem(req.user.id, sweetId, quantity);
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async removeFromCart(req, res) {
    try {
      const { sweetId } = req.body;
      const cart = await cartService.removeFromCart(req.user.id, sweetId);
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async clearCart(req, res) {
    try {
      const cart = await cartService.clearCart(req.user.id);
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = cartController;
