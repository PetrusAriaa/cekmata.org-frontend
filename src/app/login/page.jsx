'use client'
import { Button, Input } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react"
import Link from "next/link";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: ""})

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleChange = ({target}) => {
    const {name, value} = target
    setLoginData({
      ...loginData, [name]: value
    })
  }
  const {username, password} = loginData
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-blue-y-500 text-lg font-semibold my-6">CekMata.org</h1>
      <div className="bg-white flex flex-col p-6 gap-10 rounded-2xl shadow-md">
        <h1 className="text-center font-bold text-2xl text-neutral-700">LOGIN</h1>
        <form className="flex flex-col gap-4">
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
          <Button type="submit" color="primary">SUBMIT</Button>
        </form>
      </div>
      <Link href={"/register"} className="my-4 text-sm font-semibold hover:text-blue-x-500 hover:underline">Create Account</Link>
    </div>
  )
}

export default LoginPage