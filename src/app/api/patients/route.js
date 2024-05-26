import { NextResponse } from "next/server";
import { getCookie } from "@/utils/cookies";
import dotenv from "dotenv"
import axios from "axios";
import { headers } from "next/headers";

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

export const POST = async (req) => {
  const data = await req.json()
  try{
    const authToken = await getCookie('TOKEN')
    const res = await axios.post(`${process.env.BACKEND_HOST}/api/records`, data,
      {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + authToken?.value
        },
      }
    )
    return NextResponse.json({detail : res.data}, {status: 201})
  } catch (err) {
    if (err.response){
      return NextResponse.json({ detail: err.response.data.detail }, {status: err.response.status})
    }
    return NextResponse.json({ detail: 'Internal Server Error' }, { status: 500 })
  }
}

export const PUT = async (req) => {
  const data = await req.json()
  const authToken = await getCookie('TOKEN')
  const sendData = {
    classification: data.result,
  }
  try {
    const res = await axios.patch(`${process.env.BACKEND_HOST}/api/records/${data.id}`, sendData,
    {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken?.value
      },
    })
    return NextResponse.json({ detail: res.data })
  } catch (err) {
    if (err.response){
      return NextResponse.json({detail: err.response.data.detail}, {status: err.response.status})
    }
    return NextResponse.json({detail: "Internal Server Error"}, {status: 500})
  }
}