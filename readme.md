# E-commerce Website API

This is the back-end API for an e-commerce website, providing endpoints for managing users, products, orders, and more. Built with Node.js, Express, and MongoDB, the API handles all necessary CRUD operations efficiently.

## Features

- **User Authentication**: Sign-up, login, and token-based authentication.
- **Product Management**: Add, edit, delete, and view products.
- **Order Management**: Create, view, and manage customer orders.
- **Cart Functionality**: Add to cart, view cart, and remove items.
- **Category & Review Management**: Support for product categories and customer reviews.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **MongoDB**: NoSQL database for efficient, scalable data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: JSON Web Tokens for user authentication.
- **Bcrypt.js**: For password hashing.

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/azdinserhani/E-commerce-website-Api.git
    ```

2. **Install dependencies:**

    ```bash
    cd E-commerce-website-Api
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5000`.

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user and get a token

### Product Routes
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Order Routes
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get details of a specific order

### Cart Routes
- `POST /api/cart` - Add item to the cart
- `GET /api/cart` - View the cart
- `DELETE /api/cart/:id` - Remove an item from the cart

## Future Enhancements

- Integration with payment gateways.
- Enhanced security features (2FA, etc.).
- Admin panel for product and order management.
