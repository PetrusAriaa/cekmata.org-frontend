import { NextResponse } from "next/server"
import dotenv from "dotenv"

dotenv.config()

export const POST = async (req) => {
  const userData = await req.json()
  const res = await fetch(`${process.env.BACKEND_HOST}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  if (res.statusCode !== 201) {
    return NextResponse.json({ detail: res.statusText }, {status: res.status})
  }
  return NextResponse.json({"message": "user created"}, {status: 201, statusText: 'Created'})
}