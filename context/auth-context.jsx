"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("bookstore-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        return { success: false, error: data.error }
      }

      setUser(data.user)
      localStorage.setItem("bookstore-user", JSON.stringify(data.user))
      localStorage.setItem("bookstore-token", data.token)
      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  const register = async (name, email, password, role = "user") => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })
      const data = await res.json()

      if (!res.ok) {
        return { success: false, error: data.error }
      }

      setUser(data.user)
      localStorage.setItem("bookstore-user", JSON.stringify(data.user))
      localStorage.setItem("bookstore-token", data.token)
      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("bookstore-user")
    localStorage.removeItem("bookstore-token")
  }

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("bookstore-user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isSeller: user?.role === "seller",
        isOrganizer: user?.role === "seller" || user?.role === "admin",
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
