"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import useStudent from "@/hooks/Student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalStudent from "@/components/Common/Modals/ModalStudent";
import AddIcon from "@mui/icons-material/Add";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
export default function page() {
  const { students, deleteStudent, fetchStudents } = useStudent();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setAction("create");
  };
  const handleClose = () => {
    fetchStudents();
    setOpen(false);
  };

  const [id, setId] = React.useState("");
  const [action, setAction] = React.useState("");
  const handleView = async (idStudent: string) => {
    setAction("view");
    setId(idStudent);
    setOpen(true);
  };

  const handleUpdate = async (idStudent: string) => {
    setAction("update");
    setId(idStudent);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteStudent(id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "studentCode",
      headerName: "Code",
      width: 80,
      renderCell: (params) => (
        <div color="primary" onClick={() => handleView(params.row.id)}>
          {params.row.studentCode}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 190 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "middleName", headerName: "Middle Name", width: 110 },
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
      width: 110,
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      renderCell: (params) => (
        <div style={{ color: params.row.status ? "green" : "red" }}>
          {params.row.status ? "Active" : "Inactive"}
        </div>
      ),
    },
    { field: "address", headerName: "Address", width: 320 },
    {
      field: "major",
      headerName: "Major",
      width: 60,
      valueGetter: (params: GridValueGetterParams) => params.row.major?.code,
    },
    {
      field: "campus",
      headerName: "Campus",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => params.row.campus?.name,
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <ManagerLayout>
      <div className="container">
        <h1 className="text-3xl font-bold my-8">List of Students</h1>
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => handleOpen()}
          >
            <AddIcon />
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
            sx={{
              ".MuiDataGrid-columnHeader": {
                outline: "none !important",
              },
            }}
            showColumnVerticalBorder={true}
            showCellVerticalBorder={true}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
          <ModalStudent
            open={open}
            handleClose={handleClose}
            id={id}
            action={action}
          />
        </div>
      </div>
    </ManagerLayout>
  );
}
