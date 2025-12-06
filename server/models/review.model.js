// ==================================================
// REVIEW MODEL - Data schema and operations for reviews
// ==================================================

let reviews = [
  {
    id: "1",
    bookId: "1",
    userId: "3",
    userName: "John Doe",
    rating: 5,
    title: "Timeless Classic!",
    comment: "A timeless classic that never gets old! Fitzgerald's prose is beautiful.",
    helpful: 24,
    verified: true,
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "2",
    bookId: "5",
    userId: "3",
    userName: "John Doe",
    rating: 5,
    title: "Pure Magic",
    comment: "Absolutely magical! This book sparked my love for reading.",
    helpful: 156,
    verified: true,
    createdAt: "2024-02-20T15:30:00Z",
  },
  {
    id: "3",
    bookId: "2",
    userId: "3",
    userName: "John Doe",
    rating: 4,
    title: "Eye-opening perspective",
    comment: "A fascinating look at human history. Very enlightening.",
    helpful: 89,
    verified: true,
    createdAt: "2024-03-05T08:45:00Z",
  },
]

export const ReviewModel = {
  getAll: () => reviews,

  getById: (id) => reviews.find((r) => r.id === id),

  getByBookId: (bookId) => reviews.filter((r) => r.bookId === bookId),

  getByUserId: (userId) => reviews.filter((r) => r.userId === userId),

  create: (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now().toString(),
      helpful: 0,
      verified: false,
      createdAt: new Date().toISOString(),
    }
    reviews.push(newReview)
    return newReview
  },

  update: (id, data) => {
    reviews = reviews.map((r) => (r.id === id ? { ...r, ...data } : r))
    return reviews.find((r) => r.id === id)
  },

  delete: (id) => {
    const review = reviews.find((r) => r.id === id)
    reviews = reviews.filter((r) => r.id !== id)
    return review
  },

  markHelpful: (id) => {
    reviews = reviews.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    return reviews.find((r) => r.id === id)
  },

  getAverageRating: (bookId) => {
    const bookReviews = reviews.filter((r) => r.bookId === bookId)
    if (bookReviews.length === 0) return 0
    return bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
  },
}
