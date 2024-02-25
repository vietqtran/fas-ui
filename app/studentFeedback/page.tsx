"use client";
import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import useCourse from "@/hooks/Course";
import useFeedBack from "@/hooks/FeedBack";
import { useRouter } from "next/navigation";
import ModalFeedback from "@/components/Common/Modals/ModalFeedback";
import useStudent from "@/hooks/Student";
import useGrade from "@/hooks/Grade";
import useAssignFeedBack from "@/hooks/AssignFeedBack";
const rows = Array.from({ length: 30 }, (_, index) => index + 1);

const page = () => {
  const { fetchStudentByEmail } = useStudent();

  let [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDay: "",
    phone: "",
    major: {
      courses: [],
    },
    campusId: "",
    studentCode: "",
    username: "",
    address: "",
    profileImage: "",
    id: "",
    email: "",
    gender: true,
    idCard: "",
  });

  const { getGradeStudent } = useGrade();
  const { getAssignFeedBackGrade } = useAssignFeedBack();
  const [arrayFeedBack, setArrayFeedBack] = useState([]);
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
  const { user } = useSelector((state: RootState) => state.user);

  const {studentId, setStudentId , assignFeedBackId, setAssignFeedBackId} = useFeedBack();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    handleGetStudent(user.email ?? "");
  }, []);

  const handleGetStudent = async (emailStudent) => {
    let data = await fetchStudentByEmail(emailStudent);
    setStudent(data);
    let data2 = await getGradeStudent(data?.id);
    let data3 = await getAssignFeedBackGrade(data2[0]?.id);
    setArrayFeedBack(data3);
  };

  const { courses } = useCourse();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) => {
    setOpen(true);
    setAction("create");
    setFeedBack(data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [id, setId] = React.useState("");

  const [action, setAction] = React.useState("");

  const handleView = async (idEvent: string) => {
    setAction("view");
    setOpen(true);
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-white text-black ">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl my-5 text-left font-semibold text-black">
            List of feedbacks for{" "}
            {student?.firstName +
              " " +
              student?.middleName +
              " " +
              student?.lastName}{" "}
            ({student?.studentCode})
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#6b90da" }}>
                  <TableCell>GROUPNAME</TableCell>
                  <TableCell>OPENDAY</TableCell>
                  <TableCell>LECTURER</TableCell>
                  <TableCell>SUBJECTS</TableCell>
                  <TableCell>CLOSINGDATE</TableCell>
                  <TableCell>DO FEEDBACK</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arrayFeedBack &&
                  arrayFeedBack.map(
                    (row, index) =>
                      row.status === true && (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.grade.code}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {new Date(row.startDate).toLocaleDateString(
                              "en-US"
                            )}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.instructor.username}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            CSI
                          </TableCell>
                          <TableCell>
                            {" "}
                            {new Date(row.endDate).toLocaleDateString("en-US")}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-3">
                              <button
                                className="rounded bg-yellow-500 px-2 py-2 font-bold text-white hover:bg-yellow-600"
                                onClick={() => handleOpen(row)}
                              >
                                <EditIcon />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        id={id}
        feedback={feedback}
        action={action}
      />
    </div>
  );
};

export default page;
