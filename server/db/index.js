// ==================================================
// SERVER DATABASE - Main database module with all entities
// ==================================================

// ==================== USERS ====================
let users = [
  {
    id: "1",
    email: "admin@bookstore.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    avatar: null,
    phone: "+1 234 567 890",
    address: "123 Admin Street, NY",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "organizer@bookstore.com",
    password: "organizer123",
    name: "Book Organizer",
    role: "organizer",
    avatar: null,
    phone: "+1 234 567 891",
    address: "456 Organizer Ave, CA",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    email: "user@example.com",
    password: "user123",
    name: "John Doe",
    role: "user",
    avatar: null,
    phone: "+1 234 567 892",
    address: "789 User Lane, TX",
    createdAt: "2024-02-01T00:00:00Z",
  },
]

// ==================== AUTHORS ====================
const authors = [
  { id: "1", name: "F. Scott Fitzgerald", bio: "American novelist of the Jazz Age", image: null },
  { id: "2", name: "Yuval Noah Harari", bio: "Israeli historian and author", image: null },
  { id: "3", name: "Stephen Hawking", bio: "English theoretical physicist", image: null },
  { id: "4", name: "Jane Austen", bio: "English novelist of manners", image: null },
  { id: "5", name: "J.K. Rowling", bio: "British author of Harry Potter series", image: null },
  { id: "6", name: "Stieg Larsson", bio: "Swedish journalist and author", image: null },
  { id: "7", name: "Walter Isaacson", bio: "American journalist and biographer", image: null },
  { id: "8", name: "Jared Diamond", bio: "American scientist and author", image: null },
  { id: "9", name: "George Orwell", bio: "English novelist and essayist", image: null },
  { id: "10", name: "Carl Sagan", bio: "American astronomer and author", image: null },
  { id: "11", name: "Nicholas Sparks", bio: "American novelist", image: null },
  { id: "12", name: "E.B. White", bio: "American writer", image: null },
]

// ==================== GENRES (Categories) ====================
const genres = [
  { id: "fiction", name: "Fiction", description: "Explore imaginative stories and novels", icon: "book-open" },
  { id: "non-fiction", name: "Non-Fiction", description: "Discover real-world knowledge", icon: "lightbulb" },
  { id: "science", name: "Science", description: "Dive into scientific discoveries", icon: "flask" },
  { id: "romance", name: "Romance", description: "Fall in love with heartwarming tales", icon: "heart" },
  { id: "children", name: "Children's", description: "Magical stories for young readers", icon: "sparkles" },
  { id: "mystery", name: "Mystery", description: "Unravel thrilling puzzles", icon: "search" },
  { id: "biography", name: "Biography", description: "Inspiring life stories", icon: "user" },
  { id: "history", name: "History", description: "Journey through the ages", icon: "landmark" },
]

