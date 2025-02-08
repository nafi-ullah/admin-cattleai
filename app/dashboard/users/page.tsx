"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const initialUsers = [
  { id: 1, username: "user1", whatsapp: "+1234567890", subscriptionEnd: "2023-12-31", credits: 100, status: "Admin" },
  { id: 2, username: "user2", whatsapp: "+0987654321", subscriptionEnd: "2023-11-30", credits: 50, status: "User" },
  // Add more users as needed
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [filter, setFilter] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      user.status.toLowerCase().includes(filter.toLowerCase()),
  )

  const toggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "Admin" ? "User" : "Admin" } : user,
      ),
    )
  }

  const addCredits = (id: number, amount: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, credits: user.credits + amount } : user)))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Subscription End</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.whatsapp}</TableCell>
              <TableCell>{user.subscriptionEnd}</TableCell>
              <TableCell>{user.credits}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button onClick={() => toggleStatus(user.id)} variant="outline" className="mr-2">
                  Toggle Status
                </Button>
                <Button onClick={() => addCredits(user.id, 10)} variant="outline">
                  Add 10 Credits
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

