# BookStore - Production Deployment Guide

## Overview
BookStore is a full-stack MERN-style application built with Next.js that provides:
- Multi-role user system (Admin, Seller, Customer)
- Seller application approval workflow
- Physical and digital (PDF) book management
- Advanced analytics and performance tracking
- Comprehensive admin dashboard
- Order and review management

## Default Admin Account
**Username:** alex@007  
**Password:** alex@007

Use this account to:
- Access the admin dashboard at `/admin`
- Manage users, sellers, and books
- Approve seller applications
- View analytics and performance metrics

## System Architecture

### User Roles

#### 1. **Admin** (alex@007)
- Full system access
- Manage all users and sellers
- Approve/reject seller applications
- View comprehensive analytics
- Control book listings
- Ban/unban users

#### 2. **Seller**
- Requires application approval
- List physical and digital books
- Upload PDF files for digital books
- Track sales and revenue
- Monitor performance metrics
- Compare statistics (month/year)

#### 3. **Customer**
- Create account freely
- Browse and purchase books
- Leave reviews and ratings
- View order history
- Manage wishlist

## Seller Application Workflow

### Step 1: Register as Seller
1. Go to `/register`
2. Click "Become a Seller"
3. Fill in personal and business details:
   - Full name and email
   - Business name and contact info
   - Business address
   - Tax ID and bank account

### Step 2: Wait for Approval
- Application status shows at `/seller-application-pending`
- Admin reviews at `/admin/applications`
- Expected approval time: 2-3 business days

### Step 3: Access Seller Dashboard
Once approved:
- Navigate to `/seller`
- Access full seller features:
  - List books
  - Upload digital content
  - Track orders and revenue
  - View performance metrics
  - Compare data by time period

## Book Listing Guide

### Physical Books
When listing physical books, provide:
- **Title & Author** - Book identification
- **Price** - Selling price
- **Original Price** (optional) - For discount display
- **Category** - Genre classification
- **Format** - Hardcover, Paperback, Audiobook
- **Condition** - New, Like New, Good, Fair
- **Quantity** - Available stock count
- **Binding, Pages, Publisher** - Book details
- **ISBN** - International Standard Book Number
- **Language** - Book language
- **Description** - Detailed synopsis

### Digital Books (PDF)
For digital books:
- All basic details same as physical
- Upload PDF file (maximum file size: 50MB recommended)
- Set unlimited quantity (handled automatically)
- Price per digital license
- No shipping required
- No inventory management needed

## Admin Dashboard Features

### Key Metrics
- **Total Users:** All registered customers
- **Total Sellers:** Approved seller accounts
- **Total Books:** Combined physical + digital listings
- **Total Orders:** Completed transactions
- **Total Revenue:** Sum of all sales
- **Low Stock Alert:** Books with < 10 units

### Management Sections

#### Users (`/admin/users`)
- View all customer accounts
- Change user roles (Customer → Organizer → Admin)
- Delete user accounts
- Search and filter users

#### Sellers (`/admin/sellers`)
- Manage seller accounts
- View ratings and statistics
- Suspend/activate seller accounts
- Monitor seller performance

#### Seller Applications (`/admin/applications`)
- Review pending applications
- Approve sellers (grants `/seller` access)
- Reject with feedback (sent to applicant)
- View approval history

#### Books (`/admin/books`)
- View all listed books
- Filter by physical/digital type
- Check inventory levels
- Monitor low-stock items

#### Orders (`/admin/orders`)
- Track all orders
- Update order status
- Monitor payment processing
- View order history

## Seller Dashboard Features

### Analytics
- **Revenue Tracking** - Total earnings
- **Order Management** - Sales count
- **Book Statistics** - Listings breakdown
- **Performance Metrics** - Ratings and reviews

### Time-Based Comparisons
Compare performance across:
- **This Week** - 7-day period
- **This Month** - 30-day period  
- **This Year** - 365-day period

View charts showing:
- Revenue trends over time
- Sales by category
- Performance comparisons

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new account
- `POST /api/auth/seller-application` - Submit seller application

### Books
- `GET /api/books` - Fetch all books
- `GET /api/books/[id]` - Get book details
- `POST /api/books` - Create new book (seller)
- `PUT /api/books/[id]` - Update book (seller)
- `DELETE /api/books/[id]` - Delete book (seller)
- `POST /api/books/upload-pdf` - Upload digital book PDF

