// In-memory database simulation for the bookstore
// In production, this would connect to MongoDB, PostgreSQL, etc.

let users = [
  {
    id: "1",
    email: "admin@bookstore.com",
    password: "admin123", // In production, this would be hashed
    name: "Admin User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "organizer@bookstore.com",
    password: "organizer123",
    name: "Book Organizer",
    role: "organizer",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    email: "user@example.com",
    password: "user123",
    name: "John Doe",
    role: "user",
    createdAt: "2024-02-01T00:00:00Z",
  },
]

let books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 14.99,
    originalPrice: 19.99,
    category: "fiction",
    rating: 4.5,
    reviews: 2847,
    description: "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.",
    image: "/the-great-gatsby-classic-book-cover-elegant.jpg",
    inStock: true,
    quantity: 50,
    featured: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 18.99,
    originalPrice: 24.99,
    category: "non-fiction",
    rating: 4.7,
    reviews: 5621,
    description: "A groundbreaking narrative of humanity's creation and evolution.",
    image: "/sapiens-book-cover-human-evolution.jpg",
    inStock: true,
    quantity: 35,
    featured: true,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: 16.99,
    originalPrice: 22.99,
    category: "science",
    rating: 4.6,
    reviews: 3892,
    description: "A landmark volume in science writing exploring the mysteries of the universe.",
    image: "/a-brief-history-of-time-space-cosmos-book.jpg",
    inStock: true,
    quantity: 25,
    featured: true,
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 12.99,
    originalPrice: 16.99,
    category: "romance",
    rating: 4.8,
    reviews: 7234,
    description: "The beloved story of Elizabeth Bennet and Mr. Darcy.",
    image: "/pride-and-prejudice-classic-romance-book-cover.jpg",
    inStock: true,
    quantity: 40,
    featured: true,
    createdAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 15.99,
    originalPrice: 19.99,
    category: "children",
    rating: 4.9,
    reviews: 12456,
    description: "The magical adventure that started it all.",
    image: "/harry-potter-magical-wizard-book-cover.jpg",
    inStock: true,
    quantity: 100,
    featured: true,
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    price: 14.99,
    originalPrice: 18.99,
    category: "mystery",
    rating: 4.4,
    reviews: 4521,
    description: "A gripping mystery thriller that will keep you on the edge.",
    image: "/girl-with-dragon-tattoo-mystery-thriller-book.jpg",
    inStock: true,
    quantity: 30,
    featured: false,
    createdAt: "2024-01-06T00:00:00Z",
  },
]

let orders = [
  {
    id: "ORD-001",
    userId: "3",
    items: [
      { bookId: "1", title: "The Great Gatsby", quantity: 1, price: 14.99 },
      { bookId: "5", title: "Harry Potter", quantity: 2, price: 15.99 },
    ],
    total: 46.97,
    status: "delivered",
    shippingAddress: { name: "John Doe", address: "123 Main St", city: "New York", zip: "10001" },
    createdAt: "2024-02-10T10:00:00Z",
  },
]

const reviews = [
  {
    id: "1",
    bookId: "1",
    userId: "3",
    userName: "John Doe",
    rating: 5,
    comment: "A timeless classic that never gets old!",
    createdAt: "2024-02-15T10:00:00Z",
  },
]

const categories = [
  { id: "fiction", name: "Fiction", description: "Explore imaginative stories and novels" },
  { id: "non-fiction", name: "Non-Fiction", description: "Discover real-world knowledge" },
  { id: "science", name: "Science", description: "Dive into scientific discoveries" },
  { id: "romance", name: "Romance", description: "Fall in love with heartwarming tales" },
  { id: "children", name: "Children's", description: "Magical stories for young readers" },
  { id: "mystery", name: "Mystery", description: "Unravel thrilling puzzles" },
  { id: "biography", name: "Biography", description: "Inspiring life stories" },
  { id: "history", name: "History", description: "Journey through the ages" },
]

// Database helper functions
export const db = {
  // Users
  getUsers: () => users,
  getUserById: (id) => users.find((u) => u.id === id),
  getUserByEmail: (email) => users.find((u) => u.email === email),
  createUser: (user) => {
    const newUser = { ...user, id: Date.now().toString(), createdAt: new Date().toISOString() }
    users.push(newUser)
    return newUser
  },
  updateUser: (id, data) => {
    users = users.map((u) => (u.id === id ? { ...u, ...data } : u))
    return users.find((u) => u.id === id)
  },
  deleteUser: (id) => {
    users = users.filter((u) => u.id !== id)
  },

  // Books
  getBooks: () => books,
  getBookById: (id) => books.find((b) => b.id === id),
  getBooksByCategory: (category) => books.filter((b) => b.category === category),
  getFeaturedBooks: () => books.filter((b) => b.featured),
  searchBooks: (query) => {
    const q = query.toLowerCase()
    return books.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
  },
  createBook: (book) => {
    const newBook = { ...book, id: Date.now().toString(), createdAt: new Date().toISOString(), reviews: 0, rating: 0 }
    books.push(newBook)
    return newBook
  },
  updateBook: (id, data) => {
    books = books.map((b) => (b.id === id ? { ...b, ...data } : b))
    return books.find((b) => b.id === id)
  },
  deleteBook: (id) => {
    books = books.filter((b) => b.id !== id)
  },

  // Orders
  getOrders: () => orders,
  getOrderById: (id) => orders.find((o) => o.id === id),
  getOrdersByUserId: (userId) => orders.filter((o) => o.userId === userId),
  createOrder: (order) => {
    const newOrder = { ...order, id: `ORD-${Date.now()}`, createdAt: new Date().toISOString(), status: "pending" }
    orders.push(newOrder)
    return newOrder
  },
  updateOrder: (id, data) => {
    orders = orders.map((o) => (o.id === id ? { ...o, ...data } : o))
    return orders.find((o) => o.id === id)
  },

  // Reviews
  getReviews: () => reviews,
  getReviewsByBookId: (bookId) => reviews.filter((r) => r.bookId === bookId),
  createReview: (review) => {
    const newReview = { ...review, id: Date.now().toString(), createdAt: new Date().toISOString() }
    reviews.push(newReview)
    // Update book rating
    const bookReviews = reviews.filter((r) => r.bookId === review.bookId)
    const avgRating = bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
    db.updateBook(review.bookId, { rating: Math.round(avgRating * 10) / 10, reviews: bookReviews.length })
    return newReview
  },

  // Categories
  getCategories: () => categories,
  getCategoryById: (id) => categories.find((c) => c.id === id),

  // Stats
  getStats: () => ({
    totalBooks: books.length,
    totalUsers: users.filter((u) => u.role === "user").length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    lowStockBooks: books.filter((b) => b.quantity < 10).length,
  }),
}
