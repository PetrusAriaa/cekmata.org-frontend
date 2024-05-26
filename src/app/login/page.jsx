'use client'
import { Button, Input, Spinner } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from 'sonner'

import Link from "next/link";

const onLogin = async (authData, router, setLoading) => {
  setLoading(true)
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData)
  })
  setLoading(false)
  const data = await res.json()
  if (res.status !== 200) {
    toast.error(data.detail)
  }
  else {
    toast.success("Login successful")
  }
  router.push('/')
}

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: ""})
  const [isLoading, setIsLoading] = useState(false)

  const r = useRouter()

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleChange = ({target}) => {
    const {name, value} = target
    setLoginData({
      ...loginData, [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(loginData, r, setIsLoading)
  }

  const {username, password} = loginData
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-blue-y-500 text-lg font-semibold my-6">CekMata.org</h1>
      <div className="bg-white flex flex-col p-6 gap-10 rounded-2xl shadow-md">
        <h1 className="text-center font-bold text-2xl text-neutral-700">LOGIN</h1>
        <form className="flex flex-col gap-4" onSubmit={e => handleSubmit(e)}>
          <Input
            label="Username"
            name="username"
            value={username}
            onChange={e => handleChange(e)}
            isRequired
            type="text"
            className="max-w-xs"
          />
          <Input
            label="Password"
            isRequired
            name="password"
            value={password}
            onChange={e => handleChange(e)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <IoEyeOff
                    size={20}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <IoEye
                    size={20}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Button type="submit" color="primary">{
          isLoading ? <Spinner size="sm" color="default" /> : 'SUBMIT'
          }</Button>
        </form>
      </div>
      <Link href={"/register"} className="my-4 text-sm font-semibold hover:text-blue-x-500 hover:underline">Create Account</Link>
    </div>
  )
}

export default LoginPage