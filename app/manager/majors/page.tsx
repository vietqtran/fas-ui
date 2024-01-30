"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridValueGetterParams } from "@mui/x-data-grid";
import useStudent from "@/hooks/Student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalStudent from "@/components/Common/Modals/ModalStudent";
import AddIcon from "@mui/icons-material/Add";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
import useMajor from "@/hooks/Major";
import ModalMajor from "@/components/Common/Modals/ModalMajor";
export default function page() {
  const {
    majors,
    fetchMajor,
    deleteMajor
  } = useMajor();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAction("create");
  };
  const handleClose = () => {
    fetchMajor();
    setOpen(false);
  };


  const [id, setId] = React.useState("");
  
  const [action, setAction] = React.useState("");

  const handleView = async (idMajor: string) => {
    setAction("view");
    setId(idMajor);
    setOpen(true);
  };

  const handleUpdate = async (idMajor: string) => {
    setAction("update");
    setId(idMajor);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMajor(id);
    console.log(`Delete button clicked for row with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "code",
      headerName: "Code",
      width: 80,
    },
    { field: "name", headerName: "Major Name", width: 250 },
    { field: "createAt", headerName: "Create At", width: 250 },
    { field: "updateAt", headerName: "Update At", width: 250 },
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
      width: 200,
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
        <h1 className="text-3xl font-bold my-8">List of Majors</h1>
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add new major
          </button>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={majors}
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
          <ModalMajor
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
