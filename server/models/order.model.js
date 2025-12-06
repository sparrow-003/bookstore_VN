// ==================================================
// ORDER MODEL - Data schema and operations for orders
// ==================================================

let orders = [
  {
    id: "ORD-001",
    userId: "3",
    userName: "John Doe",
    userEmail: "user@example.com",
    items: [
      { bookId: "1", title: "The Great Gatsby", quantity: 1, price: 14.99, sellerId: "2" },
      { bookId: "5", title: "Harry Potter and the Sorcerer's Stone", quantity: 2, price: 15.99, sellerId: "2" },
    ],
    subtotal: 46.97,
    shipping: 4.99,
    tax: 3.76,
    total: 55.72,
    status: "delivered",
    paymentMethod: "credit_card",
    paymentStatus: "paid",
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
    items: [{ bookId: "2", title: "Sapiens", quantity: 1, price: 18.99, sellerId: "2" }],
    subtotal: 18.99,
    shipping: 4.99,
    tax: 1.52,
    total: 25.5,
    status: "shipped",
    paymentMethod: "paypal",
    paymentStatus: "paid",
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

export const OrderModel = {
  getAll: () => orders,

  getById: (id) => orders.find((o) => o.id === id),

  getByUserId: (userId) => orders.filter((o) => o.userId === userId),

  getBySellerId: (sellerId) => orders.filter((o) => o.items.some((item) => item.sellerId === sellerId)),

  getByStatus: (status) => orders.filter((o) => o.status === status),

  create: (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    orders.push(newOrder)
    return newOrder
  },

  update: (id, data) => {
    orders = orders.map((o) => (o.id === id ? { ...o, ...data, updatedAt: new Date().toISOString() } : o))
    return orders.find((o) => o.id === id)
  },

  updateStatus: (id, status) => {
    orders = orders.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    return orders.find((o) => o.id === id)
  },

  count: () => orders.length,

  getTotalRevenue: () => orders.reduce((sum, o) => sum + o.total, 0),

  getRecentOrders: (limit = 5) =>
    [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit),
}
