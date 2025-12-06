// ==================================================
// USER MODEL - Data schema and operations for users
// ==================================================

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
    email: "seller@bookstore.com",
    password: "seller123",
    name: "Book Seller",
    role: "seller",
    avatar: null,
    phone: "+1 234 567 891",
    businessName: "Premium Books Co.",
    rating: 4.5,
    address: "456 Seller Ave, CA",
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

export const UserModel = {
  getAll: () => users,

  getById: (id) => users.find((u) => u.id === id),

  getByEmail: (email) => users.find((u) => u.email === email),

  getByRole: (role) => users.filter((u) => u.role === role),

  create: (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: userData.role || "user",
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    return newUser
  },

  update: (id, data) => {
    users = users.map((u) => (u.id === id ? { ...u, ...data } : u))
    return users.find((u) => u.id === id)
  },

  delete: (id) => {
    const user = users.find((u) => u.id === id)
    users = users.filter((u) => u.id !== id)
    return user
  },

  count: () => users.length,

  countByRole: (role) => users.filter((u) => u.role === role).length,
}
