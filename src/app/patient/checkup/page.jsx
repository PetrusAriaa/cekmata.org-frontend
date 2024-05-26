'use client'
import { useState, useEffect } from "react";
import {
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { toast } from "sonner";

const getActivePatients = async (onFetch) => {
  const {setActivePatients, setSelectedPatient} = onFetch
  try{
    const res = await fetch('/api/patients/active');
    const data = await res.json();
    if(res.status === 200) {
      if (data.data.length < 1) {
        setSelectedPatient({name: 'No active patient', id: null})
        return 
      }
      setActivePatients(data.data)
      setSelectedPatient(data.data[0])
    }
  } catch (err) {
    console.error(err);
  }
}

const PatientDropdown = ({activePatients, selectedPatient, setSelectedPatient}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="text-xl border-b-2 w-full cursor-pointer">
          {selectedPatient.name}
        </div>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        items={activePatients}
      >
        {
          (item) => (
            <DropdownItem
              key={item.id}
              onClick={() => setSelectedPatient(item)}
              >
              {item.name}
            </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

const handleSubmitResult = async (result) => {
  try {
    const res = await fetch('/api/patients', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
    })
    const data = await res.json()
    if (res.status !== 200){
      toast.error(data.detail)
      return
    }
    toast.success("Hasil telah disimpan")
  } catch (err) {
    console.error(err)
  }
}

const CheckupPage = () => {

  const [file, setFile] = useState()
  const [preview, setPreview] = useState();
  const [predicted, setPredicted] = useState('');
  const [activePatients, setActivePatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState({id:null, name: 'Loading...'});
  const [predictedResult, setPredictedResult] = useState({id:null, name:'', classification:''})

  const onFileChange = ({target}) => {
    const _file = target.files[0]
    setFile(_file)
    if (_file) {
      const previewUrl = URL.createObjectURL(_file);
      setPreview(previewUrl);
    }
  }

  useEffect(() => {
    getActivePatients({setActivePatients, setSelectedPatient})
  }, [])

  useEffect(() => {
    if (predicted && selectedPatient.id){
      setPredictedResult({
        id: selectedPatient.id,
        result: predicted
      })
    }
  }, [predicted, selectedPatient])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
        alert("Please select a file first!");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
            const response = await fetch('https://senpro2024-backend-cekmata.azurewebsites.net/api/predict', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                },
                body: formData,
            });
            const result = await response.json();
            if (response.status === 200) {
              setPredicted(result.status)
            }
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Failed to upload file.');
        }
  }

  return (
    <main className="bg-neutral-50 w-full flex flex-col px-12 py-10 min-h-[100vh]">
      <div className="w-full">
        <h1 className="text-4xl font-bold pb-4 border-b-2 border-slate-300">Checkup Page</h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <input onChange={onFileChange} type="file" accept="image/jpg, image/png, image/jpeg" />
          <Button isDisabled={selectedPatient.id === null} type="submit" color="success" className="text-white font-semibold">PREDICT</Button>
        </form>
        <div className="flex flex-row mt-10 gap-10">
          <div className="flex justify-center items-center min-w-[28rem] w-[36rem] aspect-square border-slate-400 border-2 rounded-2xl bg-slate-200">
            {preview ? <img src={preview} alt="Preview" className="w-4/5 rounded-xl"/> : <p className="text-slate-500">No Image to display</p>}
          </div>
          <div className="w-full">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Nama Pasien:</h2>
              <PatientDropdown activePatients={activePatients} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
            </div>
            <h2 className="text-xl font-semibold mb-4">Hasil Prediksi:</h2>
              {predicted && (
              <div className="flex gap-16 items-center">
                <p>{predicted}</p>
                <button onClick={() => handleSubmitResult(predictedResult)} className="bg-slate-200 outline outline-2 outline-slate-300 hover:outline-blue-500 text-blue-500 px-2 py-1 rounded-lg hover:bg-slate-300 transition-colors active:scale-95">SIMPAN HASIL</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckupPage;