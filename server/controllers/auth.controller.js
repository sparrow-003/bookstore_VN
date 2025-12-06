// ==================================================
// AUTH CONTROLLER - Authentication logic
// ==================================================

import { UserModel } from "@/server/models/user.model"

export const AuthController = {
  login: (email, password) => {
    const user = UserModel.getByEmail(email)

    if (!user) {
      return { success: false, error: "User not found" }
    }

    if (user.password !== password) {
      return { success: false, error: "Invalid password" }
    }

    // Create a safe user object (without password)
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      businessName: user.businessName,
      rating: user.rating,
    }

    // Generate a simple token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    return { success: true, user: safeUser, token }
  },

  register: (name, email, password, role = "user") => {
    const existingUser = UserModel.getByEmail(email)

    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    const newUser = UserModel.create({
      name,
      email,
      password,
      role,
      avatar: null,
      phone: "",
      address: "",
    })

    const safeUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      avatar: newUser.avatar,
    }

    const token = `token_${newUser.id}_${Date.now()}`

    return { success: true, user: safeUser, token }
  },
}
