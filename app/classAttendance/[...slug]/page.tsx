"use client";

import Header from "@/components/Common/Header";
import { updateAttendance } from "@/helpers/api/attendance";
import useActivity from "@/hooks/Activity";
import useAssignsChedule from "@/hooks/AssignSchedule";
import useGrade from "@/hooks/Grade";
import { South } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  params: {
    slug: string;
  };
};

interface Result {
  index: number;
  studentCode: string;
  attend: string;
  note: string;
}

const page = (props: Props) => {
  const { slug } = props.params;
  const { getListActivity, listActivityClass } = useActivity();
  const { assignSchedule, setAssignSchedule, getAssignSchdule } =
    useAssignsChedule();

  const { grade, getGrade } = useGrade();

  const getData = async (termId: string, courseId: string, classId: string) => {
    try {
      const data = await getListActivity(termId, courseId, classId);
      await getGrade(classId);
      await getAssignSchdule(data[0]?.assign?.id);
    } catch (error) {}
  };

  useEffect(() => {
    getData(slug[1], slug[3], slug[5]);
  }, []);

  const currentDate = new Date();

  const caculcateAvg = (studentId: string) => {
    const newArray = [];
    const newArray2 = [];

    const data = listActivityClass?.map((item, index) => {
      item?.attendances?.map((item2) => {
        if (item2?.student?.id === studentId) {
          newArray.push(item2);
        }
      });
    });
    
    const data1 = listActivityClass?.map((item, index) => {
      const rowDate = new Date(item?.date);
      item?.attendances?.map((item2) => {
        if (item2?.student?.id === studentId && item2?.status === false && rowDate <= currentDate) {
          newArray2.push(item2);
        }
      });
    });
  
    return (newArray2.length / newArray.length) * 100;
  };

  return (
    <div className="grid h-[100%] place-items-center bg-white text-black py-10">
      <form className="container text-gray-600">
        <Header />
        <div className="mt-5">
          <h1 className="text-3xl my-5">
            Summary attendance of class {assignSchedule?.grade?.code} course{" "}
            {assignSchedule?.course?.code}
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#6b90da" }}>
                  <TableCell>Index</TableCell>
                  <TableCell>FullName</TableCell>
                  <TableCell>Rate</TableCell>
                  {listActivityClass.map((item, index) => (
                    <TableCell key={item.id} className="text-sm">
                      {item.date}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {grade?.students?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.firstName +
                        " " +
                        row.lastName +
                        " " +
                        row.middleName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {caculcateAvg(row?.id) > 20 ? (
                        <span className="text-red-500">
                          {Math.round(caculcateAvg(row?.id))}%
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          {Math.round(caculcateAvg(row?.id))}%
                        </span>
                      )}
                    </TableCell>
                    {listActivityClass.map((item, itemIndex) => {
                      return item?.attendances?.map(
                        (studentAttendance, attendanceIndex) => {
                          const date = new Date(item?.date);
                          if (row.id === studentAttendance?.student?.id) {
                            if (currentDate >= date) {
                              return (
                                <TableCell
                                  key={`cell-${item.id}-${attendanceIndex}`}
                                  id={`id-${item.id}-${attendanceIndex}`}
                                >
                                  {studentAttendance?.status ? (
                                    <span className="text-green-500">
                                      present
                                    </span>
                                  ) : (
                                    <span className="text-red-500">absent</span>
                                  )}
                                </TableCell>
                              );
                            }
                            else {
                              return (<TableCell>
                                <span className="text-gray-500">Future</span>
                              </TableCell>);
                            }
                          } else {
                            return null; // Return null if condition doesn't match to avoid rendering undefined
                          }
                        }
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </form>
    </div>
  );
};

export default page;