// ==================== BOOKS ====================
let books = [
  {
    id: "1",
    title: "The Great Gatsby",
    authorId: "1",
    author: "F. Scott Fitzgerald",
    price: 14.99,
    originalPrice: 19.99,
    category: "fiction",
    genres: ["fiction"],
    rating: 4.5,
    reviewCount: 2847,
    description:
      "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan, set against the backdrop of the Jazz Age.",
    image: "/the-great-gatsby-classic-book-cover-elegant.jpg",
    inStock: true,
    quantity: 50,
    featured: true,
    isbn: "978-0-7432-7356-5",
    pages: 180,
    language: "English",
    publisher: "Scribner",
    publishedDate: "1925-04-10",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Sapiens: A Brief History of Humankind",
    authorId: "2",
    author: "Yuval Noah Harari",
    price: 18.99,
    originalPrice: 24.99,
    category: "non-fiction",
    genres: ["non-fiction", "history"],
    rating: 4.7,
    reviewCount: 5621,
    description:
      "A groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us.",
    image: "/sapiens-book-cover-human-evolution.jpg",
    inStock: true,
    quantity: 35,
    featured: true,
    isbn: "978-0-06-231609-7",
    pages: 443,
    language: "English",
    publisher: "Harper",
    publishedDate: "2014-02-10",
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "A Brief History of Time",
    authorId: "3",
    author: "Stephen Hawking",
    price: 16.99,
    originalPrice: 22.99,
    category: "science",
    genres: ["science", "non-fiction"],
    rating: 4.6,
    reviewCount: 3892,
    description:
      "A landmark volume in science writing exploring the mysteries of the universe, black holes, and the nature of time.",
    image: "/a-brief-history-of-time-space-cosmos-book.jpg",
    inStock: true,
    quantity: 25,
    featured: true,
    isbn: "978-0-553-38016-3",
    pages: 212,
    language: "English",
    publisher: "Bantam",
    publishedDate: "1988-04-01",
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    authorId: "4",
    author: "Jane Austen",
    price: 12.99,
    originalPrice: 16.99,
    category: "romance",
    genres: ["romance", "fiction"],
    rating: 4.8,
    reviewCount: 7234,
    description:
      "The beloved story of Elizabeth Bennet and Mr. Darcy, exploring themes of love, reputation, and class.",
    image: "/pride-and-prejudice-classic-romance-book-cover.jpg",
    inStock: true,
    quantity: 40,
    featured: true,
    isbn: "978-0-14-143951-8",
    pages: 432,
    language: "English",
    publisher: "Penguin Classics",
    publishedDate: "1813-01-28",
    createdAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    title: "Harry Potter and the Sorcerer's Stone",
    authorId: "5",
    author: "J.K. Rowling",
    price: 15.99,
    originalPrice: 19.99,
    category: "children",
    genres: ["children", "fiction"],
    rating: 4.9,
    reviewCount: 12456,
    description:
      "The magical adventure that started it all, following Harry Potter as he discovers his wizarding heritage.",
    image: "/harry-potter-magical-wizard-book-cover.jpg",
    inStock: true,
    quantity: 100,
    featured: true,
    isbn: "978-0-590-35340-3",
    pages: 309,
    language: "English",
    publisher: "Scholastic",
    publishedDate: "1997-06-26",
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    title: "The Girl with the Dragon Tattoo",
    authorId: "6",
    author: "Stieg Larsson",
    price: 14.99,
    originalPrice: 18.99,
    category: "mystery",
    genres: ["mystery", "fiction"],
    rating: 4.4,
    reviewCount: 4521,
    description: "A gripping mystery thriller featuring the enigmatic Lisbeth Salander.",
    image: "/girl-with-dragon-tattoo-mystery-thriller-book.jpg",
    inStock: true,
    quantity: 30,
    featured: false,
    isbn: "978-0-307-47347-9",
    pages: 465,
    language: "English",
    publisher: "Vintage Crime",
    publishedDate: "2005-08-01",
    createdAt: "2024-01-06T00:00:00Z",
  },
  {
    id: "7",
    title: "Steve Jobs",
    authorId: "7",
    author: "Walter Isaacson",
    price: 19.99,
    originalPrice: 25.99,
    category: "biography",
    genres: ["biography", "non-fiction"],
    rating: 4.5,
    reviewCount: 3245,
    description: "The exclusive biography of Apple's legendary co-founder, based on extensive interviews.",
    image: "/steve-jobs-biography-book-cover-apple.jpg",
    inStock: true,
    quantity: 28,
    featured: false,
    isbn: "978-1-4516-4853-9",
    pages: 656,
    language: "English",
    publisher: "Simon & Schuster",
    publishedDate: "2011-10-24",
    createdAt: "2024-01-07T00:00:00Z",
  },
  {
    id: "8",
    title: "Guns, Germs, and Steel",
    authorId: "8",
    author: "Jared Diamond",
    price: 17.99,
    originalPrice: 22.99,
    category: "history",
    genres: ["history", "non-fiction"],
    rating: 4.3,
    reviewCount: 2876,
    description: "A short history of everybody for the last 13,000 years, exploring why some civilizations thrived.",
    image: "/guns-germs-steel-history-civilization-book.jpg",
    inStock: true,
    quantity: 22,
    featured: false,
    isbn: "978-0-393-31755-8",
    pages: 528,
    language: "English",
    publisher: "W. W. Norton",
    publishedDate: "1997-03-01",
    createdAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "9",
    title: "1984",
    authorId: "9",
    author: "George Orwell",
    price: 13.99,
    originalPrice: 17.99,
    category: "fiction",
    genres: ["fiction"],
    rating: 4.7,
    reviewCount: 8934,
    description: "A dystopian masterpiece about surveillance, control, and the corruption of truth.",
    image: "/1984-george-orwell-dystopian-book-cover.jpg",
    inStock: true,
    quantity: 45,
    featured: false,
    isbn: "978-0-452-28423-4",
    pages: 328,
    language: "English",
    publisher: "Signet Classics",
    publishedDate: "1949-06-08",
    createdAt: "2024-01-09T00:00:00Z",
  },
  {
    id: "10",
    title: "Cosmos",
    authorId: "10",
    author: "Carl Sagan",
    price: 21.99,
    originalPrice: 27.99,
    category: "science",
    genres: ["science", "non-fiction"],
    rating: 4.8,
    reviewCount: 4123,
    description: "A personal voyage through the universe, exploring humanity's place in the cosmos.",
    image: "/cosmos-carl-sagan-space-universe-book.jpg",
    inStock: true,
    quantity: 18,
    featured: false,
    isbn: "978-0-345-53943-4",
    pages: 432,
    language: "English",
    publisher: "Ballantine Books",
    publishedDate: "1980-09-28",
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "11",
    title: "The Notebook",
    authorId: "11",
    author: "Nicholas Sparks",
    price: 11.99,
    originalPrice: 14.99,
    category: "romance",
    genres: ["romance", "fiction"],
    rating: 4.4,
    reviewCount: 5678,
    description: "An unforgettable love story that will touch your heart.",
    image: "/the-notebook-romance-love-story-book-cover.jpg",
    inStock: true,
    quantity: 33,
    featured: false,
    isbn: "978-0-446-67632-2",
    pages: 227,
    language: "English",
    publisher: "Grand Central",
    publishedDate: "1996-10-01",
    createdAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "12",
    title: "Charlotte's Web",
    authorId: "12",
    author: "E.B. White",
    price: 9.99,
    originalPrice: 12.99,
    category: "children",
    genres: ["children", "fiction"],
    rating: 4.8,
    reviewCount: 6789,
    description: "The beloved story of friendship between a pig named Wilbur and a spider named Charlotte.",
    image: "/charlottes-web-children-book-farm-animals.jpg",
    inStock: true,
    quantity: 55,
    featured: false,
    isbn: "978-0-06-440055-8",
    pages: 192,
    language: "English",
    publisher: "HarperCollins",
    publishedDate: "1952-10-15",
    createdAt: "2024-01-12T00:00:00Z",
  },
]

