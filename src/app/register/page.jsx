'use client'
import { Button, Input } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react"
import Link from "next/link";

const postRegisterData = async (registerData) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerData)
  })
  if (res.status !== 201) {
    alert('Failed to register')
    return
  }
  alert('Registration success')
}

const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isWarningVisibile, setIsWarningVisibile] = useState(false)
  const [registerData, setRegisterData] = useState({username: "", password: "", confirmPassword: ""})
  const {username, password, confirmPassword} = registerData

  const handleChange = ({target}) => {
    const {name, value} = target
    setRegisterData({
      ...registerData, [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postRegisterData(registerData)
  }

  useEffect(() => {
    password === confirmPassword
      ? setIsWarningVisibile(false)
      : setIsWarningVisibile(true)
  }, [confirmPassword])

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-blue-y-500 text-lg font-semibold my-6">CekMata.org</h1>
      <div className="bg-white flex flex-col p-6 gap-10 rounded-2xl shadow-md">
        <h1 className="text-center font-bold text-2xl text-neutral-700">REGISTER</h1>
        <form className="flex flex-col gap-4" onSubmit={e => handleSubmit(e)}>
          <Input
            label="Username"
            placeholder="Create Username"
            name="username"
            value={username}
            onChange={e => handleChange(e)}
            isRequired
            type="text" 
            className="max-w-xs"
          />
          <Input
            label="Password"
            placeholder="Create Password"
            isRequired
            name="password"
            value={password}
            onChange={e => handleChange(e)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
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
            type={isPasswordVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <div>
            <Input
              label="Confirm Password"
              placeholder="Re-Enter Password"
              isRequired
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => handleChange(e)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                  {isConfirmPasswordVisible ? (
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
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="max-w-xs"
            />
            <label className={"text-xs italic text-error-500 "+
          (isWarningVisibile ? "": "hidden")}>Please enter the same password</label>
          </div>
          <Button type="submit" color="primary">SUBMIT</Button>
        </form>
      </div>
      <Link href={"/login"} className="my-4 text-sm font-semibold hover:text-blue-x-500 hover:underline">Already have an account?</Link>
    </div>
  )
}

export default RegisterPage