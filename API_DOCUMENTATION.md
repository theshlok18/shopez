# ShopEZ API Documentation

Complete API reference for ShopEZ backend.

Base URL: `http://localhost:8080` (development) or your deployed URL

## Authentication

Most endpoints require JWT authentication. Include the access token in the Authorization header:

```
Authorization: Bearer {accessToken}
```

## Response Format

All responses follow this structure:

```json
{
  "success": true/false,
  "message": "Description",
  "data": {} // Response data
}
```

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "555-0100",
  "address": "123 Main St, City, State 12345"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "550e8400-e29b-41d4-a716-446655440000",
    "tokenType": "Bearer",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["ROLE_USER"]
  }
}
```

**Validation:**
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Full Name: Required

---

### Login

Authenticate user and receive tokens.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "550e8400-e29b-41d4-a716-446655440000",
    "tokenType": "Bearer",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["ROLE_USER"]
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Refresh Token

Get new access token using refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "550e8400-e29b-41d4-a716-446655440000",
    "tokenType": "Bearer",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["ROLE_USER"]
  }
}
```

---

## Product Endpoints

### Get All Products

Retrieve products with filtering, searching, and pagination.

**Endpoint:** `GET /api/products`

**Query Parameters:**
- `search` (optional): Search by product name
- `categoryId` (optional): Filter by category ID
- `page` (optional, default: 0): Page number
- `size` (optional, default: 12): Items per page
- `sortBy` (optional, default: createdAt): Sort field
- `sortDir` (optional, default: DESC): Sort direction (ASC/DESC)

**Example:** `GET /api/products?search=laptop&categoryId=1&page=0&size=12`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Products retrieved",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Wireless Bluetooth Headphones",
        "description": "Premium noise-cancelling headphones",
        "price": 89.99,
        "stock": 45,
        "imageUrl": "https://example.com/image.jpg",
        "categoryId": 1,
        "categoryName": "Electronics",
        "active": true,
        "createdAt": "2026-01-15T10:30:00",
        "updatedAt": "2026-01-15T10:30:00"
      }
    ],
    "totalPages": 5,
    "totalElements": 50,
    "size": 12,
    "number": 0
  }
}
```

---

### Get Product by ID

Retrieve single product details.

**Endpoint:** `GET /api/products/{id}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Product retrieved",
  "data": {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "description": "Premium noise-cancelling headphones with 30-hour battery life",
    "price": 89.99,
    "stock": 45,
    "imageUrl": "https://example.com/image.jpg",
    "categoryId": 1,
    "categoryName": "Electronics",
    "active": true,
    "createdAt": "2026-01-15T10:30:00",
    "updatedAt": "2026-01-15T10:30:00"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Category Endpoints

### Get All Categories

Retrieve all product categories.

**Endpoint:** `GET /api/categories`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Categories retrieved",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Latest gadgets and electronic devices"
    },
    {
      "id": 2,
      "name": "Clothing",
      "description": "Fashion and apparel for all occasions"
    }
  ]
}
```

---

## Cart Endpoints (Protected)

All cart endpoints require authentication.

### Get Cart

Retrieve user's shopping cart.

**Endpoint:** `GET /api/cart`

**Headers:** `Authorization: Bearer {accessToken}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Cart retrieved",
  "data": {
    "id": 1,
    "items": [
      {
        "id": 1,
        "productId": 1,
        "productName": "Wireless Bluetooth Headphones",
        "productImage": "https://example.com/image.jpg",
        "price": 89.99,
        "quantity": 2,
        "subtotal": 179.98,
        "availableStock": 45
      }
    ],
    "totalAmount": 179.98,
    "totalItems": 2
  }
}
```

---

### Add to Cart

Add product to cart or update quantity if already exists.

**Endpoint:** `POST /api/cart/items`

**Headers:** `Authorization: Bearer {accessToken}`

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "id": 1,
    "items": [...],
    "totalAmount": 179.98,
    "totalItems": 2
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Insufficient stock"
}
```

---

### Update Cart Item

Update quantity of cart item.

