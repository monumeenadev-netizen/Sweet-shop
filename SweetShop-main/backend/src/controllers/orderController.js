const orderService = require('../services/orderService');

const orderController = {
  async createOrder(req, res) {
    try {
      const { deliveryAddress, notes } = req.body;
      if (!deliveryAddress) {
        return res.status(400).json({ error: 'Delivery address required' });
      }

      const order = await orderService.createOrder(req.user.id, deliveryAddress, notes);
      res.status(201).json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOrders(req, res) {
    try {
      const orders = await orderService.getOrders(req.user.id);
      res.json({ orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json({ order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json({ orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status);
      res.json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async cancelOrder(req, res) {
    try {
      const order = await orderService.cancelOrder(req.params.id, req.user.id);
      res.json({ message: 'Order cancelled successfully', order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = orderController;
