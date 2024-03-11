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
import useActivity from "@/hooks/Activity";
import useAssignsChedule from "@/hooks/AssignSchedule";
import { Modal } from "@mui/material";
import ModalActivity from "@/components/Common/Modals/ModalActivity";
type Props = {
  params: {
    slug: string;
  };
};

const page = (props: Props) => {
  const { slug } = props.params;
  const [reload, setReload] = React.useState(false);
  const { fetchActivityByAssign, activities } = useActivity();
  const { assignSchedule, setAssignSchedule, getAssignSchdule } = useAssignsChedule();

  const [dateArray, setDateArray] = useState<any>([]);

  const getData = async (id: string) => {
    try {
      const data = await fetchActivityByAssign(id);
      const data2 = await getAssignSchdule(slug[0]);
      console.log(data2);
        setAssignSchedule(data2);
      console.log(assignSchedule);
      console.log(data);
      console.log(activities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(slug[0]);

    console.log(assignSchedule);
  }, [slug, reload]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);

    setAction("create");
  };
  const handleClose = () => {
    getData(slug[0]);
    setOpen(false);
  };

  const router = useRouter();

  const [id, setId] = React.useState("");
  const [action, setAction] = React.useState("");
  const [openView, setOpenView] = React.useState(false);
  const handleView = async (idStudent: string) => {
    setAction("view");
    setId(idStudent);
    setOpenView(true);
  };

  const handleUpdate = async (idActivity: string) => {
    setAction("update");
    setId(idActivity);
    setOpen(true);
  }

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleViewActivity = async (idActivity: string) => {
    router.push(`/manager/assign/activity/${idActivity}`);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "instructor",
      headerName: "Instructor",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.instructor?.username,
    },
    {
      field: "slot",
      headerName: "Slot",
      width: 260,
      renderCell: (params) => (
        <div>
          {params.row.slot?.name} ( {params.row.slot?.startAt} -{" "}
          {params.row.slot?.endAt} )
        </div>
      ),
    },
    {
      field: "room",
      headerName: "Room",
      width: 260,
      valueGetter: (params: GridValueGetterParams) => params.row.room?.code,
    },
    {
      field: "date",
      headerName: "Date",
      type: "dateTime",
      width: 200,
      valueFormatter(params) {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "createAt",
      headerName: "Created At",
      type: "dateTime",
      width: 170,
      valueFormatter(params) {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "updateAt",
      headerName: "Updated At",
      type: "dateTime",
      width: 170,
      valueFormatter(params) {
        return new Date(params.value).toLocaleDateString();
      },
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
      width: 160,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-3">
          <button
            className="rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => handleView(params.row.id)}
          >
            <VisibilityIcon onClick={() => handleViewActivity(params.row.id)}/>
          </button>

          <button
            className="rounded bg-yellow-500 px-2 py-2 font-bold text-white hover:bg-yellow-600"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
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
          onClick={() => router.push("/manager/assign")}
        >
          {" "}
          <ArrowBackIcon /> List Assign
        </h1>
        <div className="flex justify-between items-center my-7">
          <h1 className="text-3xl font-bold italic text-slate-600"> Activities for Term {assignSchedule?.term?.name} - Course {assignSchedule?.course?.code} - Class {assignSchedule?.grade?.code}</h1>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={activities}
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
          <ModalActivity
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
