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
    id: string;
  };
};

const page = (props: Props) => {
  const { id } = props.params;
  console.log(id);

  const [reload, setReload] = React.useState(false);
  const {
    fetchActivityByAssign,
    activities,
    getActivityDetail,
    activityDetail,
    setActivityDetail,
  } = useActivity();
  const { assignSchedule, setAssignSchedule, getAssignSchdule } =
    useAssignsChedule();

  const [dataArray, setDataArray] = useState<any>([]);

  const getData = async (id: string) => {
    try {
      const data = await getActivityDetail(id);
      console.log(data);
      setActivityDetail(data);
      setDataArray(data.attendances);
    } catch (error) {}
  };

  useEffect(() => {
    getData(id);
  }, []);

  const router = useRouter();

  const handleViewActivity = async (idActivity: string) => {
    router.push(`/manager/activities/${idActivity}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.student?.username,
    },
    {
      field: "fullname",
      headerName: "fullName",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.student?.firstName +
        " " +
        params.row.student?.middleName +
        " " +
        params.row.student?.lastName,
    },
    {
      field: "code",
      headerName: "Student Code",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.student?.studentCode,
    },
    {
      field: "instructor",
      headerName: "Instructor",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        activityDetail.instructor?.username,
    },
    {
      field: "slot",
      headerName: "Slot",
      width: 260,
      renderCell: (params) => (
        <div>
          {activityDetail.slot?.name} ( {activityDetail.slot?.startAt} -{" "}
          {activityDetail.slot?.endAt} )
        </div>
      ),
    },
    {
      field: "room",
      headerName: "Room",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => activityDetail.room?.code,
    },
    {
      field: "date",
      headerName: "Date",
      type: "dateTime",
      width: 150,
      valueFormatter(params) {
        return new Date(activityDetail.date).toLocaleDateString();
      },
    },
    {
      field: "createAt",
      headerName: "Created At",
      type: "dateTime",
      width: 150,
      valueFormatter(params) {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "updateAt",
      headerName: "Updated At",
      type: "dateTime",
      width: 150,
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
          {params.row.status ? "Attend" : "Absent"}
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
          <ArrowBackIcon /> List Activity
        </h1>
        <div className="flex justify-between items-center my-7">
          <h1 className="text-3xl font-bold italic text-slate-600"></h1>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={dataArray}
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
    </ManagerLayout>
  );
};

export default page;
