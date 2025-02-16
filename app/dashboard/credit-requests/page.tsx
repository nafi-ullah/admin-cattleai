"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BACKEND_URL } from "@/app/utils/constants"

export default function CreditRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])

  // Fetch the data on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/credit-history-all`)
        const data = await response.json()
        setRequests(data)
      } catch (error) {
        console.error("Error fetching credit history:", error)
      }
    }
    fetchRequests()
  }, [])

  const handleDownload = (paymentslipLink: string) => {
    const link = document.createElement("a")
    link.href = paymentslipLink
    link.download = "payment-slip"
    link.click()
  }

  return (
    <div >
      <h2 className="text-2xl font-bold mb-4">Credit Requests</h2>
      <div className="max-h-[70vh] overflow-y-scroll w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Full Name</TableHead>
            <TableHead>Request Time</TableHead>
            <TableHead>Requested Credit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.creditHistoryId}>
              <TableCell>{request.user_full_name}</TableCell>
              <TableCell>{new Date(request.request_time).toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{request.request_credit}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleDownload(request.paymentslip_link)} variant="outline" className="mr-2">
                  Download Payment Slip
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
