const Cart = require('../models/Cart');
const Sweet = require('../models/Sweet');

const cartService = {
  async getCart(userId) {
    let cart = await Cart.findOne({ userId }).populate('items.sweetId');
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    return cart;
  },

  async addToCart(userId, sweetId, quantity) {
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity < quantity) throw new Error('Insufficient quantity');

    // Reserve stock immediately
    sweet.quantity -= quantity;
    await sweet.save();

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.sweetId.toString() === sweetId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ sweetId, quantity, price: sweet.price });
    }

    return await cart.save();
  },

  async updateCartItem(userId, sweetId, newQuantity) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    const item = cart.items.find(item => item.sweetId.toString() === sweetId);
    if (!item) throw new Error('Item not in cart');

    newQuantity = parseInt(newQuantity);
    if (newQuantity < 0) throw new Error('Quantity cannot be negative');

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) throw new Error('Sweet not found');

    const quantityDiff = newQuantity - item.quantity;

    if (quantityDiff > 0 && sweet.quantity < quantityDiff) {
      throw new Error('Insufficient quantity');
    }

    // Update stock
    sweet.quantity -= quantityDiff;
    await sweet.save();

    if (newQuantity === 0) {
      cart.items = cart.items.filter(item => item.sweetId.toString() !== sweetId);
    } else {
      item.quantity = newQuantity;
    }

    return await cart.save();
  },

  async removeFromCart(userId, sweetId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    const item = cart.items.find(item => item.sweetId.toString() === sweetId);
    if (item) {
      // Return stock
      const sweet = await Sweet.findById(sweetId);
      sweet.quantity += item.quantity;
      await sweet.save();
    }

    cart.items = cart.items.filter(item => item.sweetId.toString() !== sweetId);
    return await cart.save();
  },

  async clearCart(userId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    // Return all stock
    for (const item of cart.items) {
      const sweet = await Sweet.findById(item.sweetId);
      sweet.quantity += item.quantity;
      await sweet.save();
    }

    cart.items = [];
    return await cart.save();
  },
};

module.exports = cartService;
