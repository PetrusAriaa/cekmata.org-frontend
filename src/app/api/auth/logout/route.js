import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
  cookies().delete('TOKEN')
  cookies().delete('USERNAME')
  return NextResponse.json({status: "OK"}, {status: 200})
}