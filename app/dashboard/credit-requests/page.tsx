"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaFilePdf } from "react-icons/fa"
import { WhatsappShareButton, WhatsappIcon } from "react-share"
import { EmailShareButton, EmailIcon } from "react-share"
import { BACKEND_URL } from "@/app/utils/constants"



export default function CreditRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPaymentSlip, setSelectedPaymentSlip] = useState<string | null>(null)
  const [approvalModalOpen, setApprovalModalOpen] = useState(false)
  const [selectedCreditHistoryId, setSelectedCreditHistoryId] = useState<string | null>(null)

  // Fetch the data on component mount
  const fetchRequests = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/credit-history-all`)
      const data = await response.json()
      setRequests(data.reverse())
    } catch (error) {
      console.error("Error fetching credit history:", error)
    }
  }
  useEffect(() => {

    fetchRequests()
  }, [])

  const handleDownloadClick = (paymentslipLink: string) => {
    setSelectedPaymentSlip(paymentslipLink)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPaymentSlip(null)
  }

  const handleOpenApprovalModal = (creditHistoryId: string) => {
    setSelectedCreditHistoryId(creditHistoryId)
    setApprovalModalOpen(true)
  }

  const handleCloseApprovalModal = () => {
    setApprovalModalOpen(false)
    setSelectedCreditHistoryId(null)
  }

  const handleConfirmApproval = async () => {
    if (!selectedCreditHistoryId) return

    try {
      const response = await fetch(`${BACKEND_URL}/approve-request`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ creditHistoryId: selectedCreditHistoryId })
      })

      if (response.ok) {
        // alert("Request approved successfully!")
        fetchRequests();
      } else {
        alert("Failed to approve request.")
      }
    } catch (error) {
      console.error("Error approving request:", error)
      alert("An error occurred while approving the request.")
    } finally {
      handleCloseApprovalModal()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Credit Requests</h2>
      <div className="max-h-[70vh] overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Full Name</TableHead>
            <TableHead>Request Time</TableHead>
            <TableHead>Credit</TableHead>
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
              {request.status === "pending" ? (
                    <Button onClick={() => handleOpenApprovalModal(request.creditHistoryId)} variant="outline" className="mr-2">
                      Approve Request
                    </Button>
                  ) : (
                    <Button onClick={() => handleDownloadClick(request.paymentslip_link)} variant="outline" className="mr-2">
                      Payment Slip
                    </Button>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

      {isModalOpen && selectedPaymentSlip && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Download</h2>
            <div className="font-semibold text-lg mt-6 mb-2">Download PDF</div>
            <a href={selectedPaymentSlip} target="_blank" rel="noopener noreferrer" className="py-4">
              <FaFilePdf size={64} />
            </a>
            <div className="font-semibold text-lg mt-6">Share via</div>
            <div className="py-2">
              <WhatsappShareButton url={selectedPaymentSlip} title="Check out your payment receipt!">
                <WhatsappIcon size={32} round className="mr-3" />
              </WhatsappShareButton>
              <EmailShareButton url={selectedPaymentSlip} subject="Payment Receipt" body="Here is my payment receipt.">
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
            <div className="mt-4">
              <Button onClick={handleCloseModal} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}


{approvalModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Approval</h2>
            <p className="mb-4">
              Approving this request will grant the requested credit to the user. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={handleCloseApprovalModal} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleConfirmApproval} variant="destructive">
                Confirm Approval
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