// ==================== INVENTORY ====================
let inventory = books.map((book) => ({
  id: `inv-${book.id}`,
  bookId: book.id,
  quantity: book.quantity,
  location: "Warehouse A",
  condition: "new",
  lastRestocked: "2024-01-15T00:00:00Z",
}))

// ==================== ORDERS ====================
let orders = [
  {
    id: "ORD-001",
    userId: "3",
    userName: "John Doe",
    userEmail: "user@example.com",
    items: [
      { bookId: "1", title: "The Great Gatsby", quantity: 1, price: 14.99 },
      { bookId: "5", title: "Harry Potter and the Sorcerer's Stone", quantity: 2, price: 15.99 },
    ],
    subtotal: 46.97,
    shipping: 4.99,
    tax: 3.76,
    total: 55.72,
    status: "delivered",
    paymentMethod: "credit_card",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-02-15T14:30:00Z",
  },
  {
    id: "ORD-002",
    userId: "3",
    userName: "John Doe",
    userEmail: "user@example.com",
    items: [{ bookId: "2", title: "Sapiens", quantity: 1, price: 18.99 }],
    subtotal: 18.99,
    shipping: 4.99,
    tax: 1.52,
    total: 25.5,
    status: "shipped",
    paymentMethod: "paypal",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    createdAt: "2024-03-01T09:15:00Z",
    updatedAt: "2024-03-02T11:00:00Z",
  },
]

