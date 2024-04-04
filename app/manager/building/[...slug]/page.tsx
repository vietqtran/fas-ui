"use client";

import useGrade from "@/hooks/Grade";
import useStudent from "@/hooks/Student";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { use, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
import ModalStudent from "@/components/Common/Modals/ModalStudent";
import ModalAddStudentToGrade from "@/components/Common/Modals/ModalAddStudentToGrade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import useBuilding from "@/hooks/Building";
import useRoom from "@/hooks/Room";
import ModalRoom from "@/components/Common/Modals/ModalRoom";

type Props = {
  params: {
    slug: string;
  };
};

const page = (props: Props) => {
  const router = useRouter();
  const { slug } = props.params;
  const { handleGetRoomByBuilding } = useRoom();
  const [reload, setReload] = React.useState(false);
  const getData = async (id: string) => {
    try {
      const data = await handleGetRoomByBuilding(id);
      //   setStudentArray(data.students);
      //   setGrade(data);
      //   setId(slug[0]);
      //   setCampusId(data.campus.id);
      //   setMajor(data.major.id);
    } catch (error) {}
  };

  useEffect(() => {
    getData(slug[0]);
  }, [slug, reload]);

  const { rooms, fetchRooms, deleteRoom } = useRoom();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAction("create");
    setId("");
  };
  const handleClose = () => {
    handleGetRoomByBuilding(slug[0]);
    setOpen(false);
  };

  const [id, setId] = React.useState("");

  const [action, setAction] = React.useState("");

  const handleUpdate = async (idEvent: string) => {
    setAction("update");
    setId(idEvent);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteRoom(id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 190 },
    { field: "code", headerName: "Name", width: 190 },
    {
      field: "building",
      headerName: "Building",
      width: 190,
      valueGetter: (params: GridValueGetterParams) => params.row.building?.name,
    },
    {
      field: "campus",
      headerName: "Campus",
      width: 190,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.building.campus?.name,
    },
    { field: "createAt", headerName: "Create At", width: 240 },
    { field: "updateAt", headerName: "Update At", width: 240 },
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
        <div className="flex gap-5">
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
        <h1
          className="text-3xl font-bold my-5 hover:cursor-pointer"
          onClick={() => router.push("/manager/building")}
        >
          {" "}
          <ArrowBackIcon /> List Building
        </h1>
        <div className="flex justify-between items-center my-7">
          <h1 className="text-3xl font-bold italic text-slate-600">
            {/* Class {grade?.code} */}
          </h1>
          <button
            className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon /> Add Room to building
          </button>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rooms}
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
          <ModalRoom
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
