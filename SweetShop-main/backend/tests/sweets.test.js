const { describe, it, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');
const PurchaseLog = require('../src/models/PurchaseLog');
const { connectDB, disconnectDB } = require('../src/config/database');

describe('Sweets Endpoints - TDD', () => {
  let adminToken;
  let userToken;
  let adminUser;
  let regularUser;

  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await PurchaseLog.deleteMany({});
    await Sweet.deleteMany({});
    await User.deleteMany({});

    // Admin user
    adminUser = await User.create({
      email: 'admin@test.com',
      passwordHash: 'hashed_password',
      role: 'admin',
    });

    adminToken = jwt.sign(
      { id: adminUser._id, email: adminUser.email, role: 'admin' },
      process.env.JWT_SECRET
    );

    // Regular user
    regularUser = await User.create({
      email: 'user@test.com',
      passwordHash: 'hashed_password',
      role: 'user',
    });

    userToken = jwt.sign(
      { id: regularUser._id, email: regularUser.email, role: 'user' },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await disconnectDB();
  });

  // CREATE SWEET
  describe('POST /api/sweets', () => {
    it('should create a sweet as admin', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Chocolate Cake',
          category: 'Cakes',
          price: 25.99,
          quantity: 10,
        });

      expect(response.status).toBe(201);
      expect(response.body.sweet.name).toBe('Chocolate Cake');
    });

    it('should not allow normal user', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Cake',
          category: 'Cakes',
          price: 25.99,
          quantity: 10,
        });

      expect(response.status).toBe(403);
    });
  });

  // GET ALL SWEETS
  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Chocolate Cake', category: 'Cakes', price: 25.99, quantity: 10 },
        { name: 'Cupcake', category: 'Cupcakes', price: 5.99, quantity: 20 },
        { name: 'Tart', category: 'Tarts', price: 35.99, quantity: 5 },
      ]);
    });

    it('should return all sweets', async () => {
      const response = await request(app).get('/api/sweets');

      expect(response.status).toBe(200);
      expect(response.body.sweets.length).toBe(3);
    });
  });

  // SEARCH SWEETS
  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Chocolate Cake', category: 'Cakes', price: 25.99, quantity: 10 },
        { name: 'Cupcake', category: 'Cupcakes', price: 5.99, quantity: 20 },
        { name: 'Tart', category: 'Tarts', price: 35.99, quantity: 5 },
      ]);
    });

    it('search by name', async () => {
      const response = await request(app).get('/api/sweets/search?name=Chocolate');
      expect(response.body.sweets.length).toBe(1);
    });

    it('search by category', async () => {
      const response = await request(app).get('/api/sweets/search?category=Cupcakes');
      expect(response.body.sweets[0].category).toBe('Cupcakes');
    });

    it('search by price range', async () => {
      const response = await request(app).get('/api/sweets/search?minPrice=5&maxPrice=30');
      expect(response.body.sweets.length).toBe(2);
    });
  });

  // PURCHASE SWEET
  describe('POST /api/sweets/:id/purchase', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Cake',
        category: 'Cakes',
        price: 25.99,
        quantity: 10,
      });
    });

    it('should purchase sweet', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 3 });

      expect(response.status).toBe(200);

      const updated = await Sweet.findById(sweet._id);
      expect(updated.quantity).toBe(7);
    });
  });

  // RESTOCK
  describe('POST /api/sweets/:id/restock', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Cake',
        category: 'Cakes',
        price: 25.99,
        quantity: 10,
      });
    });

    it('admin restock', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 5 });

      expect(response.body.sweet.quantity).toBe(15);
    });
  });

  // DELETE
  describe('DELETE /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Chocolate Cake',
        category: 'Cakes',
        price: 25.99,
        quantity: 10,
      });
    });

    it('admin delete sweet', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      const check = await Sweet.findById(sweet._id);
      expect(check).toBeNull();
    });
  });
});
