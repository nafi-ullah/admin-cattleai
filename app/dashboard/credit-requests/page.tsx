"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const initialRequests = [
  { id: 1, username: "user1", credits: 50, paymentStatus: "Pending" },
  { id: 2, username: "user2", credits: 100, paymentStatus: "Pending" },
  // Add more requests as needed
]

export default function CreditRequestsPage() {
  const [requests, setRequests] = useState(initialRequests)

  const handleAction = (id: number, action: "Approve" | "Reject") => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, paymentStatus: action === "Approve" ? "Approved" : "Rejected" } : request,
      ),
    )
    // Here you would typically update the user's credits and send a WhatsApp receipt
    if (action === "Approve") {
      console.log(`Approved request ${id}. Update user credits and send WhatsApp receipt.`)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Credit Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Credits Requested</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.username}</TableCell>
              <TableCell>{request.credits}</TableCell>
              <TableCell>{request.paymentStatus}</TableCell>
              <TableCell>
                {request.paymentStatus === "Pending" && (
                  <>
                    <Button onClick={() => handleAction(request.id, "Approve")} variant="outline" className="mr-2">
                      Approve
                    </Button>
                    <Button onClick={() => handleAction(request.id, "Reject")} variant="outline">
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

