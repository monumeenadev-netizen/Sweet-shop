const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Public routes (no auth required)
router.get('/banners', adminController.getActiveBanners);

module.exports = router;