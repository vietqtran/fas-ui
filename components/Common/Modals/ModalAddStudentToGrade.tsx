"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, FormControl, MenuItem, TextField } from "@mui/material";
import useStudent from "@/hooks/Student";
import useGrade from "@/hooks/Grade";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "70%", // Set height to 100%
  overflowY: "auto",
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};
interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  id: string;
  action: string;
  studentInGrade: any[];
}

export default function ModalAddStudentToGrade(props: Props) {
  const { open, handleClose, id, action, studentInGrade } = props;

  const { handleAddStudentToGrade, studentId, setStudentId } = useGrade();
  const { getGrade } = useGrade();
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  const [studentArray, setStudentArray] = React.useState(["1"]);
  const { students, fetchStudentByMajorAndCampus } = useStudent();
  const getData = async (id: string) => {
    const data = await getGrade(id);

    const data2 = await fetchStudentByMajorAndCampus(
      data?.major?.id,
      data?.campus?.id
    );
    setStudentArray(data2);
  };

  React.useEffect(() => {
    getData(id);
  }, [id]);

  const handleCheckboxChange = (event, studentId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        studentId,
      ]);
    } else {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((id) => id !== studentId)
      );
    }
  };

  const handleSubmit = (e) => {
    addStudentsToGrade();
  };

  const addStudentsToGrade = async () => {
    for (const studentId of selectedStudents) {
      await handleAddStudentToGrade(studentId, id);
    }
  };

  const filteredStudents = studentArray?.filter((student) => {
    return !studentInGrade.some((grade) => grade.id === student.id);
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "studentCode",
      headerName: "Code",
      width: 100,
    },
    { field: "email", headerName: "Email", width: 190 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "middleName", headerName: "Middle Name", width: 110 },
    { field: "lastName", headerName: "Last Name", width: 100 },
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
        <Checkbox
          checked={selectedStudents.includes(params.row.id)}
          onChange={(event) => handleCheckboxChange(event, params.row.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="flex justify-between">
                  <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                    List Student
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleClose}
              >
                Cancel
              </button>
              {action != "view" && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
