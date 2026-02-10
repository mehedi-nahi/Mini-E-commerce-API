# Entity Relationship Diagram - Mini E-Commerce API

## Visual ER Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         MINI E-COMMERCE API - ER DIAGRAM                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌──────────────────┐
│     USERS        │
├──────────────────┤
│ PK _id           │
│    email         │◄─────────────────────────┐
│    otp           │                          │
│    role          │                          │ 1:1
│    timestamps    │                          │
└──────────────────┘                          │
        │                                     │
        │ 1:N                        ┌────────────────┐
        │                            │   PROFILES     │
        ├────────────────────────────├────────────────┤
        │                            │ PK _id         │
        │                            │ FK userID      │
        │                            │    cus_name    │
        │                            │    cus_add     │
        │                            │    cus_phone   │
        │                            │    ship_name   │
        │                            │    ship_add    │
        │                            │    ship_city   │
        │                            │    ship_phone  │
        │                            └────────────────┘
        │
        │
        ├─────────────┐
        │             │
        │ 1:N         │ 1:N
        │             │
        ▼             ▼
┌──────────────┐  ┌──────────────┐
│    CARTS     │  │   WISHES     │
├──────────────┤  ├──────────────┤
│ PK _id       │  │ PK _id       │
│ FK userID    │  │ FK userID    │
│ FK productID │──┼──│ FK productID │
│    qty       │  │    timestamps│
│    color     │  └──────────────┘
│    size      │          │
│  timestamps  │          │
└──────────────┘          │
        │                 │
        │                 │
        └─────────┬───────┘
                  │
                  │ N:1
                  │
                  ▼
        ┌──────────────────┐         ┌──────────────────┐
        │    PRODUCTS      │◄────────│   CATEGORIES     │
        ├──────────────────┤  N:1    ├──────────────────┤
        │ PK _id           │         │ PK _id           │
        │    title         │         │    categoryName  │
        │    shortDes      │         │    categoryImg   │
        │    price         │         └──────────────────┘
        │    discount      │
        │    discountPrice │
        │    image         │         ┌──────────────────┐
        │    stock         │◄────────│     BRANDS       │
        │    star          │  N:1    ├──────────────────┤
        │    remark        │         │ PK _id           │
        │ FK categoryID    │         │    brandName     │
        │ FK brandID       │         │    brandImg      │
        │    timestamps    │         └──────────────────┘
        └──────────────────┘
                │
                │ 1:N
                │
        ┌───────┴────────┬─────────────────────┐
        │                │                     │
        ▼                ▼                     ▼
┌──────────────┐  ┌──────────────┐    ┌──────────────────┐
│   DETAILS    │  │  FEATURES    │    │    REVIEWS       │
├──────────────┤  ├──────────────┤    ├──────────────────┤
│ PK _id       │  │ PK _id       │    │ PK _id           │
│ FK productID │  │ FK productID │    │ FK productID     │
│    img1-4    │  │    name      │    │ FK userID        │
│    des       │  │    des       │    │    des           │
│    color     │  │    timestamps│    │    rating        │
│    size      │  └──────────────┘    │    timestamps    │
│  timestamps  │                      └──────────────────┘
└──────────────┘


┌──────────────────┐
│     USERS        │
└──────────────────┘
        │
        │ 1:N
        │
        ▼
┌──────────────────┐
│    INVOICES      │
│   (Orders)       │
├──────────────────┤
│ PK _id           │
│ FK userID        │
│    payable       │
│    cus_details   │
│    ship_details  │
│    tran_id       │◄────────── Payment Gateway
│    val_id        │
│    payment_status│ (pending/success/failed/cancelled)
│ delivery_status  │ (pending/shipped/delivered/cancelled)
│    total         │
│    vat           │
│    timestamps    │
└──────────────────┘
        │
        │ 1:N
        │
        ▼
┌──────────────────┐
│ INVOICE_PRODUCTS │
│  (Order Items)   │
├──────────────────┤
│ PK _id           │
│ FK invoiceID     │
│ FK productID     │──────┐
│ FK userID        │      │
│    qty           │      │
│    price         │      │ References
│    size          │      │ PRODUCTS
│    color         │      │
│    timestamps    │      │
└──────────────────┘      │
                          │
                          ▼
                ┌──────────────────┐
                │    PRODUCTS      │
                │  (stock field)   │
                └──────────────────┘


┌──────────────────┐
│    SLIDERS       │  (Homepage Banners)
├──────────────────┤
│ PK _id           │
│    title         │
│    shortDes      │
│    image         │
│ FK productID     │
│    timestamps    │
└──────────────────┘


