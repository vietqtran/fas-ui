"use client";

import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import useActivity from "@/hooks/Activity";
import useAssignsChedule from "@/hooks/AssignSchedule";
import useStudent from "@/hooks/Student";
import useTerm from "@/hooks/Term";
import { South } from "@mui/icons-material";
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
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const rows = Array.from({ length: 30 }, (_, index) => index + 1);

const page = () => {
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    handleGetStudent(user.email);
  }, []);
  const { fetchTerms, terms } = useTerm();

  const {
    getAssignSchduleByStudentAndTerm,
    listAssignByStudentAndTerm,
    activityOfAssign,
    getDetailAssign,
  } = useAssignsChedule();

  const [selectedTerm, setSelectedTerm] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [selectedGrade, setSelectedGrade] = useState(null);

  const [gradeCode, setGradeCode] = useState(null);

  const handleTermClick = (termId: string) => {
    setSelectedTerm(termId);
    fetchCourse(termId);
  };

  const handleCourseClick = (
    courseId: string,
    gradeId: string,
    gradeCode: string
  ) => {
    setSelectedCourse(courseId);
    setSelectedGrade(gradeId);
    setGradeCode(gradeCode);
    getActivity(courseId, gradeId);
  };

  let [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDay: "",
    phone: "",
    major: {
      code: "",
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

  const [dataArray, setData] = useState([]);

  const fetchCourse = async (termId: string) => {
    try {
      const data = await getAssignSchduleByStudentAndTerm(
        termId,
        user?.student?.id
      );
      console.log(data);
    } catch (error) {}
  };

  const getActivity = async (courseId: string, gradeId: string) => {
    try {
      const data = await getDetailAssign(courseId, gradeId, selectedTerm);
      setData(data);
    } catch (error) {}
  };

  const { fetchStudentByEmail } = useStudent();

  const handleGetStudent = async (email) => {
    let data = await fetchStudentByEmail(email);
    setStudent(data);
  };

  const currentDate = new Date();

  const caculcateAvg = (studentId: string) => {
    const newArray = [];
    const newArray2 = [];

    const data = activityOfAssign?.map((item, index) => {
      item?.attendances?.map((item2) => {
        if (item2?.student?.id === studentId) {
          newArray.push(item2);
        }
      });
    });

    return (caculateAbsent(studentId) / newArray.length) * 100;
  };

  const caculateAbsent = (studentId: string) => {
    const newArray2 = [];
    const data1 = activityOfAssign?.map((item, index) => {
      const rowDate = new Date(item?.date);
      item?.attendances?.map((item2) => {
        if (
          item2?.student?.id === studentId &&
          item2?.status === false &&
          rowDate <= currentDate
        ) {
          newArray2.push(item2);
        }
      });
    });
    return newArray2.length;
  };

  return (
    <div className="min-h-[100vh] h-[100%] w-[100%] bg-white text-black overflow-x-hidden">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl">
            View attendance for{" "}
            {student?.firstName +
              " " +
              student?.middleName +
              " " +
              student?.lastName}{" "}
            ({student?.username})
          </h1>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <h2 className="text-xl text-center my-10">
                Select a campus/program, term, course ...
              </h2>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#6b90da" }}>
                      <TableCell style={{ width: "13%" }}>Campus</TableCell>
                      <TableCell style={{ width: "23%" }}>Term</TableCell>
                      <TableCell style={{ width: "74%" }}>Course</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child TableCell, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="align-top"
                      >
                        FU_HL
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="align-top"
                      >
                        {terms.map((term) => (
                          <Link
                            href={`?id=${student.id};term=${term.id}`}
                            key={term.id}
                            onClick={() => handleTermClick(term.id)}
                            style={{
                              fontWeight:
                                selectedTerm === term.id ? "bold" : "normal",
                            }}
                          >
                            {term.name}
                            <br />
                          </Link>
                        ))}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="align-top"
                      >
                        {listAssignByStudentAndTerm?.map((item) => (
                          <Link
                            href={`?id=${student.id};term=${selectedTerm};course=${item?.course.id}`}
                            key={item?.course.id}
                            style={{
                              fontWeight:
                                selectedCourse === item?.course.id
                                  ? "bold"
                                  : "normal",
                            }}
                            onClick={() =>
                              handleCourseClick(
                                item?.course.id,
                                item?.grade?.id,
                                item?.grade?.code
                              )
                            }
                          >
                            {item?.course?.name} ({item?.course?.code})
                            <br />
                          </Link>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="col-span-8">
              <h2 className="text-xl text-center my-10">... then see report</h2>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#6b90da" }}>
                      <TableCell>No</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Slot</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Lecture</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Attendance Status</TableCell>
                      <TableCell>Lecture's comment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activityOfAssign &&
                      activityOfAssign.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <span
                              className="p-1"
                              style={{
                                backgroundColor: "#337ab7",
                                color: "white",
                              }}
                            >
                              {row?.date}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className="p-1"
                              style={{
                                backgroundColor: "#d9534f",
                                color: "white",
                              }}
                            >
                              {row?.slot?.name} ({row?.slot?.startAt} -{" "}
                              {row?.slot?.endAt})
                            </span>
                          </TableCell>
                          <TableCell>{row?.room?.code}</TableCell>
                          <TableCell>{row?.instructor?.username}</TableCell>
                          <TableCell>{gradeCode}</TableCell>
                          <TableCell>
                            {row?.attendances?.map((item) => {
                              if (item?.student?.id === student?.id) {
                                const rowDate = new Date(row?.date);
                                if (rowDate <= currentDate) {
                                  return item?.status ? (
                                    <span className="text-green-500">
                                      Attend
                                    </span>
                                  ) : (
                                    <span className="text-red-500">Absent</span>
                                  );
                                } else {
                                  return (
                                    <span className="text-gray-500">
                                      Future
                                    </span>
                                  );
                                }
                              }
                            })}
                          </TableCell>
                          <TableCell>
                            {row?.attendances?.map((item) => {
                              if (item?.student?.id === student?.id) {
                                return item?.content;
                              }
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    {activityOfAssign.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="font-bold text-2xl">
                          ABSENT:{" "}
                          {caculcateAvg(student?.id) > 20 ? (
                            <span className="text-red-500">
                              {Math.round(caculcateAvg(student?.id))}%
                            </span>
                          ) : (
                            <span className="text-gray-500">
                              {Math.round(caculcateAvg(student?.id))}%
                            </span>
                          )}{" "}
                          ABSENT SO FAR ({caculateAbsent(student?.id)} ABSENT ON {activityOfAssign.length}{" "}
                          TOTAL).
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
