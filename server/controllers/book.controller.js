// ==================================================
// BOOK CONTROLLER - Book management logic
// ==================================================

import { BookModel } from "@/server/models/book.model"
import { ReviewModel } from "@/server/models/review.model"

export const BookController = {
  getAll: (filters = {}) => {
    let books = BookModel.getAll()

    if (filters.category && filters.category !== "all") {
      books = books.filter((b) => b.category === filters.category)
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      books = books.filter((b) => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query))
    }

    if (filters.minPrice) {
      books = books.filter((b) => b.price >= Number.parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      books = books.filter((b) => b.price <= Number.parseFloat(filters.maxPrice))
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-low":
        books.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        books.sort((a, b) => b.price - a.price)
        break
      case "rating":
        books.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        books.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return books
  },

  getById: (id) => {
    const book = BookModel.getById(id)
    if (!book) return null

    const reviews = ReviewModel.getByBookId(id)
    return { ...book, reviews }
  },

  getBySeller: (sellerId) => BookModel.getBySeller(sellerId),

  getFeatured: () => BookModel.getFeatured(),

  getByCategory: (categoryId) => BookModel.getByCategory(categoryId),

  create: (bookData, sellerId) => {
    return BookModel.create({
      ...bookData,
      sellerId,
      inStock: bookData.quantity > 0,
    })
  },

  update: (id, data, sellerId, isAdmin = false) => {
    const book = BookModel.getById(id)
    if (!book) return { success: false, error: "Book not found" }

    // Check ownership (sellers can only update their own books)
    if (!isAdmin && book.sellerId !== sellerId) {
      return { success: false, error: "Unauthorized" }
    }

    const updatedBook = BookModel.update(id, {
      ...data,
      inStock: data.quantity > 0,
    })

    return { success: true, book: updatedBook }
  },

  delete: (id, sellerId, isAdmin = false) => {
    const book = BookModel.getById(id)
    if (!book) return { success: false, error: "Book not found" }

    if (!isAdmin && book.sellerId !== sellerId) {
      return { success: false, error: "Unauthorized" }
    }

    BookModel.delete(id)
    return { success: true }
  },

  updateInventory: (id, quantity) => {
    const book = BookModel.getById(id)
    if (!book) return { success: false, error: "Book not found" }

    BookModel.update(id, {
      quantity,
      inStock: quantity > 0,
    })

    return { success: true }
  },

  getLowStock: (threshold = 10) => BookModel.getLowStock(threshold),
}
