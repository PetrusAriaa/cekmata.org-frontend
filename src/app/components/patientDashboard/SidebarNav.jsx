'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { Button } from "@nextui-org/react";

export const SidebarNav = () => {

  const [activeView, setActiveView] = useState('')
  useEffect(() => {
    setActiveView(window.location.pathname)
  }, [])

  const r = useRouter()
  return (
    <div className="h-screen bg-blue-500 w-1/3 min-w-[300px]">
      <div className="flex flex-col p-8 gap-4">
          <button onClick={() => {
            setActiveView('/patient')
            r.push('/patient')
          }} className={"text-left py-4 px-8 rounded-xl text-xl w-full "
          + ( activeView === '/patient' ? 'bg-white text-blue-500 font-semibold shadow-md' : 'text-white bg-transparent hover:bg-white/20')
        }>Pendaftaran</button>
          <button onClick={() => {
            r.push('/patient/checkup')  
            setActiveView('/patient/checkup')
          }} className={"text-left py-4 px-8 rounded-xl text-xl w-full "
            + ( activeView === '/patient/checkup' ? 'bg-white text-blue-500 font-semibold shadow-md' : 'text-white bg-transparent hover:bg-white/20')
          }>Checkup</button>
          <button onClick={() => r.push('/')} className="text-white text-left py-4 px-8 rounded-xl text-xl w-full hover:bg-white/20">Kembali</button>
      </div>
    </div>
  )
}