const Discount = require('../models/Discount');
const Banner = require('../models/Banner');
const Order = require('../models/Order');
const Sweet = require('../models/Sweet');
const User = require('../models/User');

const adminService = {
  // Discount Management
  async createDiscount(discountData) {
    return await Discount.create(discountData);
  },

  async getAllDiscounts() {
    return await Discount.find().sort({ createdAt: -1 });
  },

  async updateDiscount(id, data) {
    return await Discount.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteDiscount(id) {
    return await Discount.findByIdAndDelete(id);
  },

  async validateDiscount(code, orderAmount) {
    const discount = await Discount.findOne({ 
      code: code.toUpperCase(), 
      isActive: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    });

    if (!discount) throw new Error('Invalid discount code');
    if (orderAmount < discount.minOrderAmount) {
      throw new Error(`Minimum order amount is ₹${discount.minOrderAmount}`);
    }
    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      throw new Error('Discount code usage limit exceeded');
    }

    let discountAmount = 0;
    if (discount.type === 'percentage') {
      discountAmount = (orderAmount * discount.value) / 100;
      if (discount.maxDiscount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscount);
      }
    } else {
      discountAmount = discount.value;
    }

    return { discount, discountAmount };
  },

  // Banner Management
  async createBanner(bannerData) {
    return await Banner.create(bannerData);
  },

  async getAllBanners() {
    return await Banner.find().sort({ createdAt: -1 });
  },

  async getActiveBanners() {
    return await Banner.find({ isActive: true }).sort({ createdAt: -1 });
  },

  async updateBanner(id, data) {
    return await Banner.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteBanner(id) {
    return await Banner.findByIdAndDelete(id);
  },

  // Analytics
  async getDashboardStats() {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalSweets = await Sweet.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const lowStockSweets = await Sweet.countDocuments({ quantity: { $lt: 5 } });

    const recentOrders = await Order.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalSweets,
      totalUsers,
      lowStockSweets,
      recentOrders,
    };
  },

  // User Management
  async getAllUsers() {
    return await User.find().select('-passwordHash').sort({ createdAt: -1 });
  },

  async updateUserRole(userId, role) {
    return await User.findByIdAndUpdate(userId, { role }, { new: true });
  },

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  },
};

module.exports = adminService;