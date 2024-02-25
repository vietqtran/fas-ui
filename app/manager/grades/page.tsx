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
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import useGrade from "@/hooks/Grade";
import ModalGrade from "@/components/Common/Modals/ModalGrade";

export default function page() {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user.role.name !== "MANAGER") {
    router.push("/login");
  }

  const { grades, fectchGrade, deleteGrade } = useGrade();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAction("create");
    setId("");
  };
  const handleClose = () => {
    fectchGrade();
    setOpen(false);
  };
  

  const [id, setId] = React.useState("");

  const [action, setAction] = React.useState("");

  const handleView = async (idEvent: string) => {
    setAction("view");
    setId(idEvent);
    setOpen(true);
  };

  const handleUpdate = async (idEvent: string) => {
    setAction("update");
    setId(idEvent);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteGrade(id);
  };

  const hanldeOpenGrade = (id:string) => {
    router.push(`/manager/grades/${id}`);
  }

  

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "code", headerName: "Code", width: 250 },
    {
      field: "major",
      headerName: "Major",
      width: 70,
      valueGetter: (params: GridValueGetterParams) => params.row.major?.code,
    },
    {
      field: "campus",
      headerName: "Campus",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => params.row.campus?.name,
    },
    { field: "createdAt", headerName: "Create At", width: 250 },
    { field: "updatedAt", headerName: "Update At", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: params.row.status ? "green" : "red" }}>
          {params.row.status ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-5">
            <button
            className="rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => hanldeOpenGrade(params.row.id)}
          >
            <VisibilityIcon />
          </button>
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
        <h1 className="my-8 text-3xl font-bold">List of Grade</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add new grade
          </button>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={grades}
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
          <ModalGrade
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
