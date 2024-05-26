import { getCookie } from "@/utils/cookies"
import { NextResponse } from "next/server"

export const GET = async () => {
  const authToken = await getCookie('TOKEN')
  const res = await fetch(`${process.env.BACKEND_HOST}/api/records/patients/today`, {
    headers: {
      Authorization: 'Bearer ' + authToken?.value
    }
  })
  const data = await res.json()
  if (res.status !== 200){
    return NextResponse.json({err: data}, {status: res.status})
  }
  return NextResponse.json(data)
}