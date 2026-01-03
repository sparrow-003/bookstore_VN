# BookStore - Setup & Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser

## Installation

### 1. Clone/Download Project
```bash
git clone [repository-url]
cd bookstore
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Quick Start

### Login as Admin
1. Navigate to http://localhost:3000/login
2. Click "Demo Accounts" section
3. Click "Admin" button to auto-fill credentials
4. Review credentials:
   - Email: `alex@007`
   - Password: `alex@007`
5. Click "Sign In"

### Access Admin Dashboard
- URL: http://localhost:3000/admin
- Features:
  - View all statistics
  - Manage users
  - Review seller applications
  - Monitor books and inventory
  - Track orders and revenue

### Test Seller Workflow

#### As Customer:
1. Go to `/register`
2. Create new account (role: Customer)
3. Browse books at `/books`
4. Add to cart and checkout

#### As Seller:
1. Go to `/register`
2. Switch to "Become a Seller" tab
3. Fill seller application form
4. Submit application
5. Wait for admin approval at `/admin/applications`
6. Once approved, access `/seller` dashboard

### Test Seller Approval Process
1. Log in as Admin
2. Go to `/admin/applications`
3. Review pending seller applications
4. Click "Approve" to grant seller access
5. Approved seller can now:
   - Access `/seller` dashboard
   - List books at `/seller/books`
   - Upload digital books (PDFs)
   - Track sales and revenue

## Key Features to Test

### User Management (`/admin/users`)
- [x] View all users
- [x] Filter by role
- [x] Search users
- [x] Change user role
- [x] Ban/unban users
- [x] Delete user accounts

### Seller Applications (`/admin/applications`)
- [x] View pending applications
- [x] Approve sellers (converts to seller role)
- [x] Reject with feedback
- [x] View approved sellers

### Book Listing (`/seller/books`)
- [x] Add physical books with inventory
- [x] Add digital books (upload PDF)
- [x] Edit book details
- [x] Delete books
- [x] Track stock levels

### Customer Features
- [x] Browse books by category
- [x] Search books
- [x] View book details
- [x] Leave reviews and ratings (after purchase)
- [x] Add to cart
- [x] Checkout
- [x] View order history

### Analytics
- [x] Admin dashboard with stats
- [x] Seller performance metrics
- [x] Time-based comparisons (week/month/year)
- [x] Revenue tracking
- [x] Order monitoring

## File Structure

```
bookstore/
├── app/
│   ├── page.jsx                 # Home page
│   ├── layout.jsx               # Root layout
│   ├── login/page.jsx           # Login page
│   ├── register/page.jsx        # Registration page
│   ├── books/
│   │   ├── page.jsx             # Books listing
│   │   └── [id]/page.jsx        # Book details
│   ├── cart/page.jsx            # Shopping cart
│   ├── checkout/page.jsx        # Checkout
│   ├── orders/page.jsx          # Order history
│   ├── admin/
│   │   ├── page.jsx             # Admin dashboard
│   │   ├── users/page.jsx       # User management
│   │   ├── sellers/page.jsx     # Seller management
│   │   ├── applications/page.jsx# Seller applications
│   │   ├── books/page.jsx       # Book management
│   │   └── orders/page.jsx      # Order management
│   ├── seller/
│   │   ├── page.jsx             # Seller dashboard
│   │   ├── books/page.jsx       # Seller's books
│   │   ├── orders/page.jsx      # Seller's orders
│   │   └── earnings/page.jsx    # Earnings tracking
│   ├── api/
│   │   ├── auth/                # Authentication endpoints
│   │   ├── books/               # Book CRUD endpoints
│   │   ├── users/               # User management endpoints
│   │   ├── orders/              # Order endpoints
│   │   ├── reviews/             # Review endpoints
│   │   ├── stats/               # Analytics endpoints
│   │   └── seller/              # Seller-specific endpoints
│   └── globals.css              # Global styles
├── components/                  # Reusable components
│   ├── header.jsx
│   ├── footer.jsx
│   ├── book-card.jsx
│   ├── reviews/
│   ├── dashboard/
│   └── ui/                      # shadcn/ui components
├── context/                     # React contexts
│   ├── auth-context.jsx
│   └── cart-context.jsx
├── hooks/                       # Custom hooks
│   ├── use-books.js
│   ├── use-orders.js
│   └── use-stats.js
├── server/                      # Backend logic
│   ├── db/                      # Database
│   ├── models/                  # Data models
│   ├── controllers/             # Business logic
│   └── middleware/              # Custom middleware
└── public/                      # Static assets
    └── images/                  # Book covers
```

## Database Structure

All data is stored in JavaScript objects (in-memory database for demo).

**To persist data in production:**
1. Replace with MongoDB, PostgreSQL, or Firebase
2. Update server/db/index.js to use real database
3. Implement proper authentication with JWT
4. Add environment variables for sensitive data

## Customization

### Change Admin Credentials
Edit `server/db/index.js` and update the default users array:
```javascript
let users = [
  {
    id: "1",
    email: "your-email@example.com",  // Change this
    password: "your-password",         // Change this
    name: "Your Name",
    role: "admin",
    // ... rest of admin object
  },
  // ... other users
]
```

### Add Categories
Edit `server/db/index.js` and modify genres array:
```javascript
const genres = [
  { id: "new-category", name: "New Category", description: "...", icon: "..." },
  // ... existing categories
]
```

### Customize Styling
- Edit `app/globals.css` for global styles
- Edit `tailwind.config.js` for Tailwind configuration
- Modify component files in `components/` for individual styles

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies Installation Error
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database Reset
The in-memory database resets when you stop the server. To preserve data:
1. Implement real database integration
2. Or manually back up the `server/db/index.js` data

## Next Steps

1. **Add Payment Processing:**
   - Integrate Stripe or PayPal
   - Implement checkout flow

2. **Email Notifications:**
   - Setup email service (SendGrid, Mailgun)
   - Send order confirmations
   - Send seller application updates

3. **File Storage:**
   - Upload PDFs to cloud (AWS S3, Google Cloud)
   - Store book images on CDN

4. **Real Database:**
   - Migrate to MongoDB, PostgreSQL, or Firebase
   - Implement proper authentication
   - Add data validation and security

5. **Deployment:**
   - Deploy to Vercel, Netlify, or your own server
   - Configure environment variables
   - Set up monitoring and analytics

## Support

For issues or questions:
1. Check the PRODUCTION_GUIDE.md
2. Review API documentation in PRODUCTION_GUIDE.md
3. Check browser console for error messages
4. Review server logs in terminal
