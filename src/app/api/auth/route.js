import { NextResponse } from "next/server";
import { setCookie } from "@/utils/cookies";
import dotenv from "dotenv";

dotenv.config()
export const POST = async (req) => {

  const authData = await req.json()

  const res = await fetch(`${process.env.BACKEND_HOST}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    body: `username=${authData.username}&password=${authData.password}`
  })

  if (res.status !== 200) {
    return NextResponse.json({detail: res.statusText}, {
      status: res.status,
      headers: {
        'WWW-Authenticate': res.headers.get('www-authenticate')
      }
    })
  }
  const data = await res.json()
  await setCookie('TOKEN', data.access_token, 60 * 60 * 3)
  await setCookie('USERNAME', data.username, 60 * 60 * 3)

  return NextResponse.json({status: "success"})
}