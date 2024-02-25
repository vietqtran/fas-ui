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

  const { user } = useSelector((state: RootState) => state.user);
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
  };

  const { courses } = useCourse();  

  const {
    setCourseId,
    setStudentId,
    setInstructorId,
    instructorId,
    studentId,
    courseId,
  } = useFeedBack();

  const [instructor, setInstructor] = useState({
    id: "cf578b9c-bf92-11ee-bdb8-106530543950",
    email: "datnd1@fpt.edu.vn",
    username: "datnd1",
    firstName: "nguyen",
    middleName: "dac",
    lastName: "dat",
    profileImage:
      "https://images.pexels.com/photos/14803768/pexels-photo-14803768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    phone: "0123456789",
    address: "Ha dong",
    birthDay: "2003-04-04T17:00:00.000+00:00",
    gender: true,
    status: true,
    campus: {
      id: 1,
      name: "FU_HL",
      location: "Hà Nội - Hòa Lạc",
      createAt: "2024-02-24T14:00:27",
      updateAt: "2024-02-24T14:00:27",
    },
    createAt: "2024-02-24T14:00:27",
    updateAt: "2024-02-24T14:00:27",
    idCard: "001123123123",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setAction("create");
    setId("");
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

  const handleUpdate = (courseId: string) => {
    setAction("update");
    setCourseId(courseId);
    setStudentId(user?.student?.id);
    setInstructorId(instructor.id);
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
                {courses.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      24/2/2024
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {instructor.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell>30/3/2024</TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <button
                          className="rounded bg-yellow-500 px-2 py-2 font-bold text-white hover:bg-yellow-600"
                          onClick={() => handleUpdate(row.id)}
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        id={id}
        action={action}
      />
    </div>
  );
};

export default page;
