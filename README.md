
# 📚 BookStore — Full-Stack E-Commerce Platform  
> A production-ready, role-driven online bookstore built with Next.js 15 & modern web architecture

🚀 BookStore is a scalable, real-world full-stack e-commerce application designed to simulate how modern online marketplaces actually work.  
It features clean MVC architecture, role-based dashboards, and dynamic data handling — perfect for production use, learning, and portfolio showcasing.

---

## ✨ Why This Project Stands Out

✔️ Built like a real SaaS product  
✔️ Clean MVC architecture  
✔️ Multiple user roles with real permissions  
✔️ Scalable folder structure  
✔️ Modern UI with great UX  
✔️ Portfolio & recruiter friendly  

---

## 📖 Table of Contents

- Overview  
- Core Features  
- Architecture  
- Tech Stack  
- Getting Started  
- Project Structure  
- User Roles  
- API Reference  
- Demo Accounts  
- Advanced Concepts  
- Contributing  
- License  

---

## 🌍 Overview

BookStore is a complete online bookstore platform where:

- Customers discover and purchase books  
- Sellers manage listings, inventory, and earnings  
- Admins control the entire ecosystem  

The app follows real enterprise patterns for maintainability and scalability.

---

## 🔥 Core Features

### 👤 Customer
- Browse books by title, author, or category  
- Filter & sort results  
- Wishlist & cart  
- Secure checkout  
- Order tracking  
- Reviews & ratings  

### 🧑‍💼 Seller
- Seller dashboard  
- Manage books & inventory  
- Process orders  
- Earnings analytics  

### 🛡️ Admin
- User & seller management  
- Book catalog control  
- Order monitoring  
- Platform analytics  

---

## 🧠 Architecture

This project follows the MVC pattern:

Client (Pages & UI)  
↓  
API Routes (Next.js App Router)  
↓  
Controllers (Business Logic)  
↓  
Models (Data Layer)

### Benefits
- Separation of concerns  
- Easy scalability  
- Cleaner debugging  
- Team-friendly structure  

---

## 🧰 Tech Stack

- Next.js 15 (App Router)  
- JavaScript / JSX  
- Tailwind CSS v4  
- shadcn/ui  
- React Context  
- SWR  
- Lucide Icons  
- MVC Architecture  

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+  
- npm / yarn / pnpm  

### Installation

```bash
git clone https://github.com/yourusername/bookstore.git
cd bookstore
npm install
````

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```text
bookstore/
├── app/
├── components/
├── context/
├── hooks/
├── server/
│   ├── controllers/
│   └── models/
├── lib/
└── public/
```

---

## 👥 User Roles

### Customer

* Browse & buy books
* Track orders
* Leave reviews

### Seller

* Manage inventory
* Fulfill orders
* View earnings

### Admin

* Platform oversight
* Manage users & sellers
* Control catalog

---

## 🔌 API Reference

### Authentication

* POST /api/auth/login
* POST /api/auth/register

### Books

* GET /api/books
* POST /api/books
* GET /api/books/[id]
* PUT /api/books/[id]
* DELETE /api/books/[id]

### Orders

* GET /api/orders
* POST /api/orders
* GET /api/orders/[id]
* PUT /api/orders/[id]

---

## 🧪 Demo Accounts

| Role   | Email                                               | Password  |
| ------ | --------------------------------------------------- | --------- |
| Admin  | [admin@bookstore.com](mailto:admin@bookstore.com)   | admin123  |
| Seller | [seller@bookstore.com](mailto:seller@bookstore.com) | seller123 |
| User   | [user@example.com](mailto:user@example.com)         | user123   |

---

## 🚀 Advanced Concepts

* SWR (stale-while-revalidate)
* Optimistic UI
* Role-based access control
* Protected routes
* Scalable MVC backend
* Mobile-first design

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ Built with Next.js & shadcn/ui
⭐ Designed for real-world scalabil
