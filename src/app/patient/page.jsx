'use client'
import { useState, useEffect, useRef } from "react"

const PatientPage = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    birth: Date.now(),
    phone: "",
  })

  const [patientNIK, setPatientNIK] = useState('')
  const [debounceNIK, setDebounceNIK] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isDisplayDropdown, setIsDisplayDropdown] = useState(false)

  const recomRef = useRef()

  const getPatientData = async () => {
    const res = await fetch(`/api/patients?patients=${debounceNIK}`)
    const data = await res.json()
    setIsDisplayDropdown(true)
    setSearchResults(data?.data)
  }

  const handleAutoFill = (patientData) => {
    setPatientData({
      name: patientData.name,
      birthDate: patientData.birth,
      phone: patientData.phone
    })
    setPatientNIK(patientData.code)
    setIsDisplayDropdown(false)
  }
  useEffect(() => {
    patientNIK ? null : setIsDisplayDropdown(false)
    const delay = setTimeout(() => {
      setDebounceNIK(patientNIK)
    }, 200)
    return () => {
      clearTimeout(delay)
    }
  }, [patientNIK])

  useEffect(() => {
    if (debounceNIK !== "") {
      getPatientData()
    }
  }, [debounceNIK])

  useEffect(() => {
    const onClose = ({target}) => {
      if (recomRef.current && !recomRef.current.contains(target) && isDisplayDropdown){
        setIsDisplayDropdown(false)
      }
    }
    document.addEventListener("mousedown", onClose)
    return () => {
      document.removeEventListener("mousedown", onClose)
    }
  }, [recomRef, isDisplayDropdown])

  const handleNIKChange = ({target}) => {
    const {value} = target
    setPatientNIK(value)
  }

  const handleInputChange = ({target}) => {
    const {name, value} = target
    setPatientData({...patientData, [name]: value})
  }

  const {name, birth, phone} = patientData
  return (
    <main className="bg-neutral-50 w-full flex flex-col items-center min-h-[100vh]">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold">Pendaftaran Pasien</h1>
        <form className="w-1/2 flex flex-col gap-8">
          <div className="flex flex-row items-center gap-4 w-full justify-between">
            <label htmlFor="NIKInput" className="text-sm">NIK</label>
            <div className="w-full max-w-96 relative">
              <input id="NIKInput" name="nik" type="text" onChange={(e) => handleNIKChange(e)} value={patientNIK} className="rounded-lg ring-2 ring-neutral-200 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full px-3 py-1" />
              <div ref={recomRef} hidden={!isDisplayDropdown} className="w-full max-w-96 bg-slate-200 absolute mt-2 rounded-lg py-2">
                {
                  searchResults?.map((patient) => {
                    return(
                      <div onClick={() => handleAutoFill(patient)} key={patient?.id} className="cursor-pointer flex flex-col w-full hover:bg-slate-300 border-b-1 border-solid border-slate-300 py-2">
                        <h2 className="text-lg uppercase leading-6">{patient?.name}</h2>
                        <p className="text-sm italic text-slate-500">{patient?.code}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 w-full justify-between">
            <label htmlFor="nama" className="text-sm">Nama</label>
            <input id="nama" name="name" value={name} type="text" className="rounded-lg ring-2 ring-neutral-200 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full max-w-96 px-3 py-1" />
          </div>
          <div className="flex flex-row items-center gap-4 w-full justify-between">
            <label htmlFor="tanggalLahir" className="text-sm">Tanggal Lahir</label>
            <input id="tanggalLahir" name="birth" type="text" className="rounded-lg ring-2 ring-neutral-200 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full max-w-96 px-3 py-1" />
          </div>
          <div className="flex flex-row items-center gap-4 w-full justify-between">
            <label htmlFor="noTelp" className="text-sm">No. Telepon</label>
            <input id="noTelp" name="phone" value={phone} type="text" className="rounded-lg ring-2 ring-neutral-200 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full max-w-96 px-3 py-1" />
          </div>
        </form>
      </div>
    </main>
  )
}

export default PatientPage