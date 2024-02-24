"use client";
import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import useCourse from "@/hooks/Course";
import useMajor from "@/hooks/Major";
import useStudent from "@/hooks/Student";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const rows = Array.from({ length: 30 }, (_, index) => index + 1);

const page = () => {
  const {
    idCard,
    setIdCard,
    gender,
    setGender,
    id,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    birthDay,
    setBirthDay,
    phone,
    setPhone,
    majorId,
    setMajorId,
    email,
    setEmail,
    studentCode,
    setStudentCode,
    username,
    setUsername,
    address,
    setAddress,
    profileImage,
    setProfileImage,
    createStudent,
    fetchStudents,
    getStudent,
    setId,
    handleUpdateStudent,
    campusId,
    setCampusId,
    campuses,
    fetchStudentByEmail,
  } = useStudent();

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
    setEmail(data?.email);
    setUsername(data?.username);
    setProfileImage(data?.profileImage);
    setFirstName(data?.firstName);
    setMiddleName(data?.middleName);
    setLastName(data?.lastName);
    setBirthDay(data?.birthDay.split("T")[0]);
    setPhone(data?.phone);
    setAddress(data?.address);
    setId(data?.id);
    setIdCard(data?.idCard);
    setCampusId(data?.campus?.id);
    setMajorId(data?.major?.id);
    setStudent(data);
  };


  return (
    <div className="min-h-[100vh] h-[100%] w-[100vw] bg-white text-black ">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl text-center font-semibold text-black">
            Student{" "}
            {student?.firstName +
              " " +
              student?.middleName +
              " " +
              student?.lastName}
            ({student?.studentCode}) -{" "}
            <b className="text-red-600">{user?.student?.major?.code}</b>
          </h1>
          <p className="text-2xl font-bold text-slate-600 my-5">Curiculum</p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#6b90da" }}>
                  <TableCell>Index</TableCell>
                  <TableCell>Subject Code</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Term No</TableCell>
                  <TableCell>Credit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.major.courses.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      2
                    </TableCell>
                    <TableCell>{row.noCredit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default page;
