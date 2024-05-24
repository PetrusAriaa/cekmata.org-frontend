import { NextResponse } from "next/server";
import { getCookie } from "@/utils/cookies";
import dotenv from "dotenv"

dotenv.config()

export const GET = async (req, res) => {
  const query = req.url.split('=')[1]
  const authToken = await getCookie('TOKEN')
  const _res = await fetch(`${process.env.BACKEND_HOST}/api/records/patient?NIK=${query}`, {
    headers: {
      Authorization: 'Bearer ' + authToken?.value
    }
  })
  const data = await _res.json()
  return NextResponse.json(data)
}