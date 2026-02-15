<div align="center">

# 🛒 Mini E-Commerce API

### Production-Ready Backend for Online Shopping Platform

[![Node.js](https://img.shields.io/badge/Node.js-22.9.0-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

**A robust, scalable backend system** featuring authentication, role-based access control (RBAC), product management, shopping cart operations, and order processing with **atomic transaction handling** for data consistency.

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Architecture](#-architecture)

</div>

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Setup Instructions](#-setup-instructions)
- [Database Schema / ER Diagram](#-database-schema--er-diagram)
- [API Documentation](#-api-documentation)
- [Key Architectural Decisions](#-key-architectural-decisions)
- [Assumptions Made](#-assumptions-made)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Testing](#-testing)

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Backend & Runtime
- **Node.js** `v22.9.0` - JavaScript runtime
- **Express.js** `v4.18.2` - Web framework  
- **JavaScript ES6+** - Modern syntax with modules

### Database & ORM
- **MongoDB** - NoSQL database
- **Mongoose** `v7.0.3` - ODM for MongoDB
- **MongoDB Transactions** - ACID compliance

</td>
<td width="50%" valign="top">

### Authentication & Security
- **JWT** `v9.0.0` - Token-based authentication
- **Helmet.js** `v7.0.0` - Security headers
- **CORS** `v2.8.5` - Cross-origin resource sharing
- **express-rate-limit** `v6.7.0` - API rate limiting
- **dotenv** - Environment variable management

### Additional
- **axios** - HTTP client
- **nodemailer** `v6.9.1` - Email service
- **form-data** - Multipart forms

</td>
</tr>
</table>

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

###  Authentication & Authorization
OTP-based authentication  
JWT token management   
Role-based access (Admin/Customer)  
 Secure session handling  

### Product Management (Admin)
 Create, update, delete products  
 Stock management with validation  
 Category & brand organization  
 Product search & filtering  

</td>
<td width="50%" valign="top">

###  Shopping Features (Customer)
Add/remove items from cart  
Update cart quantities  
Wishlist management  
Place orders with validation  
Order history tracking  

###  Business Logic
Stock validation before orders  
Backend price calculation  
Prevent negative inventory  
Atomic stock deduction  
MongoDB transactions  

</td>
</tr>
</table>

---

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/mehedi-nahi/Mini-E-commerce-API.git
cd Mini-E-commerce-API

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start MongoDB with replica set
mongod --replSet rs0

# Run application
npm start
```

Server runs at `http://localhost:5050` 🚀

---

## 🚀 Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher) → [Download](https://nodejs.org/)
- **MongoDB** (v5.0+ with replica set) → [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager

### Step-by-Step Installation

####  Clone the Repository

```bash
git clone https://github.com/mehedi-nahi/Mini-E-commerce-API.git
cd Mini-E-commerce-API
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`.

#### 3️⃣ Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```bash
# Server Configuration
PORT=5050
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT Configuration  
JWT_SECRET=your-32-character-secret-key-here
JWT_EXPIRE_TIME=2592000

# Email Configuration (for OTP)
EMAIL_HOST=smtp.your-provider.com
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
EMAIL_PORT=587
EMAIL_SECURITY=false
EMAIL_UN_AUTH=false

# Application Settings
WEB_CACHE=false
MAX_JSON_SIZE=10MB
URL_ENCODE=true
REQUEST_TIME=1200000
REQUEST_NUMBER=2000

# Payment Gateway (SSLCommerz)
STORE_ID=your-sslcommerz-store-id
STORE_PASSWORD=your-store-password
CURRENCY=BDT
SUCCESS_URL=http://localhost:3000/success
FAIL_URL=http://localhost:3000/fail
CANCEL_URL=http://localhost:3000/cancel
INIT_URL=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
```

> ⚠️ **Security Note:** Never commit `.env` to version control! It's already in `.gitignore`.

#### 4️⃣ Setup MongoDB Replica Set

**For Local Development:**

```bash
# Terminal 1: Start MongoDB with replica set
mongod --replSet rs0

# Terminal 2: Initialize replica set (first time only)
mongosh
> rs.initiate()
> exit
```

**For MongoDB Atlas:**

Replica sets are enabled by default. Just use your connection string in `.env`.

#### 5️⃣ Run the Application

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

#### 6️⃣ Verify Installation

Server should be running at `http://localhost:5050`

Test a public endpoint:
```bash
curl http://localhost:5050/api/BrandList
```

Expected response:
```json
{
  "status": true,
  "data": [...]
}
```

### Optional: Database Seeding

Create test users for development:

```bash
mongosh your-database-name

# Admin user
db.users.insertOne({
  email: "admin@test.com",
  otp: "0",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})

# Customer user
db.users.insertOne({
  email: "customer@test.com",
  otp: "0",
  role: "customer",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 🗄️ Database Schema / ER Diagram

### Entity Relationship Overview

```
┌──────────────┐
│    USERS     │
│ (Auth+Role)  │
└──────┬───────┘
       │
       ├─────────────┬─────────────┬─────────────┬────────────┐
       │             │             │             │            │
       ▼             ▼             ▼             ▼            ▼
  ┌────────┐   ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐
  │ CARTS  │   │ WISHES  │  │ INVOICES │  │ REVIEWS │  │PROFILES │
  └────┬───┘   └────┬────┘  │ (Orders) │  └────┬────┘  └─────────┘
       │            │        └────┬─────┘       │
       │            │             │             │
       └────────────┴─────┬───────┴─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │  PRODUCTS   │◄─────┬───────┐
                   │ (+ Stock)   │      │       │
                   └─────────────┘      │       │
                          │             │       │
                          ▼             ▼       ▼
                   ┌──────────┐  ┌──────────┐ ┌─────┐
                   │CATEGORIES│  │  BRANDS  │ │ ... │
                   └──────────┘  └──────────┘ └─────┘
```

### Core Entities

<details>
<summary><b> Users</b> - Authentication and role management</summary>

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  otp: String (for authentication),
  role: String (enum: ['admin', 'customer'], default: 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

**Relationships:**
- 1:1 with Profiles
- 1:N with Carts, Wishes, Invoices, Reviews

</details>

<details>
<summary><b> Products</b> - Product catalog with stock management</summary>

```javascript
{
  _id: ObjectId,
  title: String (required),
  shortDes: String,
  price: Number (required),
  discount: Boolean,
  discountPrice: Number,
  image: String,
  stock: Number (min: 0, required), 
  star: Number,
  remark: String,
  categoryID: ObjectId (ref: 'categories'),
  brandID: ObjectId (ref: 'brands'),
  createdAt: Date,
  updatedAt: Date
}
```

**Relationships:**
- N:1 with Categories, Brands
- 1:N with Carts, Wishes, Reviews, Invoice_Products

</details>

<details>
<summary><b> Carts</b> - Shopping cart items</summary>

```javascript
{
  _id: ObjectId,
  userID: ObjectId (ref: 'users', required),
  productID: ObjectId (ref: 'products', required),
  qty: Number (required),
  color: String,
  size: String,
  createdAt: Date,
  updatedAt: Date
}
```

</details>

<details>
<summary><b> Invoices (Orders)</b> - Customer orders</summary>

```javascript
{
  _id: ObjectId,
  userID: ObjectId (ref: 'users', required),
  payable: Number (required), // Total with VAT
  cus_details: String (customer info),
  ship_details: String (shipping address),
  tran_id: String (unique, transaction ID),
  val_id: String (validation ID),
  payment_status: String (enum: ['pending', 'success', 'failed', 'cancelled']),
  delivery_status: String (enum: ['pending', 'shipped', 'delivered', 'cancelled']),
  total: Number (subtotal),
  vat: Number (5% VAT),
  createdAt: Date,
  updatedAt: Date
}
```

</details>

<details>
<summary><b> Invoice Products (Order Items)</b> - Items in each order</summary>

```javascript
{
  _id: ObjectId,
  userID: ObjectId (ref: 'users'),
  invoiceID: ObjectId (ref: 'invoices', required),
  productID: ObjectId (ref: 'products', required),
  qty: Number (required),
  price: Number (price at time of purchase), // Snapshot
  size: String,
  color: String,
  createdAt: Date,
  updatedAt: Date
}
```

</details>

### Relationship Summary

| Parent | Relationship | Child | Type |
|--------|--------------|-------|------|
| Users | → | Profiles | 1:1 |
| Users | → | Carts, Wishes, Invoices, Reviews | 1:N |
| Products | → | Categories, Brands | N:1 |
| Products | → | Carts, Wishes, Invoice_Products | 1:N |
| Invoices | → | Invoice_Products | 1:N |

 **Full Visual Diagram:** See [ER_DIAGRAM.md](./ER_DIAGRAM.md) for complete details

---

##  API Documentation

### Base URL

```
http://localhost:5050/api
```

### Authentication

Protected routes require JWT token:

```http
Authorization: Bearer <your_jwt_token>
role: <admin|customer>
```

### Endpoint Categories

<table>
<tr>
<td width="50%" valign="top">

####  Public Endpoints

**Products**
```
GET  /BrandList
GET  /CategoryList
GET  /ProductListByCategory/:CategoryID
GET  /ProductListBySlider
GET  /ProductListByRemark/:Remark
GET  /ProductListByBrand/:BrandID
GET  /ProductDetailsID/:ProductID
GET  /ProductListByKeyword/:keyword
GET  /ProductReviewListByID/:ProductID
```

**Authentication**
```
POST /Login
POST /VerifyLogin
```

</td>
<td width="50%" valign="top">

#### Admin Endpoints

```
POST   /CreateProduct
POST   /UpdateProduct/:id
DELETE /DeleteProduct/:id
POST   /UpdateStock/:id
```

#### Customer Endpoints

**Profile**
```
POST /CreateUserProfile
POST /UpdateUserProfile
GET  /ReadUserProfile
```

**Cart**
```
POST /CreateCart
POST /UpdateCart
POST /RemoveCart
GET  /ReadCartList
```

**Wishlist**
```
POST /CreateWish
POST /RemoveWish
GET  /ReadWishList
```

**Orders**
```
POST /CreateInvoice
GET  /InvoiceList
GET  /InvoiceProductList/:InvoiceID
```

</td>
</tr>
</table>

### API Examples

<details>
<summary><b> Authentication Flow</b></summary>

**Step 1: Request OTP**

```bash
POST /api/Login
Content-Type: application/json

{
  "email": "customer@test.com"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Verification code sent to your email."
}
```

---

**Step 2: Verify OTP & Get Token**

```bash
POST /api/VerifyLogin
Content-Type: application/json

{
  "email": "customer@test.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Valid OTP.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "customer"
}
```

</details>

<details>
<summary><b> Admin: Create Product</b></summary>

```bash
POST /api/CreateProduct
Authorization: Bearer <admin_token>
role: admin
Content-Type: application/json

{
  "title": "Wireless Headphones",
  "shortDes": "Premium noise-cancelling headphones",
  "price": 99.99,
  "discount": true,
  "discountPrice": 79.99,
  "stock": 50,
  "image": "https://example.com/headphones.jpg",
  "star": 4.5,
  "remark": "new",
  "categoryID": "507f1f77bcf86cd799439011",
  "brandID": "507f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Wireless Headphones",
    "price": 99.99,
    "stock": 50
  }
}
```

</details>

<details>
<summary><b>Customer: Add to Cart</b></summary>

```bash
POST /api/CreateCart
Authorization: Bearer <customer_token>
role: customer
Content-Type: application/json

{
  "productID": "507f1f77bcf86cd799439013",
  "qty": 2,
  "color": "Black",
  "size": "M"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Added to cart"
}
```

</details>

<details>
<summary><b> Customer: Place Order</b></summary>

```bash
POST /api/CreateInvoice
Authorization: Bearer <customer_token>
role: customer
```

**What happens:**
1. Validates stock availability
2. Calculates total + VAT (5%)
3. Creates invoice
4. Deducts stock atomically
5. Clears cart

**Response:**
```json
{
  "status": "success",
  "data": "507f1f77bcf86cd799439020"
}
```

</details>

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| `200` | OK | Successful request |
| `400` | Bad Request | Validation error, invalid input |
| `401` | Unauthorized | Missing/invalid token |
| `403` | Forbidden | Insufficient role permissions |
| `404` | Not Found | Resource doesn't exist |
| `500` | Internal Server Error | Server-side error |

---

## Key Architectural Decisions

### 1. **MVC Architecture Pattern**

```
routes/ → controllers/ → services/ → models/
```

- **Routes:** Define API endpoints
- **Controllers:** Handle HTTP requests/responses
- **Services:** Business logic and database operations
- **Models:** Mongoose schemas

### 2. **MongoDB Transactions for Data Integrity**

All critical operations (order placement, stock deduction) use MongoDB sessions:

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Multiple operations with { session }
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```


### 3. **Role-Based Access Control (RBAC)**

Two-layer middleware approach:
- `AuthMiddleware`: Validates JWT token
- `RoleMiddleware`: Checks user role (admin/customer)


### 4. **Stock Management Strategy**

1. Validate stock **before** order creation
2. Deduct stock **after** successful invoice creation
3. Use atomic operations (`$inc`) to prevent race conditions
4. Restore stock on payment failure/cancellation


### 5. **Backend Price Calculation**

Order totals calculated server-side, never trusted from client:

```javascript
let totalAmount = 0;
CartProducts.forEach((element) => {
  let price = element.product.discount 
    ? element.product.discountPrice 
    : element.product.price;
  totalAmount += (price * element.qty);
});
```


### 6. **OTP-Based Authentication**

Passwordless authentication using one-time passwords:
- User provides email → System generates 6-digit OTP
- OTP sent via email → User verifies OTP → JWT token issued


### 7. **Invoice Terminology (Not "Order")**

Used `invoices` and `invoiceProducts` instead of `orders`:

### 8. **Aggregation Pipeline for Cart Operations**

Uses MongoDB `$lookup` to join cart with products efficiently:

```javascript
let CartProducts = await CartModel.aggregate([
  { $match: { userID: user_id } },
  { $lookup: { from: "products", ... } },
  { $unwind: "$product" }
]);
```

### 9. **Environment Variables with dotenv**

All sensitive credentials stored in `.env` file:


### 10. **Rate Limiting**

Express rate limiter prevents API abuse:

```javascript
const limiter = rateLimit({
  windowMs: REQUEST_TIME,
  max: REQUEST_NUMBER
});
```

---

##  Assumptions Made

### 1. **Authentication System**

**Assumption:** Users prefer passwordless authentication via email OTP  
**Justification:** Modern UX trend, reduces password management burden  
**Impact:** Email service must be reliable; backup authentication may be needed

### 2. **User Roles**

**Assumption:** Only two roles needed (admin/customer)  
**Justification:** Simplifies RBAC, covers basic e-commerce scenarios  
**Impact:** Future roles (vendor, moderator) would require middleware updates

### 3. **MongoDB Replica Set**

**Assumption:** Production environment has MongoDB replica set enabled  
**Justification:** Required for transaction support  
**Impact:** Development setup requires replica set configuration

### 4. **Stock Management**

**Assumption:** Stock tracked at product level (not variant level)  
**Justification:** Simpler implementation, adequate for MVP  
**Impact:** Color/size variants share same stock pool

### 5. **Payment Gateway**

**Assumption:** SSLCommerz payment gateway will be integrated  
**Justification:** Popular in Bangladesh, well-documented API  
**Impact:** Payment services currently have placeholder implementation

### 6. **Order Workflow**

**Assumption:** Orders follow: Cart → Invoice → Payment → Delivery  
**Justification:** Standard e-commerce flow  
**Impact:** No support for guest checkout or direct purchase (buy now)

### 7. **VAT Calculation**

**Assumption:** Fixed 5% VAT on all products  
**Justification:** Simplified tax handling  
**Impact:** May need country-specific tax logic for international sales

### 8. **Email Notifications**

**Assumption:** Email service available for OTP delivery  
**Justification:** Required for passwordless authentication  
**Impact:** Fallback mechanism (SMS) not implemented

### 9. **Cart Persistence**

**Assumption:** Cart persists across sessions (database-stored)  
**Justification:** Better UX, supports multiple devices  
**Impact:** Higher database storage vs session-based carts

### 10. **Product Search**

**Assumption:** Basic text search sufficient for MVP  
**Justification:** Simple implementation, adequate for small catalogs  
**Impact:** May need Elasticsearch for large-scale search with faceting

### 11. **Concurrency Handling**

**Assumption:** MongoDB transactions prevent race conditions  
**Justification:** Built-in database feature  
**Impact:** Requires replica set, slightly higher latency

### 12. **File Storage**

**Assumption:** Product images stored as URL strings (external storage)  
**Justification:** Simpler implementation, better performance  
**Impact:** Requires external CDN/storage service (AWS S3, Cloudinary)

### 13. **Order Cancellation**

**Assumption:** Order cancellation restores stock to inventory  
**Justification:** Prevents stock loss, supports customer flexibility  
**Impact:** Potential for abuse (fraud prevention tracking recommended)

### 14. **Price Snapshot**

**Assumption:** Order items store price at time of purchase  
**Justification:** Historical pricing accuracy  
**Impact:** Reports show actual paid price, not current price

### 15. **Single Currency**

**Assumption:** All transactions in BDT (Bangladeshi Taka)  
**Justification:** Target market is Bangladesh  
**Impact:** Multi-currency support not implemented

---

##  Project Structure

```
AppifyDevs/
├── app.js                          # Application entry point
├── package.json                    # Dependencies and scripts
├── .env                           # Environment variables (not in git)
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── ER_DIAGRAM.md                   # Database schema diagram
│
├── app/
│   ├── config/
│   │   └── config.js               # Configuration loader (uses dotenv)
│   │
│   ├── controllers/                # Request handlers
│   │   ├── BrandController.js
│   │   ├── CartListController.js
│   │   ├── CategoryController.js
│   │   ├── InvoiceController.js
│   │   ├── ProductController.js
│   │   ├── UserController.js
│   │   └── WishListController.js
│   │
│   ├── middlewares/                # Authentication & authorization
│   │   ├── AuthMiddleware.js       # JWT validation
│   │   └── RoleMiddleware.js       # Role-based access control
│   │
│   ├── model/                      # Mongoose schemas
│   │   ├── usersModel.js           # User authentication
│   │   ├── productsModel.js        # Product catalog
│   │   ├── cartsModel.js           # Shopping carts
│   │   ├── invoicesModel.js        # Orders
│   │   ├── invoiceProductsModel.js # Order items
│   │   ├── profilesModel.js        # User profiles
│   │   ├── wishesModel.js          # Wishlist
│   │   ├── reviewsModel.js         # Product reviews
│   │   ├── categoriesModel.js      # Categories
│   │   ├── brandsModel.js          # Brands
│   │   ├── slidersModel.js         # Homepage sliders
│   │   ├── detailsModel.js         # Product details
│   │   ├── featuresModel.js        # Product features
│   │   └── paymentSettingsModel.js # Payment config
│   │
│   ├── service/                    # Business logic
│   │   ├── UserService.js          # Auth, profiles
│   │   ├── ProductService.js       # Product operations
│   │   ├── CartService.js          # Cart management
│   │   ├── InvoiceService.js       # Order processing ⚡
│   │   ├── WishService.js          # Wishlist
│   │   └── ProductReviewService.js # Reviews
│   │
│   └── utility/                    # Helper functions
│       ├── tokenUtility.js         # JWT encode/decode
│       ├── emailUtility.js         # Email sending
│       └── ManagePaymentSystem.js  # Payment integration
│
└── routes/
    └── api.js                      # API route definitions
```

### Key Files

- `app.js` - Express server setup, middleware configuration
- `.env` - Sensitive credentials (never commit!)
- `config.js` - Loads environment variables
- `InvoiceService.js` - Core order processing with transactions
- `AuthMiddleware.js` + `RoleMiddleware.js` - Security layer

---

##  Security

### Implemented Security Features

 **JWT Authentication** - Secure token-based auth  
 **Role-Based Authorization (RBAC)** - Admin/Customer separation  
 **Helmet.js** - HTTP security headers  
 **CORS** - Controlled cross-origin access  
 **Rate Limiting** - Prevents abuse  
 **OTP Authentication** - Passwordless security  
 **Environment Variables** - No hardcoded credentials  
 **MongoDB Injection Prevention** - Mongoose ODM protection  
 **Input Validation** - Mongoose schema validation  

### Best Practices

- All sensitive data in `.env` (excluded from git)
- JWT tokens expire after 30 days
- Protected routes require authentication + role
- Stock operations use atomic transactions
- Passwords not stored (OTP-based auth)

---

## 🧪 Testing

### 🌐 Live API Base URL

```
https://mini-e-commerce-api-1.onrender.com
```

> ⚠️ **Note:** Free tier may sleep after inactivity. First request takes ~30 seconds to wake up.

---

### 📡 Live API Endpoints

#### 🔓 **Public Endpoints** (No Authentication Required)

##### Authentication
```bash
# Login (Get OTP)
POST https://mini-e-commerce-api-1.onrender.com/api/Login
Body: { "email": "customer@test.com" }

# Verify Login (Get Token)
POST https://mini-e-commerce-api-1.onrender.com/api/VerifyLogin
Body: { "email": "customer@test.com", "otp": "123456" }
```

##### Browse Products
```bash
# Get All Brands
GET https://mini-e-commerce-api-1.onrender.com/api/BrandList

# Get All Categories
GET https://mini-e-commerce-api-1.onrender.com/api/CategoryList

# Get Products by Category
GET https://mini-e-commerce-api-1.onrender.com/api/ProductListByCategory/{CategoryID}

# Get Products by Brand
GET https://mini-e-commerce-api-1.onrender.com/api/ProductListByBrand/{BrandID}

# Get Products by Remark (New, Featured, Popular, Sale)
GET https://mini-e-commerce-api-1.onrender.com/api/ProductListByRemark/{Remark}

# Get Slider Products
GET https://mini-e-commerce-api-1.onrender.com/api/ProductListBySlider

# Get Product Details
GET https://mini-e-commerce-api-1.onrender.com/api/ProductDetailsID/{ProductID}

# Search Products by Keyword
GET https://mini-e-commerce-api-1.onrender.com/api/ProductListByKeyword/{keyword}

# Get Product Reviews
GET https://mini-e-commerce-api-1.onrender.com/api/ProductReviewListByID/{ProductID}
```

---

#### 👑 **Admin Endpoints** (Requires Admin Token)

```bash
# Create Product
POST https://mini-e-commerce-api-1.onrender.com/api/CreateProduct
Header: token: YOUR_ADMIN_TOKEN
Body: {
  "title": "Product Name",
  "shortDesc": "Description",
  "price": 999,
  "discount": 10,
  "discountPrice": 899,
  "image": "https://example.com/image.jpg",
  "start": "4.5",
  "stock": true,
  "remark": "New",
  "categoryId": "CATEGORY_ID",
  "brandID": "BRAND_ID"
}

# Update Product
POST https://mini-e-commerce-api-1.onrender.com/api/UpdateProduct/{id}
Header: token: YOUR_ADMIN_TOKEN
Body: { "title": "Updated Name", "price": 899 }

# Update Stock
POST https://mini-e-commerce-api-1.onrender.com/api/UpdateStock/{id}
Header: token: YOUR_ADMIN_TOKEN
Body: { "stock": false }

# Delete Product
DELETE https://mini-e-commerce-api-1.onrender.com/api/DeleteProduct/{id}
Header: token: YOUR_ADMIN_TOKEN
```

---

#### 🛒 **Customer Endpoints** (Requires Customer Token)

##### Profile Management
```bash
# Create Profile
POST https://mini-e-commerce-api-1.onrender.com/api/CreateUserProfile
Header: token: YOUR_TOKEN
Body: {
  "cus_name": "John Doe",
  "cus_add": "123 Street",
  "cus_city": "New York",
  "cus_country": "USA",
  "cus_postcode": "10001",
  "cus_phone": "+1234567890",
  "cus_state": "NY",
  "ship_name": "John Doe",
  "ship_add": "123 Street",
  "ship_city": "New York",
  "ship_country": "USA",
  "ship_postcode": "10001",
  "ship_phone": "+1234567890",
  "ship_state": "NY"
}

# Update Profile
POST https://mini-e-commerce-api-1.onrender.com/api/UpdateUserProfile
Header: token: YOUR_TOKEN
Body: { "cus_name": "Jane Doe" }

# Read Profile
GET https://mini-e-commerce-api-1.onrender.com/api/ReadUserProfile
Header: token: YOUR_TOKEN
```

##### Shopping Cart
```bash
# Add to Cart
POST https://mini-e-commerce-api-1.onrender.com/api/CreateCart
Header: token: YOUR_TOKEN
Body: {
  "productID": "PRODUCT_ID",
  "qty": 2,
  "color": "Black",
  "size": "256GB"
}

# View Cart
GET https://mini-e-commerce-api-1.onrender.com/api/ReadCartList
Header: token: YOUR_TOKEN

# Update Cart
POST https://mini-e-commerce-api-1.onrender.com/api/UpdateCart
Header: token: YOUR_TOKEN
Body: { "cartID": "CART_ID", "qty": 3 }

# Remove from Cart
POST https://mini-e-commerce-api-1.onrender.com/api/RemoveCart
Header: token: YOUR_TOKEN
Body: { "cartID": "CART_ID" }
```

##### Wishlist
```bash
# Add to Wishlist
POST https://mini-e-commerce-api-1.onrender.com/api/CreateWish
Header: token: YOUR_TOKEN
Body: { "productID": "PRODUCT_ID" }

# View Wishlist
GET https://mini-e-commerce-api-1.onrender.com/api/ReadWishList
Header: token: YOUR_TOKEN

# Remove from Wishlist
POST https://mini-e-commerce-api-1.onrender.com/api/RemoveWish
Header: token: YOUR_TOKEN
Body: { "wishID": "WISH_ID" }
```

##### Reviews
```bash
# Create Review
POST https://mini-e-commerce-api-1.onrender.com/api/CreateProductReview
Header: token: YOUR_TOKEN
Body: {
  "productID": "PRODUCT_ID",
  "des": "Great product!",
  "rating": "5"
}

# Update Review
POST https://mini-e-commerce-api-1.onrender.com/api/UpdateProductReview
Header: token: YOUR_TOKEN
Body: {
  "reviewID": "REVIEW_ID",
  "des": "Updated review",
  "rating": "4"
}
```

##### Orders & Invoices
```bash
# Place Order (Create Invoice)
POST https://mini-e-commerce-api-1.onrender.com/api/CreateInvoice
Header: token: YOUR_TOKEN

# View My Orders
GET https://mini-e-commerce-api-1.onrender.com/api/InvoiceList
Header: token: YOUR_TOKEN

# View Order Details
GET https://mini-e-commerce-api-1.onrender.com/api/InvoiceProductList/{InvoiceID}
Header: token: YOUR_TOKEN
```

##### Payment Callbacks
```bash
# Payment Success
POST https://mini-e-commerce-api-1.onrender.com/api/PaymentSuccessful/{trxID}

# Payment Failed
POST https://mini-e-commerce-api-1.onrender.com/api/PaymentFail/{trxID}

# Payment Cancelled
POST https://mini-e-commerce-api-1.onrender.com/api/PaymentCancel/{trxID}

# Payment IPN
POST https://mini-e-commerce-api-1.onrender.com/api/PaymentIPN/{trxID}
```

---
[TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)
### 🧪 Testing Workflow

#### Quick Test (No Auth Required)
```bash
# Test if API is live
curl https://mini-e-commerce-api-1.onrender.com/api/BrandList
```

#### Complete Shopping Flow
```bash
# 1. Login
curl -X POST https://mini-e-commerce-api-1.onrender.com/api/Login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com"}'

# 2. Verify (use OTP from response)
curl -X POST https://mini-e-commerce-api-1.onrender.com/api/VerifyLogin \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","otp":"123456"}'

# 3. Browse Products
curl https://mini-e-commerce-api-1.onrender.com/api/ProductListByRemark/New

# 4. Add to Cart (use token from step 2)
curl -X POST https://mini-e-commerce-api-1.onrender.com/api/CreateCart \
  -H "Content-Type: application/json" \
  -H "token: YOUR_TOKEN" \
  -d '{"productID":"PRODUCT_ID","qty":1,"color":"Black","size":"M"}'

# 5. Place Order
curl -X POST https://mini-e-commerce-api-1.onrender.com/api/CreateInvoice \
  -H "token: YOUR_TOKEN"
```

---

### ✅ Testing Checklist

- [ ] API is live and responsive
- [ ] Login returns OTP in response
- [ ] Verify login returns JWT token
- [ ] Public endpoints work without auth
- [ ] Admin endpoints require admin token
- [ ] Customer endpoints require customer token
- [ ] Stock validation prevents overselling
- [ ] Order placement deducts stock correctly
- [ ] Cart operations work (add/update/remove)
- [ ] Wishlist functionality works
- [ ] Product search returns results
- [ ] Reviews can be created and viewed
- [ ] Role-based access control enforced (403 for wrong role)

---

### 🔬 Sample Test Cases

#### Test 1: Role Authorization
```bash
# Login as customer
POST /api/Login → customer@test.com

# Try admin endpoint (should fail)
POST /api/CreateProduct
Expected: 403 Forbidden - "Access denied. Admin role required."
```

#### Test 2: Stock Validation
```bash
# Add product with limited stock to cart
POST /api/CreateCart → qty: 100

# Try to place order
POST /api/CreateInvoice
Expected: Error if stock insufficient
```

#### Test 3: Authentication Required
```bash
# Try protected endpoint without token
GET /api/ReadUserProfile
Expected: 401 Unauthorized
```

---

### 📱 Postman Testing

**Import Collection:**
1. Download: [Coming Soon]
2. Import into Postman
3. Set environment variable:
   - `BASE_URL`: `https://mini-e-commerce-api-1.onrender.com`
4. Start testing!

**Environment Variables:**
```json
{
  "BASE_URL": "https://mini-e-commerce-api-1.onrender.com",
  "TOKEN": "YOUR_JWT_TOKEN_HERE"
}
```

---

## Limitations

1. **Payment Services:** Placeholder implementation (needs SSLCommerz integration)
2. **Order Status Updates:** No admin endpoint to update delivery status
3. **Fraud Prevention:** No tracking for repeated order cancellations
4. **File Uploads:** No image upload endpoint (expects external URLs)
5. **Email Service:** Not connected (placeholder in code)
6. **Advanced Search:** Basic text search only (no faceted search)

---


##  Author

**Md Mehedi Alam Nahi**

- GitHub: [@mehedi-nahi](https://github.com/mehedi-nahi)
- Repository: [Mini-E-commerce-API](https://github.com/mehedi-nahi/Mini-E-commerce-API)

---


