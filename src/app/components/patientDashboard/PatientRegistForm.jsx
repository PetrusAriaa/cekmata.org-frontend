'use client'
import { useState, useEffect, useRef } from "react"
import {DateInput} from "@nextui-org/date-input";
import {I18nProvider} from '@react-aria/i18n';
import { CalendarIcon } from "@/components/dashboardUI/CalendarIcon";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import { Button, Spinner } from "@nextui-org/react";
import { toast } from "sonner";

const PatientRegistForm = () => {
  const [patientData, setPatientData] = useState({
    name: null,
    birth: today(getLocalTimeZone()),
    phone: null,
  })
  const [patientNIK, setPatientNIK] = useState('')
  const [debounceNIK, setDebounceNIK] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isDisplayDropdown, setIsDisplayDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      birth: parseDate(patientData.birth),
      phone: patientData.phone
    })
    setPatientNIK(patientData.nik)
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

  const handleDateChange = ({day, month, year}) => {
    const _day = day < 10 ? `0${day}` : day
    const _month = month < 10 ? `0${month}` : month
    let _year = 2000
    if (year / 1000 < 1){
      _year = _year + year
      const _birth = parseDate(`${_year}-${_month}-${_day}`)
      setPatientData({...patientData, birth: _birth})
    }
    else {
      _year=year
      const _birth = parseDate(`${_year}-${_month}-${_day}`)
      setPatientData({...patientData, birth: _birth})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {year, month, day} = patientData.birth
    const _day = day < 10 ? `0${day}` : day
    const _month = month < 10 ? `0${month}` : month
    const _data = {
      name: patientData.name,
      phone: patientData.phone,
      patient_nik: patientNIK,
      birth: `${year}-${_month}-${_day}`
    }
    if (_data.name === "" && _data.phone === "" && _data.nik === "") {
      alert("Lengkapi data terlebih dahulu")
      return
    }
    setIsLoading(true)
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_data)
    })
    setIsLoading(false)
    const _res = await res.json()
    if (res.status !== 201 ){
      toast.error(_res.detail)
      return
    }
    toast.success('Menambahkan Pasien')
  }

  const {name, birth, phone} = patientData
  return (
    <form onSubmit={handleSubmit} className="w-4/5 flex flex-col gap-20 mt-12">
      <div className="flex flex-row items-center justify-between gap-4 w-full">
        <label htmlFor="NIKInput" className="text-2xl font-semibold">NIK</label>
        <div className="w-full max-w-[720px] relative z-10">
          <input required id="NIKInput" name="nik" type="text" onChange={(e) => handleNIKChange(e)} value={patientNIK} className="text-3xl rounded-lg ring-2 ring-neutral-200 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full px-4 py-4" />
          <div ref={recomRef} hidden={!isDisplayDropdown} className="w-full bg-slate-200 absolute mt-2 rounded-lg py-2">
            {
              searchResults?.map((patient) => {
                return(
                  <div onClick={() => handleAutoFill(patient)} key={patient?.id} className="cursor-pointer flex flex-col w-full hover:bg-slate-300 border-b-1 border-solid border-slate-300 p-2">
                    <h2 className="text-lg font-semibold uppercase leading-6">{patient?.name}</h2>
                    <p className="text-sm italic text-slate-500">{patient?.nik}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 w-full justify-between mt-10">
        <label htmlFor="nama" className="text-2xl font-semibold">Nama</label>
        <input required id="nama" name="name" value={name} onChange={handleInputChange} type="text" className="text-4xl bg-transparent border-b-2 border-slate-400 transition-colors focus:border-blue-500 focus:outline-none w-full max-w-[720px] px-4 py-2" />
      </div>
      <div className="flex flex-row items-center gap-4 w-full justify-between">
        <label htmlFor="tanggalLahir" className="text-2xl font-semibold">Tanggal Lahir</label>
        <I18nProvider locale="id-ID">
          <DateInput
          name="birth"
          size="lg"
          aria-label="birth date"
          isRequired
          maxValue={today(getLocalTimeZone())}
          value={birth}
          onChange={handleDateChange}
          endContent={
            <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          } 
          className="max-w-sm relative z-0" />
        </I18nProvider>
      </div>
      <div className="flex flex-row items-center gap-4 w-full justify-between">
        <label htmlFor="noTelp" className="text-2xl font-semibold">No. Telepon</label>
        <input required id="noTelp" name="phone" value={phone} onChange={handleInputChange} type="text" className="text-lg bg-transparent border-b-2 border-slate-400 focus:border-blue-500 transition-colors focus:outline-none w-full max-w-96 px-4 py-2" />
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="text-xl" color="primary">{
          isLoading ? <Spinner size="sm" color="default" /> : 'Kirim'
        }</Button>
      </div>
    </form>
  )
}

export default PatientRegistForm