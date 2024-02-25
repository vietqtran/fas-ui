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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import useMajor from "@/hooks/Major";
type Props = {
  params: {
    slug: string;
  };
};

const page = (props: Props) => {
  const { slug } = props.params;
  const { getGrade, handleDeleteStudentToGrade, setGradeByMajor, gradeByMajor, fetchGradeByMajor,deleteGrade } = useGrade();
  const { getMajor } = useMajor();
  const [reload, setReload] = React.useState(false);
    const [major, setMajor] = useState({code:""});
  const getData = async (id: string) => {
    const data = await fetchGradeByMajor(id);
    const data2 = await getMajor(id);
    setMajor(data2);
    setGradeByMajor(data);
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
        <h1 className="text-3xl font-bold my-5 hover:cursor-pointer" onClick={() => router.push("/manager/majors")}> <ArrowBackIcon/> List Major</h1>
        <div className="flex justify-between items-center my-7">
          <h1 className="text-3xl font-bold italic text-slate-600">Major {major.code}</h1>
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
            rows={gradeByMajor}
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
