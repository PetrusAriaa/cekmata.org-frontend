'use client'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button} from "@nextui-org/react";

const rows = [
  {
    patientId: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
    action: <Button variant="light" className="font-bold text-neutral-700">View Details</Button>
  },
  {
    patientId: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    patientId: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    patientId: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "patientId",
    label: "Patient ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "DOB",
    label: "DOB",
  },
  {
    key: "eyeCondition",
    label: "Eye Condition",
  },
  {
    key: "classification",
    label: "Classification",
  },
  {
    key: "recommendations",
    label: "Recommendations",
  },
  {
    key: "action",
    label: "Action",
  },
];

const DashboardTable = () => {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.patientId}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DashboardTable