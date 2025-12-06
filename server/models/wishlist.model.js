// ==================================================
// WISHLIST MODEL - User wishlist operations
// ==================================================

let wishlists = [
  { id: "1", userId: "3", bookId: "3", createdAt: "2024-02-01T00:00:00Z" },
  { id: "2", userId: "3", bookId: "9", createdAt: "2024-02-05T00:00:00Z" },
]

export const WishlistModel = {
  getByUserId: (userId) => wishlists.filter((w) => w.userId === userId),

  add: (userId, bookId) => {
    const existing = wishlists.find((w) => w.userId === userId && w.bookId === bookId)
    if (existing) return existing

    const newItem = {
      id: Date.now().toString(),
      userId,
      bookId,
      createdAt: new Date().toISOString(),
    }
    wishlists.push(newItem)
    return newItem
  },

  remove: (userId, bookId) => {
    const item = wishlists.find((w) => w.userId === userId && w.bookId === bookId)
    wishlists = wishlists.filter((w) => !(w.userId === userId && w.bookId === bookId))
    return item
  },

  isInWishlist: (userId, bookId) => wishlists.some((w) => w.userId === userId && w.bookId === bookId),
}
