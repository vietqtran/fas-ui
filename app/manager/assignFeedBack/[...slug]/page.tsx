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
import useAssignFeedBack from "@/hooks/AssignFeedBack";
import ModalFeedback from "@/components/Common/Modals/ModalFeedback";
import useFeedBack from "@/hooks/FeedBack";
type Props = {
  params: {
    slug: string;
  };
};

const page = (props: Props) => {
  const { slug } = props.params;
  const { getGrade, handleDeleteStudentToGrade, grade, setGrade } = useGrade();
  const [reload, setReload] = React.useState(false);

  const [feedbackArray, setFeedbackArray] = React.useState([]);
  const { getAssignFeedBack } = useAssignFeedBack();
  const { deleteFeedBack } = useFeedBack();
  const [title, setTitle] = React.useState("");
  const [feedback, setFeedBack] = useState({
    id: "",
    createAt: "",
    endDate: "",
    grade: { code: "", id: "" },
    instructor: {
      id: "",
      username: "",
    },
    startDate: "",
    status: true,
    updateAt: "",
  });
  const getData = async (id: string) => {
    const data = await getAssignFeedBack(id);
    setFeedbackArray(data.feedBacks);
    setTitle(`Class ${data?.grade?.code} - ${data?.instructor?.username}`);
    setGrade(data);
    setId(slug[0]);
  };

  useEffect(() => {
    getData(slug[0]);
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
  const handleView = async (data) => {
    setFeedBack(data);
    setAction("view");
    setOpen(true);
  };

  const handleDelete = (studentId: string) => {
    deleteFeedBack(studentId);
    setReload(!reload);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 170 },
    {
      field: "student",
      headerName: "Student",
      width: 240,
      renderCell: (params) => (
        <div color="primary" onClick={() => handleView(params.row.id)}>
          {params.row.student.username}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 310,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 310,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <div style={{ color: params.row.status ? "green" : "red" }}>
          {params.row.status ? "Active" : "Inactive"}
        </div>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 310,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-3">
          <button
            className="rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => handleView(params.row)}
          >
            <VisibilityIcon />
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
          onClick={() => router.push("/manager/assignFeedBack")}
        >
          {" "}
          <ArrowBackIcon /> List FeedBack
        </h1>
        <div className="flex justify-between items-center my-7">
          <h1 className="text-3xl font-bold italic text-slate-600">{title}</h1>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={feedbackArray}
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
          <ModalFeedback
            open={open}
            handleClose={handleClose}
            feedback={feedback}
            id={id}
            action={action}
          />
        </div>
      </div>
    </ManagerLayout>
  );
};

export default page;
