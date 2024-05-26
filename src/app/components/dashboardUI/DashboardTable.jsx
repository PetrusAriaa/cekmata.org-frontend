'use client'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue} from "@nextui-org/react";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "id",
    label: "Kode Pasien",
  },
  {
    key: "nik",
    label: "NIK",
  },
  {
    key: "name",
    label: "Nama Pasien",
  },
  {
    key: "time",
    label: "Waktu Kunjungan",
  },
];

const getPatientData = async (onFetch) => {
  const { setTodayRecords } = onFetch;
  const res = await fetch('/api/patients/today')
  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    return
  }
  const mappedData = data.data.map((item) => {
    const date = new Date(item.created_at).toLocaleTimeString('id-ID').split('.')
    const _date = `${date[0]}:${date[1]}`
    return {
      id: item.patient_id,
      nik: item.nik.toString(),
      name: item.name.toString(),
      time: _date,
    }
  })
  setTodayRecords(mappedData)
}

const DashboardTable = () => {

  const [todayRecords, setTodayRecords] = useState([{
    id: null,
    name: 'Loading...',
    nik: 'Loading...',
    time: 'Loading...'
  }])

  useEffect(() => {
    getPatientData({setTodayRecords})
  }, [])

  return (
    <Table isStriped aria-label='Daftar Kunjungan Hari ini'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={todayRecords}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DashboardTable