┌──────────────────┐
│ PAYMENT_SETTINGS │  (Payment Gateway Config)
├──────────────────┤
│ PK _id           │
│    store_id      │
│    store_passwd  │
│    currency      │
│    success_url   │
│    fail_url      │
│    cancel_url    │
│    ipn_url       │
│    init_url      │
│    timestamps    │
└──────────────────┘
```

---

## Relationships Summary

| Entity | Relationship | Entity | Type | Description |
|--------|--------------|--------|------|-------------|
| **Users** | 1:1 | **Profiles** | One-to-One | Each user has one profile |
| **Users** | 1:N | **Carts** | One-to-Many | User can have multiple cart items |
| **Users** | 1:N | **Wishes** | One-to-Many | User can have multiple wishlist items |
| **Users** | 1:N | **Invoices** | One-to-Many | User can have multiple orders |
| **Users** | 1:N | **Reviews** | One-to-Many | User can write multiple reviews |
| **Products** | N:1 | **Categories** | Many-to-One | Products belong to categories |
| **Products** | N:1 | **Brands** | Many-to-One | Products belong to brands |
| **Products** | 1:N | **Details** | One-to-Many | Product can have detailed info |
| **Products** | 1:N | **Features** | One-to-Many | Product can have multiple features |
| **Products** | 1:N | **Reviews** | One-to-Many | Product can have multiple reviews |
| **Products** | 1:N | **Carts** | One-to-Many | Product can be in multiple carts |
| **Products** | 1:N | **Wishes** | One-to-Many | Product can be in multiple wishlists |
| **Products** | 1:N | **Invoice_Products** | One-to-Many | Product can be in multiple orders |
| **Invoices** | 1:N | **Invoice_Products** | One-to-Many | Order contains multiple items |

---

## Key Constraints & Business Rules

### Primary Keys
- All entities have `_id` as ObjectId (MongoDB default)

### Foreign Keys
- `userID` references Users._id
- `productID` references Products._id
- `categoryID` references Categories._id
- `brandID` references Brands._id
- `invoiceID` references Invoices._id

### Unique Constraints
- Users.email (unique)
- Invoices.tran_id (unique transaction ID)
- Invoices.val_id (unique validation ID)

### Business Logic Constraints
1. **Stock Management**
   - Products.stock >= 0 (no negative inventory)
   - Stock validated before adding to cart
   - Stock deducted atomically after invoice creation
   - Stock restored on payment failure/cancellation

2. **Order Processing**
   - Invoice total calculated on backend
   - Cart cleared after successful order
   - Payment status tracked (pending → success/failed/cancelled)
   - Delivery status tracked (pending → shipped → delivered)

3. **Role-Based Access**
   - Users.role: 'admin' or 'customer' (default: customer)
   - Admin can: CRUD products, update stock, manage orders
   - Customer can: cart operations, place orders, reviews

4. **Data Integrity**
   - MongoDB transactions ensure atomicity
   - Invoice creation + stock deduction = atomic operation
   - Rollback on failure prevents data inconsistency

---

## Database Indexes (Recommended)

```javascript
// Users
users.createIndex({ email: 1 }, { unique: true })
users.createIndex({ role: 1 })

// Products
products.createIndex({ categoryID: 1 })
products.createIndex({ brandID: 1 })
products.createIndex({ remark: 1 })
products.createIndex({ title: "text", shortDes: "text" }) // Text search

// Carts
carts.createIndex({ userID: 1 })
carts.createIndex({ productID: 1 })

// Invoices
invoices.createIndex({ userID: 1 })
invoices.createIndex({ tran_id: 1 }, { unique: true })
invoices.createIndex({ payment_status: 1 })
invoices.createIndex({ delivery_status: 1 })

// Invoice Products
invoiceProducts.createIndex({ invoiceID: 1 })
invoiceProducts.createIndex({ productID: 1 })
invoiceProducts.createIndex({ userID: 1 })

// Reviews
reviews.createIndex({ productID: 1 })
reviews.createIndex({ userID: 1 })
```

---

## Cardinality Summary

| Entity | Records (Estimated) |
|--------|---------------------|
| Users | 10,000+ |
| Profiles | 10,000+ (1:1 with users) |
| Products | 1,000 - 5,000 |
| Categories | 10 - 50 |
| Brands | 50 - 200 |
| Carts | Variable (active sessions) |
| Invoices | 50,000+ |
| Invoice_Products | 100,000+ |
| Reviews | 20,000+ |
| Wishes | 30,000+ |

---

## Transaction Flow Example

```
Customer Places Order:
┌─────────────────────────────────────────────────────────┐
│ 1. START TRANSACTION                                    │
│ 2. Read Cart Items (with session)                      │
│ 3. Validate Stock Availability (with session)          │
│ 4. Calculate Total + VAT (backend)                     │
│ 5. Create Invoice (with session)                       │
│ 6. Create Invoice Products (with session)              │
│ 7. Deduct Stock (with session)                         │
│ 8. Clear Cart (with session)                           │
│ 9. COMMIT TRANSACTION                                   │
│                                                          │
│ On Error: ROLLBACK (restore everything)                │
└─────────────────────────────────────────────────────────┘
```

---

Generated on: February 10, 2026
Project: Mini E-Commerce API
Database: MongoDB
ORM: Mongoose

