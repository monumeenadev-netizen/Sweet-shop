

# ✨ **The Mithai Box — Sweet Shop Management System**

### A Full-Stack TDD Kata (Node.js + React)

### Premium Gold × Brown × Cream Theme

This project is a complete **Sweet Shop Management System** built as a **Test-Driven Development (TDD) Kata**, featuring a fully functional backend API, modern frontend interface, authentication, admin controls, and a polished luxury UI inspired by premium mithai brands.

---

# 📸 **Live Demo **

👉 **[https://sweet-shop-ruby.vercel.app/](https://sweet-shop-ruby.vercel.app/)**


---
  


# 🍮 **Table of Contents**

* ⭐ Overview
* 🔧 Features
* 🧪 TDD Methodology
* 🏗 Tech Stack
* 🎯 Requirements (Kata Compliance)
* ⚙ Setup Instructions
* 🚀 Running the Project
* 🧷 API Endpoints
* 🛒 Frontend Functionality
* 🖼 Screenshots
* 🤖 My AI Usage (MANDATORY)
* 📦 Project Structure
* 🧪 Test Report
* 📚 Troubleshooting
* 📄 License

---

# ⭐ **1. Overview**

**The Mithai Box** is a full-stack, production-ready Sweet Shop Management System built under strict **TDD (Red → Green → Refactor)** principles.

It includes:

✔ Complete REST API
✔ User authentication
✔ Sweet inventory management
✔ Search & filter
✔ Purchase & restock system
✔ Cart & orders
✔ Admin + Super Admin dashboards
✔ Clean, luxurious UI inspired by mithai shops
✔ Comprehensive test suite
✔ AI usage transparency

---

# 🔧 **2. Core Features**

### 👤 **Authentication**

* User registration
* Login
* JWT-based authentication
* Role-based permissions (User/Admin)

### 🍬 **Sweet Management**

* Add sweet (Admin)
* Edit sweet (Admin)
* Delete sweet (Admin)
* View all sweets
* Search sweets by name/category/price
* Purchase sweet (decreases stock)
* Restock sweet (Admin only)

### 🛒 **User Experience**

* Product dashboard
* Advanced filters
* Shopping cart
* Order placement
* Order history
* Product detail page
* Buy Now
* Quantity limitations based on stock

### 🛠 Admin & Super Admin

* Inventory management
* Business analytics
* Discount campaigns
* Marketing banners
* User management

---

# 🧪 **3. TDD Methodology**

This project strictly follows **Test-Driven Development**:

### 🔴 RED

Write failing tests first

### 🟢 GREEN

Write minimal code to pass tests

### 🔵 REFACTOR

Improve code without breaking tests

Test coverage includes:

✔ Authentication
✔ Sweets CRUD
✔ Purchase/restock logic
✔ Cart logic
✔ Search & filtering
✔ API validation
✔ Frontend component tests
✔ Edge cases (out of stock, invalid login, coupon failures, etc.)

A full test summary is provided in **TEST_REPORT.md**

---

# 🏗 **4. Tech Stack**

### **Backend**

* Node.js (Express)
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt password hashing
* Jest + Supertest (TDD)

### **Frontend**

* React 19
* Vite
* React Router 7
* Axios
* Vitest + React Testing Library

### **Others**

* Modular architecture
* ESLint formatting
* Environment-based config
* Vercel + Render for deployment

---

# 🎯 **5. Kata Requirements (100% Completed)**

| Requirement                  | Status                       |
| ---------------------------- | ---------------------------- |
| Backend API with DB          | ✔ Completed (MongoDB)        |
| Auth: register/login (JWT)   | ✔ Completed                  |
| Sweets CRUD                  | ✔ Completed                  |
| Search API                   | ✔ Completed                  |
| Purchase & Restock           | ✔ Completed                  |
| Admin-only routes            | ✔ Completed                  |
| Frontend SPA                 | ✔ Completed                  |
| User & Admin interfaces      | ✔ Completed                  |
| TDD (Red/Green/Refactor)     | ✔ Fully followed             |
| Commit transparency using AI | ✔ Done                       |
| README with AI Usage         | ✔ Included                   |
| Test Report                  | ✔ Included                   |
| Screenshots                  | ✔ Included |

---

# ⚙ **6. Setup Instructions**

Clone the repository:

```bash
git clone https://github.com/shanubirla/SweetShop
cd sweet-shop
```

---

# 🛠 **Backend Setup**

```bash
cd backend
npm install
```

Create `.env`:

```
MONGODB_URI=your-mongodb-url
JWT_SECRET=your-secret-key
PORT=3000
```

Start backend:

```bash
npm run dev
```

---

# 🖥 **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

👉 [http://localhost:5173](http://localhost:5173)
Backend API at:

👉 [http://localhost:3000/api](http://localhost:3000/api)

---

# 🔗 **7. API Endpoints**

### **Auth**

| Method | Route              | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

### **Sweets**

| Method | Route              | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /api/sweets        | Get all sweets       |
| GET    | /api/sweets/search | Search sweets        |
| POST   | /api/sweets        | Add sweet (Admin)    |
| PUT    | /api/sweets/:id    | Update sweet         |
| DELETE | /api/sweets/:id    | Delete sweet (Admin) |

### **Inventory**

| Method | Route                    | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | /api/sweets/:id/purchase | Purchase sweet        |
| POST   | /api/sweets/:id/restock  | Restock sweet (Admin) |

---

# 🛒 **8. Frontend Features**

### Users Can:

* View sweets
* Search & filter
* Add to cart
* Buy now
* View orders

### Admin Can:

* Add sweets
* Edit sweets
* Delete sweets
* Restock
* View business analytics
* Manage users
* Manage banners
* Manage promotions

---

# 🖼 **9. Screenshots**



### 🏠 Dashboard

![Dashboard](./screenshots/dashboard.png)

### 🍬 Product Detail

![Product Detail](./screenshots/product.png)

### 🛒 Cart

![Cart](./screenshots/cart.png)

### 🛠 Admin Panel

![Admin Panel](./screenshots/admin.png)

---

# 🤖 **10. My AI Usage (MANDATORY for Kata)**



### **AI Tools Used**

* **ChatGPT (GPT-5.1)**
* **GitHub Copilot**

### **How AI Helped**

* Generated boilerplate for:

  * Controller structure
  * API route layout
  * React component drafts
* Helped write unit tests (Jest + RTL)
* Helped debug complex flows like:

  * Stock update logic
  * JWT middleware
  * Cart calculations
* Provided UI/UX ideas for the golden theme
* Helped generate documentation (README, summaries)

### **My Reflection**

AI significantly improved speed and reduced boilerplate time.
However:

* Business logic was fully handwritten
* Database design was done manually
* All AI code was reviewed, modified, and tested
* AI acted like a productivity assistant, not a code replacement
* TDD discipline was always kept → tests first, code second

### **Commit Transparency**

All commits influenced by AI include:

```
Co-authored-by: AI Assistant <AI@users.noreply.github.com>
```



---

# 📦 **11. Project Structure**

```
sweet-shop/
│
├── backend/
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── jest.config.js
│
├── frontend/
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── vitest.config.js
│
└── README.md
```

---

# 🧪 **12. Test Report**

Full test logs available in:

📄 **TEST_REPORT.md**

Includes:

* Backend tests (Auth, Sweets, Cart, Orders)
* Frontend component tests (Dashboard, Product, Cart)
* Coverage summary

---

# 📚 **13. Troubleshooting**

### MongoDB connection error

→ Ensure DB is running
→ Update `.env`

### CORS issue

→ Check frontend `.env`

### Login fails

→ Password must be ≥6 chars
→ JWT secret must match

### Tests failing

→ Run MongoDB in test mode
→ Clear Jest cache

---

# 📄 **14. License**

MIT License © 2024
The Mithai Box — Premium Sweet Shop System

---

# 🎉 **Thank You!**


