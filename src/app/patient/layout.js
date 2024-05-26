import { SidebarNav } from "@/components/patientDashboard/SidebarNav"

const PatientLayout = ({children}) => {
  return(
    <div className="flex">
      <SidebarNav />
      {children}
    </div>
  )
}

module.exports = PatientLayout