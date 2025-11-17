const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Sweet = require('../models/Sweet');

const orderService = {
  async createOrder(userId, deliveryAddress, notes) {
    const cart = await Cart.findOne({ userId }).populate('items.sweetId');
    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const sweet = await Sweet.findById(item.sweetId);
      if (sweet.quantity < item.quantity) {
        throw new Error(`Insufficient quantity for ${sweet.name}`);
      }

      totalAmount += item.price * item.quantity;
      orderItems.push({
        sweetId: item.sweetId,
        name: sweet.name,
        quantity: item.quantity,
        price: item.price,
      });

      sweet.quantity -= item.quantity;
      await sweet.save();
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      notes,
      status: 'pending',
    });

    await Cart.updateOne({ userId }, { items: [] });

    return order;
  },

  async getOrders(userId) {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  },

  async getOrderById(orderId) {
    return await Order.findById(orderId);
  },

  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    // If cancelling order, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        await Sweet.findByIdAndUpdate(
          item.sweetId,
          { $inc: { quantity: item.quantity } }
        );
      }
    }

    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  },

  async cancelOrder(orderId, userId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.userId.toString() !== userId) throw new Error('Unauthorized');
    if (order.status === 'cancelled') throw new Error('Order already cancelled');
    if (order.status === 'delivered') throw new Error('Cannot cancel delivered order');

    // Restore stock for each item
    for (const item of order.items) {
      await Sweet.findByIdAndUpdate(
        item.sweetId,
        { $inc: { quantity: item.quantity } }
      );
    }

    order.status = 'cancelled';
    await order.save();
    return order;
  },

  async getAllOrders() {
    return await Order.find().sort({ createdAt: -1 }).populate('userId', 'email');
  },
};

module.exports = orderService;
