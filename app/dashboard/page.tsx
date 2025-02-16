"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { BACKEND_URL } from "../utils/constants"

// Define the types based on the API response
interface Last7DaysStats {
  date: string
  count_of_predictions: number
  added_credits: number
  new_cows_added: number
}

interface StatsResponse {
  total_users: number
  total_cows: number
  total_predictions: number
  total_predictions_last_7_days: number
  total_credits_added_last_7_days: number
  last_7_days_stats: Last7DaysStats[]
}

export default function DashboardPage() {
  // State to hold the API response data, with proper typing
  const [stats, setStats] = useState<StatsResponse | null>(null)

  useEffect(() => {
    // Fetch data from the API
    async function fetchStats() {
      const res = await fetch(`${BACKEND_URL}/stats`)
      const data: StatsResponse = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  // Return loading state if data isn't available yet
  if (!stats) {
    return <div>Loading...</div>
  }

  // Prepare the data for the bar chart (last 7 days stats)
  const chartData = stats.last_7_days_stats.slice(1).map((entry) => ({
    name: new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" }), // Show the date as Mon, Tue, etc.
    predictions: entry.count_of_predictions,
    credits: entry.added_credits,
    cows: entry.new_cows_added, // Total users (constant, not daily data)
  }));
  

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_predictions}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_users}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credits Added Last 7 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_credits_added_last_7_days}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Cows Added</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_cows}</div>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="predictions" fill="#8884d8" />
              <Bar dataKey="credits" fill="#82ca9d" />
              <Bar dataKey="cows" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
