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
import React, { use, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
import ModalStudent from "@/components/Common/Modals/ModalStudent";
import ModalAddStudentToGrade from "@/components/Common/Modals/ModalAddStudentToGrade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
type Props = {
  params: {
    slug: string;
  };
};

const page = (props: Props) => {
  const { slug } = props.params;
  const { getGrade, handleDeleteStudentToGrade, grade, setGrade } = useGrade();
  const [reload, setReload] = React.useState(false);
  const { students, fetchStudentByMajorAndCampus } = useStudent();
  const [studentArray, setStudentArray] = React.useState([]);
  const getData = async (id: string) => {
    const data = await getGrade(id);
    const data2 = await fetchStudentByMajorAndCampus(
      data?.major?.id,
      data?.campus?.id
    );
    setStudentArray(data2);
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
  const [openView, setOpenView] = React.useState(false);
  const handleView = async (idStudent: string) => {
    setAction("view");
    setId(idStudent);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleDelete = (studentId: string) => {
    handleDeleteStudentToGrade(studentId, slug[0]);
    setReload(!reload);
  };

  const filteredStudents = studentArray?.filter((student) => {
    return !grade?.students.some((grade) => grade.id === student.id);
  });

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
            className="rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => handleView(params.row.id)}
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
          onClick={() => router.push("/manager/grades")}
        >
          {" "}
          <ArrowBackIcon /> List Grade
        </h1>
        <div className="flex justify-between items-center my-7">
          <h1 className="text-3xl font-bold italic text-slate-600">
            Class {grade?.code}
          </h1>
          <button
            className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add Student to Class
          </button>
        </div>

        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={filteredStudents}
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
          <ModalAddStudentToGrade
            open={open}
            handleClose={handleClose}
            id={id}
            action={action}
            studentInGrade={filteredStudents}
          />
          <ModalStudent
            open={openView}
            handleClose={handleCloseView}
            id={id}
            action={action}
          />
        </div>
      </div>
    </ManagerLayout>
  );
};

export default page;
