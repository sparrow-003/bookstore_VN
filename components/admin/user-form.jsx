"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function UserForm({ user, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(
    user || {
      name: "",
      email: "",
      password: "",
      role: "user",
      phone: "",
      address: "",
      businessName: "",
    },
  )
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    setValidationErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const validate = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!formData.email.includes("@")) {
      errors.email = "Invalid email format"
    }

    if (!user && !formData.password) {
      errors.password = "Password is required for new users"
    } else if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (formData.role === "seller" && !formData.businessName.trim()) {
      errors.businessName = "Business name is required for sellers"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!validate()) {
      return
    }

    const submitData = { ...formData }
    if (!user && submitData.password) {
      // New user creation
    } else if (user && !submitData.password) {
      // Editing user without password change
      delete submitData.password
    }

    try {
      await onSubmit(submitData)
    } catch (err) {
      setError(err.message || "An error occurred")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user ? "Edit User" : "Create New User"}</CardTitle>
        <CardDescription>{user ? "Update user information" : "Add a new user or seller to the system"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={validationErrors.name ? "border-destructive" : ""}
            />
            {validationErrors.name && <p className="text-xs text-destructive">{validationErrors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={validationErrors.email ? "border-destructive" : ""}
              disabled={!!user}
            />
            {validationErrors.email && <p className="text-xs text-destructive">{validationErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password {user && <span className="text-muted-foreground text-xs">(Leave empty to keep current)</span>}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={user ? "Leave empty to keep current password" : "Minimum 6 characters"}
              className={validationErrors.password ? "border-destructive" : ""}
            />
            {validationErrors.password && <p className="text-xs text-destructive">{validationErrors.password}</p>}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Customer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, State"
            />
          </div>

          {/* Business Name - Only for Sellers */}
          {formData.role === "seller" && (
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your Publishing Company"
                className={validationErrors.businessName ? "border-destructive" : ""}
              />
              {validationErrors.businessName && (
                <p className="text-xs text-destructive">{validationErrors.businessName}</p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
