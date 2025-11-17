const express = require('express');
const sweetsController = require('../controllers/sweetsController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/sweets/search - Search sweets (must come before /:id route)
router.get('/search', sweetsController.searchSweets);

// POST /api/sweets - Create sweet (admin only)
router.post('/', authMiddleware, adminMiddleware, sweetsController.createSweet);

// GET /api/sweets - Get all sweets
router.get('/', sweetsController.getAllSweets);

// PUT /api/sweets/:id - Update sweet (admin only)
router.put('/:id', authMiddleware, adminMiddleware, sweetsController.updateSweet);

// DELETE /api/sweets/:id - Delete sweet (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, sweetsController.deleteSweet);

// POST /api/sweets/:id/purchase - Purchase sweet
router.post('/:id/purchase', authMiddleware, sweetsController.purchaseSweet);

// POST /api/sweets/:id/restock - Restock sweet (admin only)
router.post('/:id/restock', authMiddleware, adminMiddleware, sweetsController.restockSweet);

module.exports = router;
