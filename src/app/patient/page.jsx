import PatientRegistForm from "@/components/patientDashboard/PatientRegistForm"

const PatientPage = () => {
  return (
    <main className="bg-neutral-50 w-full flex flex-col px-12 py-10 min-h-[100vh]">
      <div className="w-full">
        <h1 className="text-4xl font-bold pb-4 border-b-2 border-slate-300">Pendaftaran Pasien</h1>
        <PatientRegistForm />
      </div>
    </main>
  )
}

export default PatientPage