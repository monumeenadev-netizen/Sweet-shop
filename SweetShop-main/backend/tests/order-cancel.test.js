const { describe, it, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');
const Order = require('../src/models/Order');
const Cart = require('../src/models/Cart');
const { connectDB, disconnectDB } = require('../src/config/database');

describe('Order Cancellation Stock Restoration - TDD', () => {
  let userToken;
  let adminToken;
  let sweetId;
  let orderId;

  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    // Clean up database
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Sweet.deleteMany({});
    await User.deleteMany({});

    // Create test user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@test.com',
        password: 'password123',
      });
    userToken = userResponse.body.token;

    // Create admin user
    const bcrypt = require('bcrypt');
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@test.com',
      passwordHash,
      role: 'admin',
    });
    const adminLoginResponse = await request(app)
      .post('/api/auth/login/admin')
      .send({
        email: 'admin@test.com',
        password: 'admin123',
      });
    adminToken = adminLoginResponse.body.token;

    // Create test sweet
    const sweet = await Sweet.create({
      name: 'Test Sweet',
      category: 'Test',
      price: 100,
      quantity: 10,
    });
    console.log("sweet", sweet)
    sweetId = sweet._id;

    // Add to cart and create order
    await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ sweetId, quantity: 3 });

    const orderResponse = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ deliveryAddress: 'Test Address' });
    
    orderId = orderResponse.body.order._id;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('should restore stock when order is cancelled by user', async () => {
    // Check initial stock after order creation
    let sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(7); // 10 - 3 = 7

    // Cancel order
    const response = await request(app)
      .put(`/api/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order cancelled successfully');

    // Check stock is restored
    sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(10); // Back to original 10

    // Check order status
    const order = await Order.findById(orderId);
    expect(order.status).toBe('cancelled');
  });

  it('should restore stock when order is cancelled by admin', async () => {
    // Check initial stock after order creation
    let sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(7); // 10 - 3 = 7

    // Admin cancels order
    const response = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'cancelled' });

    expect(response.status).toBe(200);

    // Check stock is restored
    sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(10); // Back to original 10

    // Check order status
    const order = await Order.findById(orderId);
    expect(order.status).toBe('cancelled');
  });

  it('should not allow cancelling already cancelled order', async () => {
    // First cancellation
    await request(app)
      .put(`/api/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);

    // Try to cancel again
    const response = await request(app)
      .put(`/api/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Order already cancelled');
  });

  it('should not allow cancelling delivered order', async () => {
    // Mark as delivered
    await request(app)
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'delivered' });

    // Try to cancel
    const response = await request(app)
      .put(`/api/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Cannot cancel delivered order');
  });

  it('should not restore stock twice for same order', async () => {
    // Cancel via user endpoint
    await request(app)
      .put(`/api/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);

    let sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(10); // Stock restored

    // Try to change status to cancelled again via admin
    await request(app)
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'cancelled' });

    // Stock should still be 10, not 13
    sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(10);
  });
});