**Endpoint:** `PUT /api/cart/items/{itemId}`

**Headers:** `Authorization: Bearer {accessToken}`

**Query Parameters:**
- `quantity`: New quantity (if 0 or negative, item is removed)

**Example:** `PUT /api/cart/items/1?quantity=3`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Cart updated",
  "data": {
    "id": 1,
    "items": [...],
    "totalAmount": 269.97,
    "totalItems": 3
  }
}
```

---

### Remove from Cart

Remove item from cart.

**Endpoint:** `DELETE /api/cart/items/{itemId}`

**Headers:** `Authorization: Bearer {accessToken}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Item removed",
  "data": {
    "id": 1,
    "items": [],
    "totalAmount": 0,
    "totalItems": 0
  }
}
```

---

## Order Endpoints (Protected)

### Checkout

Place order from cart items.

**Endpoint:** `POST /api/orders/checkout`

**Headers:** `Authorization: Bearer {accessToken}`

**Request Body:**
```json
{
  "shippingAddress": "123 Main St, City, State 12345",
  "phone": "555-0100",
  "paymentMethod": "Credit Card"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "totalAmount": 179.98,
    "status": "PROCESSING",
    "shippingAddress": "123 Main St, City, State 12345",
    "phone": "555-0100",
    "items": [
      {
        "id": 1,
        "productId": 1,
        "productName": "Wireless Bluetooth Headphones",
        "productImage": "https://example.com/image.jpg",
        "quantity": 2,
        "price": 89.99,
        "subtotal": 179.98
      }
    ],
    "payment": {
      "id": 1,
      "amount": 179.98,
      "status": "SUCCESS",
      "paymentMethod": "Credit Card",
      "transactionId": "TXN1705315800000",
      "createdAt": "2026-02-24T10:30:00"
    },
    "createdAt": "2026-02-24T10:30:00"
  }
}
```

**Error Responses:**

`400 Bad Request` - Cart is empty
```json
{
  "success": false,
  "message": "Cart is empty"
}
```

`400 Bad Request` - Insufficient stock
```json
{
  "success": false,
  "message": "Insufficient stock for Wireless Bluetooth Headphones"
}
```

`400 Bad Request` - Payment failed
```json
{
  "success": false,
  "message": "Payment failed"
}
```

---

### Get User Orders

Retrieve user's order history with pagination.

**Endpoint:** `GET /api/orders`

**Headers:** `Authorization: Bearer {accessToken}`

**Query Parameters:**
- `page` (optional, default: 0): Page number
- `size` (optional, default: 10): Items per page

**Example:** `GET /api/orders?page=0&size=10`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Orders retrieved",
  "data": {
    "content": [
      {
        "id": 1,
        "totalAmount": 179.98,
        "status": "DELIVERED",
        "shippingAddress": "123 Main St, City, State 12345",
        "phone": "555-0100",
        "items": [...],
        "payment": {...},
        "createdAt": "2026-02-24T10:30:00"
      }
    ],
    "totalPages": 2,
    "totalElements": 15,
    "size": 10,
    "number": 0
  }
}
```

---

### Get Order by ID

Retrieve specific order details.

**Endpoint:** `GET /api/orders/{orderId}`

**Headers:** `Authorization: Bearer {accessToken}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Order retrieved",
  "data": {
    "id": 1,
    "totalAmount": 179.98,
    "status": "DELIVERED",
    "shippingAddress": "123 Main St, City, State 12345",
    "phone": "555-0100",
    "items": [
      {
        "id": 1,
        "productId": 1,
        "productName": "Wireless Bluetooth Headphones",
        "productImage": "https://example.com/image.jpg",
        "quantity": 2,
        "price": 89.99,
        "subtotal": 179.98
      }
    ],
    "payment": {
      "id": 1,
      "amount": 179.98,
      "status": "SUCCESS",
      "paymentMethod": "Credit Card",
      "transactionId": "TXN1705315800000",
      "createdAt": "2026-02-24T10:30:00"
    },
    "createdAt": "2026-02-24T10:30:00"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Order does not belong to user"
}
```

---

