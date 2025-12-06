# BookStore - Full-Stack E-Commerce Platform

A production-grade online bookstore application built with Next.js 15, featuring a complete MVC architecture, role-based access control, and dynamic data management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [API Reference](#api-reference)
- [Demo Accounts](#demo-accounts)
- [Contributing](#contributing)
- [License](#license)

## Overview

BookStore is a comprehensive e-commerce platform designed for buying and selling books online. It supports three user roles (User, Seller, Admin) with distinct dashboards and capabilities. The application follows the Model-View-Controller (MVC) architectural pattern for clean separation of concerns and maintainability.

## Features

### Customer Features
- Browse and search books by title, author, or category
- Filter and sort books by price, rating, and category
- View detailed book information with reviews
- Add books to cart and wishlist
- Secure checkout process
- Order tracking and history
- User profile management

### Seller Features
- Dedicated seller dashboard
- Add, edit, and delete book listings
- Inventory management with low-stock alerts
- Order fulfillment and tracking
- Earnings overview and analytics
- Customer order management

### Admin Features
- Complete system oversight
- User and seller management
- Book catalog management
- Order management and status updates
- Inventory monitoring
- Platform statistics and analytics

## Architecture

The application follows the **Model-View-Controller (MVC)** pattern:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │   Context/Hooks     │  │
│  │  (Views)    │  │    (UI)     │  │  (State Management) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTES LAYER                        │
│              (Next.js Route Handlers - /api/*)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│  │    Auth      │ │    Book      │ │       Order          │ │
│  │  Controller  │ │  Controller  │ │     Controller       │ │
│  └──────────────┘ └──────────────┘ └──────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       MODEL LAYER                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │   User   │ │   Book   │ │  Order   │ │    Review      │  │
│  │  Model   │ │  Model   │ │  Model   │ │    Model       │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Advantages of MVC Architecture

1. **Separation of Concerns** - Each layer has clearly defined responsibilities
2. **Scalability** - Easy to add new features by creating new routes, controllers, and models
3. **Reusability** - Logic in controllers and models can be reused across the application
4. **Testing** - Each layer can be tested independently
5. **Collaboration** - Multiple developers can work on different layers simultaneously

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript/JSX |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| State Management | React Context + SWR |
| Data Fetching | SWR (stale-while-revalidate) |
| Icons | Lucide React |
| Architecture | MVC Pattern |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/bookstore.git
cd bookstore
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
bookstore/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard pages
│   │   ├── books/
│   │   ├── orders/
│   │   ├── sellers/
│   │   ├── users/
│   │   └── inventory/
│   ├── seller/                   # Seller dashboard pages
│   │   ├── books/
│   │   ├── orders/
│   │   ├── inventory/
│   │   └── earnings/
│   ├── api/                      # API route handlers
│   │   ├── auth/
│   │   ├── books/
│   │   ├── orders/
│   │   ├── users/
│   │   ├── reviews/
│   │   └── stats/
│   ├── books/                    # Book browsing pages
│   ├── cart/                     # Shopping cart
│   ├── checkout/                 # Checkout flow
│   ├── categories/               # Category pages
│   ├── login/                    # Authentication
│   ├── orders/                   # Order history
│   └── profile/                  # User profile
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard/                # Dashboard components
│   ├── forms/                    # Form components
│   └── reviews/                  # Review components
├── context/                      # React Context providers
│   ├── auth-context.jsx
│   └── cart-context.jsx
├── hooks/                        # Custom React hooks (SWR)
│   ├── use-books.js
│   ├── use-orders.js
│   ├── use-stats.js
│   ├── use-users.js
│   └── use-categories.js
├── server/                       # Server-side code (MVC)
│   ├── controllers/              # Business logic
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── order.controller.js
│   │   ├── user.controller.js
│   │   └── stats.controller.js
│   └── models/                   # Data models
│       ├── user.model.js
│       ├── book.model.js
│       ├── order.model.js
│       ├── review.model.js
│       ├── category.model.js
│       └── wishlist.model.js
├── lib/                          # Utility functions
└── public/                       # Static assets
\`\`\`

## User Roles

### 1. Customer (User)
- **Registration** - Create account with email and password
- **Profile Management** - Update personal information
- **Book Browsing** - Explore books, search, and filter
- **Shopping** - Add to cart, checkout, and track orders
- **Reviews** - Leave ratings and reviews for purchased books

### 2. Seller
- **Registration** - Create seller account with business details
- **Book Listing** - Add new books with details (title, author, price, etc.)
- **Inventory Management** - Track stock levels and restock
- **Order Fulfillment** - Process and ship customer orders
- **Analytics** - View earnings and sales performance

### 3. Admin
- **System Management** - Oversee all platform operations
- **User Management** - Create, update, or delete user accounts
- **Seller Management** - Approve and manage seller accounts
- **Book Management** - Full control over book catalog
- **Order Oversight** - Monitor all platform orders

## API Reference

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/register` | POST | User registration |

### Books
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/books` | GET | Get all books (with filters) |
| `/api/books` | POST | Create new book (seller/admin) |
| `/api/books/[id]` | GET | Get book by ID |
| `/api/books/[id]` | PUT | Update book |
| `/api/books/[id]` | DELETE | Delete book |

### Orders
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | GET | Get orders (filtered by user/seller) |
| `/api/orders` | POST | Create new order |
| `/api/orders/[id]` | GET | Get order by ID |
| `/api/orders/[id]` | PUT | Update order status |

### Users
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | Get all users (admin) |
| `/api/users/[id]` | GET | Get user by ID |
| `/api/users/[id]` | PUT | Update user |
| `/api/users/[id]` | DELETE | Delete user (admin) |

### Statistics
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stats` | GET | Get platform statistics |

## Demo Accounts

Use these credentials to explore different roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bookstore.com | admin123 |
| Seller | seller@bookstore.com | seller123 |
| Customer | user@example.com | user123 |

## Key Features Explained

### Dynamic Data Fetching with SWR
The application uses SWR (stale-while-revalidate) for efficient data fetching:
- Automatic caching and revalidation
- Real-time updates without manual refresh
- Optimistic UI updates
- Error handling and loading states

### Role-Based Access Control
- Protected routes based on user role
- Automatic redirection for unauthorized access
- Role-specific dashboards and features
- Server-side authorization in API routes

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with Next.js and shadcn/ui
