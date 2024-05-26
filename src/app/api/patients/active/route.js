import { NextResponse } from "next/server";
import { getCookie } from "@/utils/cookies";

export const GET = async () => {
  try {
    const authToken = await getCookie('TOKEN')
    const res = await fetch(`${process.env.BACKEND_HOST}/api/records/patients/active`, {
      headers: {
        Authorization: 'Bearer ' + authToken?.value
      }
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}