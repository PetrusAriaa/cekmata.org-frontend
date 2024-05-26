import { NextResponse } from "next/server";
import { getCookie } from "@/utils/cookies";

export const GET = async () => {
  const authToken = await getCookie('TOKEN')
  const res = await fetch(`${process.env.BACKEND_HOST}/api/records/patients/active`, {
    headers: {
      Authorization: 'Bearer ' + authToken?.value
    }
  })
  const data = await res.json()

  if (res.status !== 200) {
    return NextResponse.json({ err: data }, { status: res.status })
  }

  return NextResponse.json(data)
}