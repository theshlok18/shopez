# ShopEZ - One Stop Shop for Online Purchases

A complete, production-ready full-stack e-commerce application built with Spring Boot and React.

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Hibernate (JPA)
- MySQL
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router
- Context API

## Features

### Authentication & Authorization
- User registration and login
- JWT access tokens with refresh token mechanism
- Role-based access control (ADMIN, USER)
- BCrypt password hashing

### Product Management
- Browse products with pagination
- Search by name
- Filter by category
- Product details page
- Admin: Add, update, delete products
- Image support

### Shopping Cart
- Add items to cart
- Update quantities
- Remove items
- Persistent cart in database
- Prevents duplicate entries

### Order System
- Checkout process
- Order history
- Order status tracking (Placed, Processing, Shipped, Delivered)
- Stock validation
- Payment simulation

### Admin Dashboard
- User statistics
- Product management
- Order management
- Revenue tracking
- Monthly revenue chart data

## Project Structure

```
shopez-backend/
├── src/main/java/com/shopez/
│   ├── config/          # Security, CORS configuration
│   ├── controller/      # REST controllers
│   ├── dto/            # Data transfer objects
│   ├── entity/         # JPA entities
│   ├── exception/      # Exception handling
│   ├── filter/         # JWT authentication filter
│   ├── repository/     # JPA repositories
│   ├── security/       # Security components
│   └── service/        # Business logic
├── database/
│   ├── schema.sql      # Database schema
│   └── demo-data.sql   # Sample data
└── Dockerfile

shopez-frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── config/         # API configuration
│   ├── context/        # React context providers
│   └── pages/          # Page components
├── Dockerfile
└── nginx.conf
```

## Database Schema

- users
- roles
- user_roles
- refresh_tokens
- categories
- products
- carts
- cart_items
- orders
- order_items
- payments

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- POST `/api/auth/refresh` - Refresh access token

### Products
- GET `/api/products` - Get all products (with filters)
- GET `/api/products/{id}` - Get product by ID

### Categories
- GET `/api/categories` - Get all categories

### Cart (Protected)
- GET `/api/cart` - Get user cart
- POST `/api/cart/items` - Add item to cart
- PUT `/api/cart/items/{itemId}` - Update cart item
- DELETE `/api/cart/items/{itemId}` - Remove from cart

### Orders (Protected)
- POST `/api/orders/checkout` - Place order
- GET `/api/orders` - Get user orders
- GET `/api/orders/{orderId}` - Get order details

### Admin (Admin Only)
- GET `/api/admin/dashboard` - Dashboard statistics
- POST `/api/admin/products` - Create product
- PUT `/api/admin/products/{id}` - Update product
- DELETE `/api/admin/products/{id}` - Delete product
- PUT `/api/admin/orders/{orderId}/status` - Update order status

## Local Development

### Prerequisites
- Java 17
- Node.js 18+
- MySQL 8.0+
- Maven

### Backend Setup

1. Create MySQL database:
```sql
CREATE DATABASE shopez_db;
```

2. Run schema and demo data:
```bash
mysql -u root -p shopez_db < shopez-backend/database/schema.sql
mysql -u root -p shopez_db < shopez-backend/database/demo-data.sql
```

3. Configure environment variables in `application.properties` or set them:
```
DB_URL=jdbc:mysql://localhost:3306/shopez_db
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your-256-bit-secret-key
```

4. Run backend:
```bash
cd shopez-backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

1. Install dependencies:
```bash
cd shopez-frontend
npm install
```

2. Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:8080
```

3. Run frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Demo Credentials

### Admin Users
- Email: `admin@shopez.com` / Password: `password123`
- Email: `sarah.admin@shopez.com` / Password: `password123`

### Regular Users
- Email: `john.doe@email.com` / Password: `password123`
- Email: `emma.wilson@email.com` / Password: `password123`

## Docker Deployment

### Build Images

Backend:
```bash
cd shopez-backend
docker build -t shopez-backend .
```

Frontend:
```bash
cd shopez-frontend
docker build -t shopez-frontend .
```

### Run with Docker

Backend:
```bash
docker run -p 8080:8080 \
  -e DB_URL=jdbc:mysql://host.docker.internal:3306/shopez_db \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=password \
  -e JWT_SECRET=your-secret-key \
  shopez-backend
```

Frontend:
```bash
docker run -p 80:80 shopez-frontend
```

## Render Deployment

### Backend Deployment

1. Create new Web Service on Render
2. Connect your repository
3. Configure:
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/*.jar`
   - Environment: Docker or Native
4. Add environment variables:
   - `DB_URL` - Your MySQL connection string
   - `DB_USERNAME` - Database username
   - `DB_PASSWORD` - Database password
   - `JWT_SECRET` - Strong secret key (256-bit)
   - `CORS_ORIGINS` - Your frontend URL

### Frontend Deployment

1. Create new Static Site on Render
2. Connect your repository
3. Configure:
   - Build Command: `cd shopez-frontend && npm install && npm run build`
   - Publish Directory: `shopez-frontend/dist`
4. Add environment variable:
   - `VITE_API_BASE_URL` - Your backend URL

### Database Setup on Render

1. Create MySQL database on Render or use external provider
2. Run schema.sql and demo-data.sql scripts
3. Update backend DB_URL with connection string

## Environment Variables

### Backend
- `PORT` - Server port (default: 8080)
- `DB_URL` - MySQL connection URL
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret (256-bit)
- `CORS_ORIGINS` - Allowed origins (comma-separated)

### Frontend
- `VITE_API_BASE_URL` - Backend API URL

## Production Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Update CORS_ORIGINS to production domain
- [ ] Configure production database
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Review security settings

## Sample Request/Response

### Register User
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "555-0100",
  "address": "123 Main St"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "uuid...",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["ROLE_USER"]
  }
}
```

### Add to Cart
```json
POST /api/cart/items
Authorization: Bearer {accessToken}
{
  "productId": 1,
  "quantity": 2
}

Response:
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

### Checkout
```json
POST /api/orders/checkout
Authorization: Bearer {accessToken}
{
  "shippingAddress": "123 Main St, City, State 12345",
  "phone": "555-0100",
  "paymentMethod": "Credit Card"
}

Response:
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "totalAmount": 179.98,
    "status": "PROCESSING",
    "items": [...],
    "payment": {...}
  }
}
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
