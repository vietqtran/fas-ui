"use client";
import Header from "@/components/Common/Header";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const rows = Array.from({ length: 30 }, (_, index) => index + 1);

const page = () => {
  return (
    <div className="h-[100%] w-[100%] bg-white text-black overflow-x-hidden">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl">
            View attendance for Nguyễn Đắc Đạt (datndhe172134)
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
                        <a href="?id=HE172134&amp;campus=3&amp;term=18">
                          Summer2017
                        </a>
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=19">
                          Fall2017
                        </a>
                        <br />
                        <b>Fall2022</b>
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=38">
                          Spring2023
                        </a>
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=39">
                          Summer2023
                        </a>
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=40">
                          Fall2023
                        </a>
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=41">
                          Spring2024
                        </a>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="align-top"
                      >
                        <b>
                          Mathematics for Engineering(MAE101)(SE1748,start
                          05/09/2022)
                        </b>
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=37&amp;course=27110">
                          Computer Organization and Architecture(CEA201)
                        </a>
                        (SE1748,start 05/09/2022)
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=37&amp;course=27135">
                          Introduction to Computer Science(CSI104)
                        </a>
                        (SE1748,start 06/09/2022)
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=37&amp;course=27574">
                          Programming Fundamentals(PRF192)
                        </a>
                        (SE1748,start 13/09/2022)
                        <br />
                        <a href="?id=HE172134&amp;campus=3&amp;term=37&amp;course=28030">
                          Academic Skills for University Success(SSL101c)
                        </a>
                        (SE1748,start 14/09/2022)
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
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <span
                            className="p-1"
                            style={{ backgroundColor: "#337ab7" }}
                          >
                            Monday 05/09/2022
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className="p-1"
                            style={{ backgroundColor: "#d9534f" }}
                          >
                            4_(12:50-14:20)
                          </span>
                        </TableCell>
                        <TableCell>DE-220</TableCell>
                        <TableCell>KhanhH</TableCell>
                        <TableCell>SE1748</TableCell>
                        <TableCell>
                          <span className="text-green-500">Present</span>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
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