// ==================== REVIEWS ====================
let reviews = [
  {
    id: "1",
    bookId: "1",
    userId: "3",
    userName: "John Doe",
    rating: 5,
    title: "Timeless Classic!",
    comment: "A timeless classic that never gets old! Fitzgerald's prose is beautiful and the story is haunting.",
    helpful: 24,
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "2",
    bookId: "5",
    userId: "3",
    userName: "John Doe",
    rating: 5,
    title: "Pure Magic",
    comment: "Absolutely magical! This book sparked my love for reading as a child and still holds up today.",
    helpful: 156,
    createdAt: "2024-02-20T15:30:00Z",
  },
  {
    id: "3",
    bookId: "2",
    userId: "3",
    userName: "John Doe",
    rating: 4,
    title: "Eye-opening perspective",
    comment: "A fascinating look at human history. Some sections are dense but overall very enlightening.",
    helpful: 89,
    createdAt: "2024-03-05T08:45:00Z",
  },
]

// ==================== USER INTERACTIONS (Wishlist, Reading Progress) ====================
let userInteractions = [
  { id: "1", userId: "3", bookId: "3", type: "wishlist", createdAt: "2024-02-01T00:00:00Z" },
  { id: "2", userId: "3", bookId: "9", type: "wishlist", createdAt: "2024-02-05T00:00:00Z" },
  { id: "3", userId: "3", bookId: "1", type: "reading", progress: 100, createdAt: "2024-02-10T00:00:00Z" },
]

// ==================================================
// DATABASE HELPER FUNCTIONS
// ==================================================