### Users
- `GET /api/users` - List all users (admin)
- `GET /api/users?role=seller` - Filter by role
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user (admin)

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/[id]` - Order details
- `POST /api/orders` - Create order
- `PUT /api/orders/[id]` - Update order status

### Reviews
- `GET /api/reviews?bookId=[id]` - Get book reviews
- `POST /api/reviews` - Submit review

### Admin & Analytics
- `GET /api/stats` - Admin dashboard stats
- `GET /api/seller/stats` - Seller analytics
- `GET /api/auth/seller-application` - View applications
- `PATCH /api/auth/seller-application` - Approve/reject application

## Database Schema

### Users Collection
\`\`\`javascript
{
  id: string,
  email: string,
  password: string,
  name: string,
  role: "admin" | "seller" | "user",
  businessName?: string,
  phone: string,
  address: string,
  avatar?: string,
  isBanned: boolean,
  isActive: boolean,
  createdAt: date
}
\`\`\`

### Books Collection
\`\`\`javascript
{
  id: string,
  title: string,
  author: string,
  price: number,
  originalPrice: number,
  category: string,
  description: string,
  image: string,
  bookType: "physical" | "digital",
  quantity: number,
  rating: number,
  reviewCount: number,
  isbn?: string,
  pages?: number,
  publisher?: string,
  inStock: boolean,
  featured: boolean,
  listingQuestions: {
    format?: string,
    condition?: string,
    binding?: string,
    language: string
  },
  pdf?: string (PDF URL for digital books),
  createdAt: date
}
\`\`\`

### Orders Collection
\`\`\`javascript
{
  id: string,
  userId: string,
  items: [
    { bookId, title, quantity, price }
  ],
  subtotal: number,
  shipping: number,
  tax: number,
  total: number,
  status: "pending" | "shipped" | "delivered",
  paymentMethod: string,
  shippingAddress: object,
  createdAt: date,
  updatedAt: date
}
\`\`\`

## Security Considerations

### Production Checklist
- [ ] Replace default admin credentials
- [ ] Implement JWT token authentication
- [ ] Add rate limiting to API routes
- [ ] Implement proper CORS configuration
- [ ] Use environment variables for sensitive data
- [ ] Add SSL/TLS encryption
- [ ] Implement input validation and sanitization
- [ ] Add request logging and monitoring
- [ ] Set up database backups
- [ ] Implement password hashing (bcrypt)

### Data Protection
- All passwords stored in plain text (DEMO ONLY - use bcrypt in production)
- PDF uploads should be virus-scanned
- Implement file size limits (50MB suggested)
- Store PDFs in secure cloud storage (S3, Google Cloud)
- Add watermarking for digital books
- Implement download limits for PDFs

## Deployment Steps

### 1. Environment Setup
\`\`\`bash
npm install
export ADMIN_EMAIL=your-email@example.com
export DATABASE_URL=your-database-url
\`\`\`

### 2. Build
\`\`\`bash
npm run build
\`\`\`

### 3. Start Server
\`\`\`bash
npm start
\`\`\`

### 4. Verify
- Check `/admin` login
- Test user registration at `/register`
- Verify seller application at `/admin/applications`
- Test book listing at `/seller/books`

## Performance Optimization

- Implement pagination for large datasets
- Add caching for book listings
- Optimize image storage with CDN
- Use database indexing
- Implement lazy loading for reviews
- Compress PDF files before storage

## Maintenance

### Daily
- Monitor error logs
- Check pending seller applications
- Verify payment processing

### Weekly
- Review low-stock alerts
- Check user reports
- Analyze sales trends

### Monthly
- Database optimization
- Security audit
- Performance review
- Backup verification

## Support & Troubleshooting

### Common Issues

**Login fails with "User not found"**
- Verify email address is correct
- Check if account has been created
- Reset password if forgotten

**Seller application stuck in pending**
- Admin must review at `/admin/applications`
- Check email for application status
- Contact admin if delayed beyond 3 days

**PDF upload fails**
- Check file size (< 50MB)
- Verify PDF format is valid
- Ensure proper permissions

**Low stock alerts not showing**
- Check inventory quantity
- Refresh dashboard
- Verify book status is active

## Future Enhancements

- [ ] Payment gateway integration (Stripe)
- [ ] Email notifications
- [ ] Seller analytics charts
- [ ] Digital rights management
- [ ] Subscription plans
- [ ] Book recommendations
- [ ] Advanced search filters
- [ ] Wishlist features
- [ ] User social profiles
- [ ] Book club integration
