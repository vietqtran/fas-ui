"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ModalCourse from "@/components/Common/Modals/ModalCourse";
import useTerm from "@/hooks/Term";
import ModalTerm from "@/components/Common/Modals/ModalTerm";
import { useSlot } from "@/hooks/Slot";
import ModalSlot from "@/components/Common/Modals/ModalSlot";

const page = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user.role.name !== "MANAGER") {
    router.push("/login");
  }

  const { slots, deleteSlotById } = useSlot();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAction("create");
    setId("");
  };
  const handleClose = () => {
    // fetchTerms();
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

  const handleDelete = async (idEvent: string) => {
    deleteSlotById(idEvent);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "startAt",
      headerName: "Start Date",
      width: 250,
    },
    { field: "endAt", headerName: "End Date", width: 250 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.row.createdAt).toLocaleDateString("en-US")}</div>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.row.updatedAt).toLocaleDateString("en-US")}</div>
      ),
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
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
        <h1 className="my-8 text-3xl font-bold">List of Term</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add new Slot
          </button>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={slots}
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
        </div>
      </div>

      <ModalSlot
        open={open}
        handleClose={handleClose}
        action={action}
        id={id}
      />
    </ManagerLayout>
  );
};

export default page;