export const db = {
  // ---------- USERS ----------
  getUsers: () => users,
  getUserById: (id) => users.find((u) => u.id === id),
  getUserByEmail: (email) => users.find((u) => u.email === email),
  createUser: (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: "user",
      createdAt: new Date().toISOString(),
    }
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

  // ---------- AUTHORS ----------
  getAuthors: () => authors,
  getAuthorById: (id) => authors.find((a) => a.id === id),
  createAuthor: (authorData) => {
    const newAuthor = { ...authorData, id: Date.now().toString() }
    authors.push(newAuthor)
    return newAuthor
  },

  // ---------- GENRES ----------
  getGenres: () => genres,
  getGenreById: (id) => genres.find((g) => g.id === id),

  // ---------- BOOKS ----------
  getBooks: () => books,
  getBookById: (id) => books.find((b) => b.id === id),
  getBooksByCategory: (category) => books.filter((b) => b.category === category),
  getBooksByGenre: (genreId) => books.filter((b) => b.genres.includes(genreId)),
  getBooksByAuthor: (authorId) => books.filter((b) => b.authorId === authorId),
  getFeaturedBooks: () => books.filter((b) => b.featured),
  searchBooks: (query) => {
    const q = query.toLowerCase()
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q),
    )
  },
  createBook: (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      reviewCount: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
    }
    books.push(newBook)
    // Add to inventory
    inventory.push({
      id: `inv-${newBook.id}`,
      bookId: newBook.id,
      quantity: bookData.quantity || 0,
      location: "Warehouse A",
      condition: "new",
      lastRestocked: new Date().toISOString(),
    })
    return newBook
  },
  updateBook: (id, data) => {
    books = books.map((b) => (b.id === id ? { ...b, ...data } : b))
    return books.find((b) => b.id === id)
  },
  deleteBook: (id) => {
    books = books.filter((b) => b.id !== id)
    inventory = inventory.filter((i) => i.bookId !== id)
  },

  // ---------- INVENTORY ----------
  getInventory: () => inventory,
  getInventoryByBookId: (bookId) => inventory.find((i) => i.bookId === bookId),
  updateInventory: (bookId, data) => {
    inventory = inventory.map((i) => (i.bookId === bookId ? { ...i, ...data } : i))
    // Also update book quantity
    if (data.quantity !== undefined) {
      db.updateBook(bookId, { quantity: data.quantity })
    }
    return inventory.find((i) => i.bookId === bookId)
  },
  getLowStockItems: (threshold = 10) => inventory.filter((i) => i.quantity < threshold),

  // ---------- ORDERS ----------
  getOrders: () => orders,
  getOrderById: (id) => orders.find((o) => o.id === id),
  getOrdersByUserId: (userId) => orders.filter((o) => o.userId === userId),
  createOrder: (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    orders.push(newOrder)
    // Update inventory
    orderData.items.forEach((item) => {
      const inv = inventory.find((i) => i.bookId === item.bookId)
      if (inv) {
        db.updateInventory(item.bookId, { quantity: inv.quantity - item.quantity })
      }
    })
    return newOrder
  },
  updateOrder: (id, data) => {
    orders = orders.map((o) => (o.id === id ? { ...o, ...data, updatedAt: new Date().toISOString() } : o))
    return orders.find((o) => o.id === id)
  },

  // ---------- REVIEWS ----------
  getReviews: () => reviews,
  getReviewsByBookId: (bookId) => reviews.filter((r) => r.bookId === bookId),
  getReviewsByUserId: (userId) => reviews.filter((r) => r.userId === userId),
  createReview: (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now().toString(),
      helpful: 0,
      createdAt: new Date().toISOString(),
    }
    reviews.push(newReview)
    // Update book rating
    const bookReviews = reviews.filter((r) => r.bookId === reviewData.bookId)
    const avgRating = bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
    db.updateBook(reviewData.bookId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: bookReviews.length,
    })
    return newReview
  },
  markReviewHelpful: (reviewId) => {
    reviews = reviews.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    return reviews.find((r) => r.id === reviewId)
  },

  // ---------- USER INTERACTIONS ----------
  getUserInteractions: (userId) => userInteractions.filter((i) => i.userId === userId),
  getUserWishlist: (userId) => {
    const wishlistIds = userInteractions
      .filter((i) => i.userId === userId && i.type === "wishlist")
      .map((i) => i.bookId)
    return books.filter((b) => wishlistIds.includes(b.id))
  },
  addToWishlist: (userId, bookId) => {
    const existing = userInteractions.find((i) => i.userId === userId && i.bookId === bookId && i.type === "wishlist")
    if (!existing) {
      userInteractions.push({
        id: Date.now().toString(),
        userId,
        bookId,
        type: "wishlist",
        createdAt: new Date().toISOString(),
      })
    }
  },
  removeFromWishlist: (userId, bookId) => {
    userInteractions = userInteractions.filter(
      (i) => !(i.userId === userId && i.bookId === bookId && i.type === "wishlist"),
    )
  },

  // ---------- STATS ----------
  getStats: () => ({
    totalBooks: books.length,
    totalUsers: users.filter((u) => u.role === "user").length,
    totalOrganizers: users.filter((u) => u.role === "organizer").length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    lowStockBooks: inventory.filter((i) => i.quantity < 10).length,
    totalReviews: reviews.length,
    categoryCounts: genres.map((g) => ({
      id: g.id,
      name: g.name,
      count: books.filter((b) => b.category === g.id).length,
    })),
  }),
}
