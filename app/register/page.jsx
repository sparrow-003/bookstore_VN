"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [activeTab, setActiveTab] = useState("customer")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Customer Registration
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Seller Application
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    taxId: "",
    bankAccount: "",
  })

  const handleCustomerRegister = async (e) => {
    e.preventDefault()
    setError("")

    if (customerData.password !== customerData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const result = await register(customerData.name, customerData.email, customerData.password, "user")
      if (result.success) {
        router.push("/")
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSellerApplication = async (e) => {
    e.preventDefault()
    setError("")

    if (sellerData.password !== sellerData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      // First register as user
      const registerResult = await register(sellerData.name, sellerData.email, sellerData.password, "user")

      if (!registerResult.success) {
        setError(registerResult.error)
        setIsLoading(false)
        return
      }

      // Then submit seller application
      const appRes = await fetch("/api/auth/seller-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: registerResult.user.id,
          ...sellerData,
        }),
      })

      const appData = await appRes.json()
      if (!appRes.ok) {
        setError(appData.error)
        return
      }

      router.push("/seller-application-pending")
    } catch (err) {
      setError("Application submission failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="font-serif text-2xl">Create Account</CardTitle>
                <CardDescription>Join BookStore today</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="seller">Become a Seller</TabsTrigger>
              </TabsList>

              {/* Customer Registration */}
              <TabsContent value="customer" className="mt-6">
                <form onSubmit={handleCustomerRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cust-name">Full Name</Label>
                    <Input
                      id="cust-name"
                      placeholder="John Doe"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cust-email">Email Address</Label>
                    <Input
                      id="cust-email"
                      type="email"
                      placeholder="you@example.com"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cust-password">Password</Label>
                    <Input
                      id="cust-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={customerData.password}
                      onChange={(e) => setCustomerData({ ...customerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cust-confirm">Confirm Password</Label>
                    <Input
                      id="cust-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={customerData.confirmPassword}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {error && activeTab === "customer" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline font-semibold"
                      onClick={() => router.push("/login")}
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </TabsContent>

              {/* Seller Application */}
              <TabsContent value="seller" className="mt-6">
                <form onSubmit={handleSellerApplication} className="space-y-4 max-h-96 overflow-y-auto pr-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your application will be reviewed by our admin team. You'll receive an email once approved.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="seller-name">Full Name</Label>
                      <Input
                        id="seller-name"
                        placeholder="John Doe"
                        value={sellerData.name}
                        onChange={(e) => setSellerData({ ...sellerData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller-email">Email Address</Label>
                      <Input
                        id="seller-email"
                        type="email"
                        placeholder="you@example.com"
                        value={sellerData.email}
                        onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="seller-password">Password</Label>
                      <Input
                        id="seller-password"
                        type="password"
                        placeholder="Create a password"
                        value={sellerData.password}
                        onChange={(e) => setSellerData({ ...sellerData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller-confirm">Confirm Password</Label>
                      <Input
                        id="seller-confirm"
                        type="password"
                        placeholder="Confirm password"
                        value={sellerData.confirmPassword}
                        onChange={(e) =>
                          setSellerData({
                            ...sellerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      placeholder="Your Bookstore Name"
                      value={sellerData.businessName}
                      onChange={(e) => setSellerData({ ...sellerData, businessName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-email">Business Email</Label>
                      <Input
                        id="business-email"
                        type="email"
                        placeholder="business@example.com"
                        value={sellerData.businessEmail}
                        onChange={(e) =>
                          setSellerData({
                            ...sellerData,
                            businessEmail: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-phone">Business Phone</Label>
                      <Input
                        id="business-phone"
                        placeholder="+1 (555) 000-0000"
                        value={sellerData.businessPhone}
                        onChange={(e) =>
                          setSellerData({
                            ...sellerData,
                            businessPhone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-address">Business Address</Label>
                    <Input
                      id="business-address"
                      placeholder="123 Business St, City, State ZIP"
                      value={sellerData.businessAddress}
                      onChange={(e) =>
                        setSellerData({
                          ...sellerData,
                          businessAddress: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID</Label>
                      <Input
                        id="tax-id"
                        placeholder="XX-XXXXXXX"
                        value={sellerData.taxId}
                        onChange={(e) => setSellerData({ ...sellerData, taxId: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-account">Bank Account</Label>
                      <Input
                        id="bank-account"
                        placeholder="XXXXXXXXXX"
                        value={sellerData.bankAccount}
                        onChange={(e) =>
                          setSellerData({
                            ...sellerData,
                            bankAccount: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  {error && activeTab === "seller" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
