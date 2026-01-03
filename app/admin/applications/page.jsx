"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock } from "lucide-react"

export default function AdminApplicationsPage() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState([])
  const [selectedApp, setSelectedApp] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetchApplications()
    }
  }, [isAdmin])

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/auth/seller-application")
      const data = await res.json()
      setApplications(data.applications || [])
    } catch (error) {
      console.error("Failed to fetch applications:", error)
    }
  }

  const handleApprove = async (applicationId) => {
    try {
      const res = await fetch("/api/auth/seller-application", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, action: "approve" }),
      })
      if (res.ok) {
        fetchApplications()
      }
    } catch (error) {
      console.error("Failed to approve application:", error)
    }
  }

  const handleReject = async () => {
    if (!selectedApp || !rejectionReason.trim()) {
      alert("Please provide a rejection reason")
      return
    }
    try {
      const res = await fetch("/api/auth/seller-application", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: selectedApp.id,
          action: "reject",
          reason: rejectionReason,
        }),
      })
      if (res.ok) {
        fetchApplications()
        setIsDialogOpen(false)
        setSelectedApp(null)
        setRejectionReason("")
      }
    } catch (error) {
      console.error("Failed to reject application:", error)
    }
  }

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const pendingApps = applications.filter((app) => app.status === "pending")
  const approvedApps = applications.filter((app) => app.status === "approved")
  const rejectedApps = applications.filter((app) => app.status === "rejected")

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Seller Applications" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Manage Seller Applications</h2>
            <p className="text-muted-foreground">Review and approve/reject seller applications</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{pendingApps.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold">{approvedApps.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold">{rejectedApps.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Applications */}
          {pendingApps.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Pending Applications</h3>
              <div className="space-y-4">
                {pendingApps.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-semibold">{app.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold">{app.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Business Name</p>
                          <p className="font-semibold">{app.businessName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Business Phone</p>
                          <p className="font-semibold">{app.businessPhone}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">Business Address</p>
                          <p className="font-semibold">{app.businessAddress}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedApp(app)
                            setIsDialogOpen(true)
                          }}
                        >
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove(app.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Approved Applications */}
          {approvedApps.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Approved Sellers</h3>
              <div className="space-y-2">
                {approvedApps.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{app.businessName}</p>
                          <p className="text-sm text-muted-foreground">{app.email}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {applications.length === 0 && (
            <Alert>
              <AlertDescription>No seller applications found</AlertDescription>
            </Alert>
          )}
        </main>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Provide a reason for rejection. The applicant will receive this feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
