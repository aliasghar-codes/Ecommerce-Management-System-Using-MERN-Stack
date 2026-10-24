# E-Commerce Management System

An online store built with the MERN stack. Customers can sign up, browse products, fill a cart, place orders and leave reviews. Admins get their own panel to manage products, categories, coupons, orders and messages.

There is no online payment yet. Orders are Cash on Delivery for now.

<!--
Add screenshots here once you have them, for example:
![Home page](./screenshots/home.png)
![Admin dashboard](./screenshots/dashboard.png)
-->

## Contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [How it works](#how-it-works)
- [Folder structure](#folder-structure)
- [Getting started](#getting-started)
- [API routes](#api-routes)
- [Database models](#database-models)
- [Auth and security](#auth-and-security)
- [Orders and payments](#orders-and-payments)
- [What was tested](#what-was-tested)
- [Known limits](#known-limits)
- [Future plans](#future-plans)
- [License](#license)
- [Author](#author)

## About

I built this to make a working store, not just a page that lists products. The React frontend talks to an Express API. The API checks who the user is, then reads and writes data in MongoDB.

The idea was to cover the full shopping flow from sign up to placing an order, and to give the store owner a panel to run things from.

## Features

### Customer side

- Register, log in and log out
- Home page sections, product list and product detail page
- Related products on the detail page
- Browse products by category
- Search by product name
- Search by category name
- Cart: add items, view the cart, update it, remove one item or clear everything
- Order form and order placement
- Reviews with a 1 to 5 rating and text. One review per user for each product
- Contact form for logged-in users

### Admin side

- Separate admin login and registration
- Dashboard with:
  - total registered users
  - pending orders
  - total products
  - messages
  - active coupons
  - total sales from completed orders
- Products: add with multiple images, list and delete
- Categories: create, list and delete
- Coupons: create with a code, discount percentage, start date and end date. List and delete
- Orders: view all orders and change the status (pending, shipped, completed or canceled)
- Messages: view customer messages and delete one or many

### Product details

Each product stores a name, description, price, quantity, category, size, gender, colors and images.

## Tech stack

| Part | Tools |
| --- | --- |
| Frontend | React, Vite, Redux Toolkit, React Router, Axios, Tailwind CSS, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT stored in HTTP-only cookies, bcrypt for passwords |

What each one is used for:

| Tool | Use |
| --- | --- |
| MongoDB | Stores users, products, categories, carts, orders, coupons, reviews and messages |
| Mongoose | Schemas and database queries |
| Express.js | REST API |
| Node.js | Runs the server |
| React | Customer site and admin panel |
| Redux Toolkit | App state, including login state |
| React Router | Page routing and protected routes |
| Axios | Requests from the frontend to the backend |
| Tailwind CSS | Styling |
| JWT | Access tokens for users and admins |
| bcrypt | Password hashing |
| React Toastify | Success and error messages |
| Vite | Dev server and build tool for the frontend |

## How it works

```
React (Vite)  -->  Express API (/api/v1)  -->  MongoDB
```

The frontend sends requests to the API. The API checks the token where needed, does the work, and saves or reads data through Mongoose.

The backend keeps a separate route file for each area: users, admins, products, categories, contacts, dashboard, coupons, reviews, cart and orders.

### Shopping flow

1. The customer opens the site.
2. They register or log in.
3. Products load from the API.
4. They search, browse or open a product.
5. They add products to the cart.
6. They check the cart and fill in the order form.
7. The API creates the order and saves it in MongoDB.
8. The admin sees the order in the admin panel.
9. The admin updates the status as the order moves along.

## Folder structure

```
.
├── backend/       Express API: routes, models, middleware
├── frontend/      React app: customer site and admin panel
├── Report.pdf     Short project report
├── LICENSE
└── README.md
```

## Getting started

### What you need

- Node.js and npm
- A MongoDB database (local or MongoDB Atlas)
- Git

### 1. Clone the repo

```bash
git clone https://github.com/aliasghar-codes/Ecommerce-Management-System-Using-MERN-Stack.git
cd Ecommerce-Management-System-Using-MERN-Stack
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local address in the terminal. It is usually `http://localhost:5173`.

Make sure the frontend points to the address your backend is running on.

### 4. Build the frontend for production

```bash
cd frontend
npm run build
```

### 5. Create an admin account

Admin login and registration are separate from the customer ones. Register an admin from the admin registration page, then log in through the admin login.

## API routes

All routes start with `/api/v1`.

| Route | What it does |
| --- | --- |
| `/api/v1/user` | Customer register, login and logout |
| `/api/v1/admin` | Admin login and registration |
| `/api/v1/product` | Create, delete, list, search and view products |
| `/api/v1/category` | Create, list and delete categories |
| `/api/v1/dashboard` | Numbers for the admin dashboard |
| `/api/v1/coupon` | Create, list and delete coupons |
| `/api/v1/review` | Product reviews |
| `/api/v1/cart` | Cart actions |
| `/api/v1/bill` | Create orders, list orders and update order status |
| `/api/v1/contact` | Customer messages and admin message management |

Cart actions, reviews and order creation need a logged-in user. Admin routes need a logged-in admin.

## Database models

| Model | What it stores |
| --- | --- |
| User | Username, email, hashed password, role, timestamps |
| Product | Name, description, price, category, quantity, size, gender, colors, images |
| Category | Category info |
| Cart | The user's cart and the products in it |
| Order | Customer details, products, total amount, payment method, status, timestamps |
| Coupon | Code, discount percentage, start date, end date |
| Review | User, product, name, rating, review text |
| Contact | Messages sent by logged-in users |

## Auth and security

- Passwords are hashed with bcrypt before they go into the database.
- Login gives the user a JWT.
- The token is kept in a cookie that is HTTP-only, secure and SameSite Strict.
- Auth middleware protects cart actions, reviews and order creation.
- A separate admin middleware protects the admin routes.
- Secrets like the database connection and token settings live in environment variables. Do not commit your `.env` file.

## Orders and payments

Placing an order saves the customer details, the selected products, the total and the payment method. The order model has a `paymentMethod` field and its default is Cash on Delivery.

No online payment service is connected. There is no Stripe, PayPal, JazzCash, Easypaisa or anything similar in this version.

After an order is placed, the admin can change its status to pending, shipped, completed or canceled.

## What was tested

I checked the main customer and admin flows.

| Area | What should happen |
| --- | --- |
| Registration | A new account is created. A duplicate email is rejected |
| Login | Right credentials log in. Wrong ones are rejected |
| Product search | Searching by product name or category name returns matching products |
| Cart | Items can be added, updated, removed and cleared |
| Reviews | A 1 to 5 rating and text can be added. A second review on the same product is blocked |
| Orders | A valid order is saved with customer, product and total info |
| Admin products | Admin can add, list and delete products |
| Admin orders | Admin can view orders and change their status |
| Coupons | Admin can create, view and delete coupons |
| Messages | Customers can send messages. Admin can manage them |

There are no automated tests yet.

## Known limits

- No online payment.
- No delivery service connection.
- No email notifications.
- No live order tracking.
- The dashboard shows counts and sales totals. It is not a full analytics tool.

## Future plans

- Add an online payment option that works for the target market
- Wishlist and saved products
- Order history page for customers and clearer order tracking
- Email or SMS updates when an order changes
- Sales charts, filters and date ranges on the dashboard
- Better validation, automated tests and rate limiting
- Deploy the frontend, backend and database with proper production settings

## License

MIT. See the [LICENSE](./LICENSE) file.

## Author

Ali Asghar

GitHub: [aliasghar-codes](https://github.com/aliasghar-codes)
