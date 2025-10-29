# Guldoze - Handmade Crochet E-commerce Website

A modern, animated e-commerce website for a handmade crochet brand with full backend functionality.

## Features

- Beautiful animated frontend with GSAP ScrollTrigger animations
- Responsive design that works on all devices
- Product catalog with filtering capabilities
- Product detail modal with comprehensive information
- Shopping cart functionality
- Order management system
- RESTful API for all e-commerce operations

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- GSAP (GreenSock Animation Platform) for smooth animations
- Responsive design with mobile-first approach

### Backend
- Node.js with Express.js framework
- RESTful API architecture
- JSON data storage (in a production environment, this would be replaced with a database)

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured/true` - Get featured products

### Cart
- `GET /api/cart/:userId` - Get cart items for a user
- `POST /api/cart/:userId/add` - Add item to cart
- `DELETE /api/cart/:userId/remove/:productId` - Remove item from cart
- `PUT /api/cart/:userId/update/:productId` - Update item quantity
- `DELETE /api/cart/:userId/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create a new order
- `GET /api/orders/:userId` - Get orders for a user
- `GET /api/orders/:userId/:orderId` - Get a specific order
- `PUT /api/orders/:userId/:orderId/status` - Update order status

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Visit `http://localhost:3000` in your browser

## Development

- Frontend files are located in the `frontend/` directory
- Backend API routes are in the `backend/routes/` directory
- Product data is stored in `data/products.json`

## Product Data Structure

Each product in the catalog has the following properties:
- `id`: Unique identifier
- `name`: Product name
- `price`: Price in USD
- `category`: Product category (keychains, pouches, decor)
- `description`: Detailed product description
- `materials`: Materials used
- `dimensions`: Product dimensions
- `careInstructions`: Care instructions
- `stock`: Available quantity
- `image`: Image path
- `featured`: Boolean indicating if it's a featured product

## Customization

To customize the website:
1. Update product information in `data/products.json`
2. Modify styles in `frontend/css/style.css`
3. Update content in `frontend/index.html`
4. Extend functionality in `frontend/js/main.js`

## Support

For support, please contact the development team or open an issue on the repository.