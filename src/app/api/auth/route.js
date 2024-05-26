import { NextResponse } from "next/server";
import { setCookie } from "@/utils/cookies";
import dotenv from "dotenv";
import axios from "axios"

dotenv.config()
export const POST = async (req) => {
  const authData = await req.json()
  try{
    const res = await axios.post(`${process.env.BACKEND_HOST}/auth/login`,
      `username=${authData.username}&password=${authData.password}`,
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    await setCookie('TOKEN', res.data.access_token)
    return NextResponse.json("Hello")
  } catch (err) {
    if (err.response){
      return NextResponse.json({detail: err.response.data.detail}, {status: err.response.status})
    }
    return NextResponse.json({ detail: 'Internal Server Error' }, { status: 500 })
  }
}