// ==================================================
// USER CONTROLLER - User management logic
// ==================================================

import { UserModel } from "@/server/models/user.model"

export const UserController = {
  getAll: () => {
    return UserModel.getAll().map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      avatar: u.avatar,
      phone: u.phone,
      address: u.address,
      businessName: u.businessName,
      rating: u.rating,
      createdAt: u.createdAt,
    }))
  },

  getById: (id) => {
    const user = UserModel.getById(id)
    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      businessName: user.businessName,
      rating: user.rating,
      createdAt: user.createdAt,
    }
  },

  getByRole: (role) => UserModel.getByRole(role),

  update: (id, data, requesterId, isAdmin = false) => {
    // Users can only update their own profile
    if (!isAdmin && id !== requesterId) {
      return { success: false, error: "Unauthorized" }
    }

    const updatedUser = UserModel.update(id, data)
    return { success: true, user: updatedUser }
  },

  updateRole: (id, role) => {
    const updatedUser = UserModel.update(id, { role })
    return { success: true, user: updatedUser }
  },

  delete: (id) => {
    UserModel.delete(id)
    return { success: true }
  },

  getStats: () => ({
    totalUsers: UserModel.count(),
    usersByRole: {
      admin: UserModel.countByRole("admin"),
      seller: UserModel.countByRole("seller"),
      user: UserModel.countByRole("user"),
    },
  }),
}
