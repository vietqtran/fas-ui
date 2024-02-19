"use client";

import * as React from "react";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
import ModalStudent from "@/components/Common/Modals/ModalStudent";
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useStudent from "@/hooks/Student";

export default function page() {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user.role.name !== "MANAGER") {
    router.push("/login");
  }

  const { students, deleteStudent, fetchStudents } = useStudent();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setId("");
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
            className="rounded bg-yellow-500 px-2 py-2 font-bold text-white hover:bg-yellow-600"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
          </button>
          <button
            className="rounded bg-red-500 px-2 py-2 font-bold text-white hover:bg-red-700"
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
        <h1 className="my-8 text-3xl font-bold">List of Students</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
