import { BACKEND_URL } from "@/app/utils/constants"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
    })

    if (response.ok) {
      const data = await response.json()

      // Check if the user is admin
      if (data.user_type === "admin") {
        // Set user data in cookies
        const cookieStore = cookies()
        cookieStore.set("user_data", JSON.stringify(data), {
          maxAge: 60 * 60 * 24 * 7, // 7 days expiration
        })
        return new Response(JSON.stringify({ success: true }), { status: 200 })
      } else {
        return new Response(JSON.stringify({ success: false, message: "You are not authorized to log in as an admin." }), { status: 403 })
      }
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 })
    }
  } catch (error) {
    console.error("Login failed:", error)
    return new Response(JSON.stringify({ success: false, message: "An error occurred. Please try again later." }), { status: 500 })
  }
}
