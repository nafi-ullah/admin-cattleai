"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BACKEND_URL } from "@/app/utils/constants";
import { FaFilePdf } from "react-icons/fa";

import {
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

// Replace with actual backend URL
type User = {
  userid: string;
  full_name: string;
  credit: number;
  user_type: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [creditModalOpen, setCreditModalOpen] = useState<boolean>(false);
  const [userTypeModalOpen, setUserTypeModalOpen] = useState<boolean>(false);
  const [creditAmount, setCreditAmount] = useState<number | string>('');
  const [paymentSlipLink, setPaymentSlipLink] = useState<string | null>(null);

  const handleFetchUser = async () => {
    fetch(`${BACKEND_URL}/users`)
    .then((res) => res.json())
    .then((data: User[]) => setUsers(data))
    .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleAddCredit = async () => {
    if (!selectedUser || !creditAmount) return;

    const userId = selectedUser.userid;
    const requestData = {
      user_id: userId,
      request_credit: creditAmount,
      status: "credited",
    };

    try {
      const response = await fetch(`${BACKEND_URL}/credit-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setPaymentSlipLink(data.paymentslip_link);
      
    } catch (error) {
      console.error("Error adding credit:", error);
    }
  };




  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userid}>
              <TableCell>{user.userid}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.credit}</TableCell>
              <TableCell>{user.user_type}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setSelectedUser(user);
                    setCreditModalOpen(true);
                  }}
                >
                  Add Credit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(user);
                    setUserTypeModalOpen(true);
                  }}
                >
                  Change User Type
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Credit Modal */}
      {selectedUser && (
        <Dialog open={creditModalOpen} onOpenChange={(open) => {
          setCreditModalOpen(open);
          if (!open) {
            setPaymentSlipLink(null); // Clear the paymentSlipLink when the modal is closed
          }
        }}>
          <DialogContent>
            <DialogTitle>Add credit to User: {selectedUser.full_name}</DialogTitle>
            <div className="space-y-4">
            {paymentSlipLink && (<div>
                <div className="my-4">
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="border p-2"
                placeholder="Enter credit amount"
              />
              </div>
              <Button onClick={handleAddCredit}>Add Credit</Button>
              </div>)}
              {paymentSlipLink && (
                <div className="">
                  <div className="font-semibold text-lg  mt-6 mb-2">Download</div>
                  <a href={paymentSlipLink} target="_blank" rel="noopener noreferrer" className="py-4">
                    <FaFilePdf size={64} />
                  </a>
                  <div className="font-semibold text-lg  mt-6">Share via</div>
                  <div className="py-2">
                  <WhatsappShareButton url={paymentSlipLink} title="Check out your payment receipt!">
                    <WhatsappIcon size={32} round className="mr-3"/>
                  </WhatsappShareButton>
                  <EmailShareButton url={paymentSlipLink} subject="Payment Receipt" body="Here is my payment receipt.">
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Change User Type Modal */}
      {selectedUser && (
        <Dialog open={userTypeModalOpen} onOpenChange={setUserTypeModalOpen}>
          <DialogContent>
            <DialogTitle>Change {selectedUser.user_type} to User ID: {selectedUser.userid}</DialogTitle>
            <p>User ID: {selectedUser.userid}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
