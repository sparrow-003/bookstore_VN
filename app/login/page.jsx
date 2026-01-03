"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { BookOpen, AlertCircle, UserPlus } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"
  const { login } = useAuth()

  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const demoAccounts = [
    { title: "Admin", email: "alex@007", password: "alex@007", role: "Full system access & management" },
    { title: "Customer", email: "demo@user.com", password: "demo123", role: "Browse & purchase books" },
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        const user = result.user
        if (user.role === "admin") {
          router.push("/admin")
        } else if (user.role === "seller") {
          router.push("/seller")
        } else {
          router.push(redirect)
        }
      } else {
        setError(result.error || "Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail)
    setPassword(demoAccounts.find((a) => a.email === demoEmail)?.password || "")
    setTimeout(() => {
      const form = document.querySelector("form")
      if (form) form.requestSubmit()
    }, 0)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Login Card */}
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-serif text-2xl">BookStore</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline font-semibold"
                      onClick={() => router.push("/register")}
                    >
                      Register here
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Demo Accounts */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Demo Accounts</CardTitle>
                  <CardDescription>Click to auto-fill and login</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {demoAccounts.map((demo) => (
                    <button
                      key={demo.email}
                      onClick={() => handleDemoLogin(demo.email)}
                      className="w-full p-3 border rounded-lg hover:bg-muted transition text-left"
                    >
                      <p className="font-semibold text-sm">{demo.title}</p>
                      <p className="text-xs text-muted-foreground">{demo.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{demo.role}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New to BookStore?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/register")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
