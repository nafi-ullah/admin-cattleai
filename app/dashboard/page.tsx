"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", predictions: 4000, credits: 2400, users: 2400 },
  { name: "Tue", predictions: 3000, credits: 1398, users: 2210 },
  { name: "Wed", predictions: 2000, credits: 9800, users: 2290 },
  { name: "Thu", predictions: 2780, credits: 3908, users: 2000 },
  { name: "Fri", predictions: 1890, credits: 4800, users: 2181 },
  { name: "Sat", predictions: 2390, credits: 3800, users: 2500 },
  { name: "Sun", predictions: 3490, credits: 4300, users: 2100 },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predictions Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,345</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credits Consumed Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5,678</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Photos Uploaded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,345</div>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="predictions" fill="#8884d8" />
              <Bar dataKey="credits" fill="#82ca9d" />
              <Bar dataKey="users" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

