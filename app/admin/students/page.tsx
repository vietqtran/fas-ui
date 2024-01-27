"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useStudent from "@/hooks/Student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalStudent from "@/components/Common/Modals/ModalStudent";
import AddIcon from '@mui/icons-material/Add';

export default function page() {
  const { students, setStudents, deleteStudent } = useStudent();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = (id: string) => {
    // Handle update logic here
    console.log(`Update button clicked for row with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    deleteStudent(id);
    // Handle delete logic here
    console.log(`Delete button clicked for row with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "studentCode", headerName: "Code", width: 100 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "middleName", headerName: "Middle Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    {
      field: "birthDay",
      headerName: "Birth Day",
      type: "dateTime",
      width: 100,
      valueFormatter(params) {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div style={{ color: params.row.status ? "green" : "red" }}>
          {params.row.status ? "Active" : "Inactive"}
        </div>
      ),
    },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "major",
      headerName: "Major",
      width: 70,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-3">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  console.log(students);
  return (
    <div className="container">
      <h1 className="text-3xl font-bold my-8">List of Students</h1>
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => handleOpen()}
        >
          <AddIcon/>
          Add new student
        </button>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
        <ModalStudent open={open} handleClose={handleClose} />
      </div>
    </div>
  );
}
