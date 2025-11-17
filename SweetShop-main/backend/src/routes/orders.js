const express = require('express');
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/admin/all', authMiddleware, orderController.getAllOrders);
router.get('/', authMiddleware, orderController.getOrders);
router.put('/:id/cancel', authMiddleware, orderController.cancelOrder);
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);
router.get('/:id', authMiddleware, orderController.getOrderById);

module.exports = router;
