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
import useAssignsChedule from "@/hooks/AssignSchedule";
import AssignClassSchedule from "@/components/Manager/Assign/AssignClassSchedule";
import { toast } from "react-toastify";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  bgcolor: "#fff",
  p: 4,
  color: "black"
};

const page = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user.role.name !== "MANAGER") {
    router.push("/login");
  }

  const {
    assignSchedules,
    fetchAssignSchedule,
    deleteAssignFeedBackById,
    setIdAssignSchedule,
    handleDeleteAssignSchedule,
  } = useAssignsChedule();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAction("create");
    setId("");
  };
  const handleClose = () => {
    fetchAssignSchedule();
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [id, setId] = React.useState("");

  const [action, setAction] = React.useState("");

  const handleView = async (id) => {
    router.push(`/manager/assign/${id}`);
  };

  const handleUpdate = async (idEvent: string) => {
    setAction("update");
    setId(idEvent);
    setOpen(true);
  };

  const handleChangeStatus = (id: string) => {
    deleteAssignFeedBackById(id);
  };

  const handleDelete = (id: string) => {
    handleOpenDelete();
    setId(id);
    console.log(id);
    
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "course",
      headerName: "Course",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.course?.code,
    },
    {
      field: "term",
      headerName: "Term",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.term?.name,
    },
    {
      field: "grade",
      headerName: "Student Group",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.grade?.code,
    },
    {
      field: "weekdays",
      headerName: "weekdays",
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.weekdays?.join(", "),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.createdAt).toISOString().split("T")[0],
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.updatedAt).toISOString().split("T")[0],
    },
    {
      field: "deleted",
      headerName: "Status",
      width: 80,
      renderCell: (params) => (
        <div style={{ color: !params.row.deleted ? "green" : "red" }}>
          {!params.row.deleted ? "Active" : "Inactive"}
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
            onClick={() => handleChangeStatus(params.row.id)}
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
      <div className="container pt-1=">
        <h1 className="my-8 text-3xl font-bold">List of Assign</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Create Assign
          </button>
        </div>
        <div style={{ height: "100%"}}>
          <DataGrid
            rows={assignSchedules}
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
          <AssignClassSchedule
            open={open}
            handleClose={handleClose}
            id={id}
            action={action}
          />
          <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Do you want to delete this assgin?  
              </Typography>
              <Typography className="float-end mt-2 flex gap-4">
                <Button variant="contained" color="success" className="my-2" onClick={() => {handleDeleteAssignSchedule(id); handleCloseDelete()}
                }>Yes</Button>
                <Button variant="contained" onClick={() => handleCloseDelete()} color="error">No</Button>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default page;
