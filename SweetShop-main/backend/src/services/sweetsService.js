// REFACTOR: Consider abstracting Mongoose queries into separate functions
// REFACTOR: Add validation for input parameters
// REFACTOR: Consider using transactions for purchase and restock operations
const Sweet = require('../models/Sweet');
const PurchaseLog = require('../models/PurchaseLog');

const sweetsService = {
  async createSweet(data) {
    const sweet = await Sweet.create({
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity) || 0,
      image: data.image || '',
    });

    return sweet;
  },

  async getAllSweets() {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    return sweets;
  },

  async searchSweets(filters) {
    const where = {};

    if (filters.name) {
      where.name = { $regex: filters.name, $options: 'i' };
    }

    if (filters.category) {
      where.category = { $regex: filters.category, $options: 'i' };
    }

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.$gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) where.price.$lte = parseFloat(filters.maxPrice);
    }

    const sweets = await Sweet.find(where).sort({ createdAt: -1 });
    return sweets;
  },

  async updateSweet(id, data) {
    const updateData = {};

    if (data.name) updateData.name = data.name;
    if (data.category) updateData.category = data.category;
    if (data.price) updateData.price = parseFloat(data.price);
    if (data.quantity !== undefined) updateData.quantity = parseInt(data.quantity);
    if (data.image !== undefined) updateData.image = data.image;

    const sweet = await Sweet.findByIdAndUpdate(id, updateData, { new: true });
    return sweet;
  },

  async deleteSweet(id) {
    await Sweet.findByIdAndDelete(id);
    return { message: 'Sweet deleted successfully' };
  },

  async purchaseSweet(sweetId, userId, quantity) {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity available');
    }

    // Purchase sweet
    const updatedSweet = await Sweet.findByIdAndUpdate(
      sweetId,
      { quantity: sweet.quantity - quantity },
      { new: true }
    );

    // Log purchase
    await PurchaseLog.create({
      sweetId,
      userId,
      quantity,
      type: 'purchase',
    });

    return updatedSweet;
  },

  async restockSweet(sweetId, quantity) {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      sweetId,
      { quantity: sweet.quantity + quantity },
      { new: true }
    );

    // Log restock (without userId since it's admin-initiated)
    await PurchaseLog.create({
      sweetId,
      quantity,
      type: 'restock',
    });

    return updatedSweet;
  },
};

module.exports = sweetsService;