## Admin Endpoints (Admin Only)

All admin endpoints require ROLE_ADMIN.

### Get Dashboard Statistics

Retrieve admin dashboard statistics.

**Endpoint:** `GET /api/admin/dashboard`

**Headers:** `Authorization: Bearer {accessToken}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Dashboard stats retrieved",
  "data": {
    "totalUsers": 150,
    "totalProducts": 50,
    "totalOrders": 320,
    "totalRevenue": 45678.90,
    "monthlyRevenue": [
      {
        "month": 1,
        "revenue": 5000.00
      },
      {
        "month": 2,
        "revenue": 7500.50
      }
    ]
  }
}
```

---

### Create Product

Add new product to catalog.

**Endpoint:** `POST /api/admin/products`

**Headers:** `Authorization: Bearer {accessToken}`

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "imageUrl": "https://example.com/image.jpg",
  "categoryId": 1
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Product created",
  "data": {
    "id": 17,
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "stock": 50,
    "imageUrl": "https://example.com/image.jpg",
    "categoryId": 1,
    "categoryName": "Electronics",
    "active": true,
    "createdAt": "2026-02-24T10:30:00",
    "updatedAt": "2026-02-24T10:30:00"
  }
}
```

**Validation Errors:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "name": "Product name is required",
    "price": "Price must be greater than 0"
  }
}
```

---

### Update Product

Update existing product.

**Endpoint:** `PUT /api/admin/products/{id}`

**Headers:** `Authorization: Bearer {accessToken}`

**Request Body:**
```json
{
  "name": "Updated Product",
  "description": "Updated description",
  "price": 109.99,
  "stock": 60,
  "imageUrl": "https://example.com/new-image.jpg",
  "categoryId": 1
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Product updated",
  "data": {
    "id": 1,
    "name": "Updated Product",
    "description": "Updated description",
    "price": 109.99,
    "stock": 60,
    "imageUrl": "https://example.com/new-image.jpg",
    "categoryId": 1,
    "categoryName": "Electronics",
    "active": true,
    "createdAt": "2026-01-15T10:30:00",
    "updatedAt": "2026-02-24T10:30:00"
  }
}
```

---

### Delete Product

Soft delete product (sets active to false).

**Endpoint:** `DELETE /api/admin/products/{id}`

**Headers:** `Authorization: Bearer {accessToken}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Product deleted"
}
```

---

### Update Order Status

Update order status.

**Endpoint:** `PUT /api/admin/orders/{orderId}/status`

**Headers:** `Authorization: Bearer {accessToken}`

**Query Parameters:**
- `status`: New status (PLACED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)

**Example:** `PUT /api/admin/orders/1/status?status=SHIPPED`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Order status updated"
}
```

---

## Error Responses

### 400 Bad Request
Invalid request data or business logic error.

```json
{
  "success": false,
  "message": "Error description"
}
```

### 401 Unauthorized
Missing or invalid authentication token.

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 403 Forbidden
Insufficient permissions.

```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found
Resource not found.

```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Internal Server Error
Server error.

```json
{
  "success": false,
  "message": "An error occurred: ..."
}
```

---

## Order Status Flow

1. **PLACED** - Order created, payment pending
2. **PROCESSING** - Payment successful, preparing order
3. **SHIPPED** - Order dispatched
4. **DELIVERED** - Order delivered to customer
5. **CANCELLED** - Order cancelled

---

## Payment Simulation

The payment system simulates real payment processing:
- 90% success rate
- Generates transaction ID
- On failure, restores product stock
- On success, clears cart and updates order status

---

## Rate Limiting

Consider implementing rate limiting in production:
- Authentication endpoints: 5 requests/minute
- API endpoints: 100 requests/minute
- Admin endpoints: 50 requests/minute

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:8080/api/products
```

### Add to Cart
```bash
curl -X POST http://localhost:8080/api/cart/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
```

---

## Postman Collection

Import this base URL and configure environment variables:
- `baseUrl`: http://localhost:8080
- `accessToken`: (set after login)

Create requests for each endpoint using the documentation above.
