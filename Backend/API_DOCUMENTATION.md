# API Documentation

## Overview

This is a comprehensive REST API for a Food Delivery application built with Express.js and MongoDB. The API provides endpoints for user management, food items, shopping cart, and order management.

---

## Base URL

- **Development:** `http://localhost:4000`
- **Production:** `https://api.yourdomain.com`

---

## Authentication

The API uses **JWT (JSON Web Token)** for authentication.

### Getting a Token

1. Register a new user with the `/api/user/register` endpoint
2. Login with credentials using `/api/user/login` endpoint
3. The response will contain a JWT token
4. Include the token in the `Authorization` header: `Bearer YOUR_TOKEN`

### Example Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Response Format

### Success Response (2xx)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "123456",
    "name": "Pizza Margherita",
    "price": 12.99
  }
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (only in development)"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## API Endpoints

### 1. User Endpoints

#### Register User
```
POST /api/user/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```
POST /api/user/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get User Profile
```
GET /api/user/profile
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "phone": "1234567890",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

### 2. Food Endpoints

#### Get All Food Items
```
GET /api/food/list
Query Parameters:
  - category: optional - filter by food category
  - search: optional - search by food name
  - page: optional - pagination page (default: 1)
  - limit: optional - items per page (default: 10)

Response:
{
  "success": true,
  "message": "Food items retrieved successfully",
  "data": [
    {
      "foodId": "507f1f77bcf86cd799439011",
      "name": "Pizza Margherita",
      "description": "Classic pizza with tomato and basil",
      "category": "pizza",
      "price": 12.99,
      "image": "http://localhost:4000/image/pizza.jpg",
      "rating": 4.5,
      "isAvailable": true
    }
  ]
}
```

#### Add Food Item (Admin Only)
```
POST /api/food/add
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

Form Data:
  - name: string (required)
  - description: string (required)
  - category: string (required) - pizza, burger, salad, etc.
  - price: number (required) - min: 0.01
  - image: file (required) - max 5MB, allowed types: jpeg, png, gif, webp
  - isAvailable: boolean (optional, default: true)

Response:
{
  "success": true,
  "message": "Food item added successfully",
  "data": {
    "foodId": "507f1f77bcf86cd799439011",
    "name": "Pizza Margherita",
    "price": 12.99,
    "image": "http://localhost:4000/image/pizza.jpg"
  }
}
```

#### Update Food Item (Admin Only)
```
PUT /api/food/{foodId}
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

Form Data:
  - name: string (optional)
  - description: string (optional)
  - price: number (optional)
  - category: string (optional)
  - image: file (optional) - max 5MB
  - isAvailable: boolean (optional)

Response:
{
  "success": true,
  "message": "Food item updated successfully",
  "data": { updated food object }
}
```

#### Delete Food Item (Admin Only)
```
DELETE /api/food/{foodId}
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "message": "Food item deleted successfully"
}
```

---

### 3. Cart Endpoints

#### Get User Cart
```
GET /api/cart
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Cart retrieved successfully",
  "data": {
    "cartId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "foodId": "507f1f77bcf86cd799439013",
        "name": "Pizza Margherita",
        "price": 12.99,
        "quantity": 2,
        "subtotal": 25.98
      }
    ],
    "total": 25.98,
    "itemCount": 2
  }
}
```

#### Add Item to Cart
```
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "foodId": "507f1f77bcf86cd799439013",
  "quantity": 2
}

Response:
{
  "success": true,
  "message": "Item added to cart",
  "data": { updated cart }
}
```

#### Remove Item from Cart
```
PUT /api/cart/remove
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "foodId": "507f1f77bcf86cd799439013"
}

Response:
{
  "success": true,
  "message": "Item removed from cart",
  "data": { updated cart }
}
```

#### Update Item Quantity
```
PUT /api/cart/update
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "foodId": "507f1f77bcf86cd799439013",
  "quantity": 5
}

Response:
{
  "success": true,
  "message": "Item quantity updated",
  "data": { updated cart }
}
```

---

### 4. Order Endpoints

#### Place New Order
```
POST /api/order/place
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "foodId": "507f1f77bcf86cd799439013",
      "quantity": 2,
      "price": 12.99
    }
  ],
  "totalAmount": 25.98,
  "deliveryAddress": "123 Main St, City, State 12345",
  "phone": "1234567890",
  "paymentMethod": "stripe" // or "cash"
}

Response:
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439012",
    "items": [...],
    "totalAmount": 25.98,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get User Orders
```
GET /api/order/list
Authorization: Bearer {token}
Query Parameters:
  - page: optional - pagination page
  - limit: optional - items per page

Response:
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "orderId": "507f1f77bcf86cd799439014",
      "totalAmount": 25.98,
      "status": "delivered",
      "createdAt": "2024-01-01T00:00:00Z",
      "items": [...]
    }
  ]
}
```

#### Get All Orders (Admin Only)
```
GET /api/order/all
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "message": "All orders retrieved",
  "data": [...]
}
```

#### Update Order Status (Admin Only)
```
PUT /api/order/status
Authorization: Bearer {admin_token}
Content-Type: application/json

Request Body:
{
  "orderId": "507f1f77bcf86cd799439014",
  "status": "confirmed" // pending, confirmed, preparing, out_for_delivery, delivered, cancelled
}

Response:
{
  "success": true,
  "message": "Order status updated",
  "data": { updated order }
}
```

---

## Error Handling

### Common Error Codes

#### 400 - Bad Request
```json
{
  "success": false,
  "message": "Invalid input",
  "error": "Email is required"
}
```

#### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access",
  "error": "Invalid or missing token"
}
```

#### 404 - Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "error": "Food item with ID not found"
}
```

#### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

**Coming Soon:** Rate limiting will be implemented to prevent abuse.

Current limits (recommended for production):
- 100 requests per 15 minutes per IP
- 1000 requests per hour per API key

---

## Webhooks

### Stripe Webhook

For payment confirmations, configure Stripe webhook to send events to:
```
POST /api/webhook/stripe
```

Events handled:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

---

## Best Practices

1. **Always include the JWT token** in the Authorization header for protected endpoints
2. **Use HTTPS** in production
3. **Cache responses** where appropriate
4. **Implement pagination** for large data sets
5. **Handle errors gracefully** on the client side
6. **Use query parameters** for filtering and sorting
7. **Keep request payloads small** for better performance

---

## Testing Endpoints

### Using cURL

```bash
# Register user
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login user
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get food list
curl -X GET http://localhost:4000/api/food/list

# Get user profile (requires token)
curl -X GET http://localhost:4000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import the Postman collection (if available)
2. Set environment variables (base_url, token)
3. Use pre-configured requests for each endpoint

---

## Support

For API issues or questions:
- Check this documentation
- Review error messages carefully
- Check server logs
- Contact the development team

---

**Last Updated:** May 2024  
**API Version:** 1.0.0  
