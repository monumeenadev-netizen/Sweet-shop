const { describe, it, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');
const PurchaseLog = require('../src/models/PurchaseLog');
const { connectDB, disconnectDB } = require('../src/config/database');

describe('Auth Endpoints - TDD', () => {
  beforeAll(async () => {
    // Connect to MongoDB
    await connectDB();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await PurchaseLog.deleteMany({});
    await Sweet.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

  // RED: Test registration
  describe('POST /api/auth/register', () => {
    it('should register a new user and return status 201', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@test.com',
          password: 'securepassword123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('user@test.com');
    });

    it('should not register user with duplicate email', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@test.com',
          password: 'securepassword123',
        });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@test.com',
          password: 'anotherpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // RED: Test user login
  describe('POST /api/auth/login/user', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@test.com',
          password: 'securepassword123',
        });
    });

    it('should login user and return JWT token', async () => {
      const response = await request(app)
        .post('/api/auth/login/user')
        .send({
          email: 'user@test.com',
          password: 'securepassword123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('user@test.com');
      expect(response.body.user.role).toBe('user');
    });

    it('should not login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login/user')
        .send({
          email: 'user@test.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  // RED: Test admin login
  describe('POST /api/auth/login/admin', () => {
    beforeEach(async () => {
      // Create admin user
      const bcrypt = require('bcrypt');
      const User = require('../src/models/User');
      const passwordHash = await bcrypt.hash('adminpass123', 10);
      await User.create({
        email: 'admin@test.com',
        passwordHash,
        role: 'admin',
      });
    });

    it('should login admin and return JWT token', async () => {
      const response = await request(app)
        .post('/api/auth/login/admin')
        .send({
          email: 'admin@test.com',
          password: 'adminpass123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('admin@test.com');
      expect(response.body.user.role).toBe('admin');
    });

    it('should not allow user to login as admin', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@test.com',
          password: 'userpass123',
        });

      const response = await request(app)
        .post('/api/auth/login/admin')
        .send({
          email: 'user@test.com',
          password: 'userpass123',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
