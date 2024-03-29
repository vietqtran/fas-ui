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
import ModalCourse from "@/components/Common/Modals/ModalCourse";
import useBuilding from "@/hooks/Building";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalBuilding from "@/components/Common/Modals/ModalBuilding";

const page = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user.role.name !== "MANAGER") {
    router.push("/login");
  }

  const { buildings, fetchBuildings, deleteBuilding } = useBuilding();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAction("create");
    setId("");
  };
  const handleClose = () => {
    fetchBuildings();
    setOpen(false);
  };

  const [id, setId] = React.useState("");

  const [action, setAction] = React.useState("");

  const handleView = async (id) => {
    router.push(`/manager/building/${id}`);
  };

  const handleUpdate = async (idEvent: string) => {
    setAction("update");
    setId(idEvent);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteBuilding(id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "campus",
      headerName: "Campus",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.campus?.name,
    },
    { field: "createAt", headerName: "Create At", width: 280 },
    { field: "updateAt", headerName: "Update At", width: 280 },
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
    {
      field: "action",
      headerName: "Action",
      width: 240,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-5">
          <button
            className="rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => handleView(params.row.id)}
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
        <h1 className="my-8 text-3xl font-bold">List of Buildings</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add new buildings
          </button>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={buildings}
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
          <ModalBuilding
            open={open}
            handleClose={handleClose}
            id={id}
            action={action}
          />
        </div>
      </div>
    </ManagerLayout>
  );
};

export default page;
