const express = require('express');
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All routes require admin access
router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get('/stats', adminController.getDashboardStats);

// Discount Management
router.post('/discounts/validate', adminController.validateDiscount);
router.post('/discounts', adminController.createDiscount);
router.get('/discounts', adminController.getAllDiscounts);
router.put('/discounts/:id', adminController.updateDiscount);
router.delete('/discounts/:id', adminController.deleteDiscount);

// Banner Management
router.post('/banners', adminController.createBanner);
router.get('/banners', adminController.getAllBanners);
router.put('/banners/:id', adminController.updateBanner);
router.delete('/banners/:id', adminController.deleteBanner);

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;