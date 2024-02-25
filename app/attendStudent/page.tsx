"use client";

import Header from "@/components/Common/Header";
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
import React from "react";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}
const page = () => {
  const rows = [
    {
      index: 1,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 123,
      firstName: "John",
      middleName: "-",
      lastName: "Doe",
      attend: "Yes",
      note: "-",
    },
    {
      index: 2,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 456,
      firstName: "Jane",
      middleName: "-",
      lastName: "Doe",
      attend: "Yes",
      note: "-",
    },
    {
      index: 3,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 789,
      firstName: "Michael",
      middleName: "A.",
      lastName: "Smith",
      attend: "No",
      note: "Excused",
    },
    {
      index: 4,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 234,
      firstName: "Emily",
      middleName: "-",
      lastName: "Johnson",
      attend: "Yes",
      note: "-",
    },
    {
      index: 5,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 567,
      firstName: "David",
      middleName: "M.",
      lastName: "Brown",
      attend: "Yes",
      note: "-",
    },
    {
      index: 6,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 890,
      firstName: "Sarah",
      middleName: "-",
      lastName: "Lee",
      attend: "Yes",
      note: "-",
    },
    {
      index: 7,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 321,
      firstName: "Christopher",
      middleName: "J.",
      lastName: "Taylor",
      attend: "No",
      note: "Absent",
    },
    {
      index: 8,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 654,
      firstName: "Jessica",
      middleName: "-",
      lastName: "Martinez",
      attend: "Yes",
      note: "-",
    },
    {
      index: 9,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 987,
      firstName: "Matthew",
      middleName: "-",
      lastName: "Anderson",
      attend: "Yes",
      note: "-",
    },
    {
      index: 10,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 876,
      firstName: "Ashley",
      middleName: "R.",
      lastName: "Clark",
      attend: "No",
      note: "Excused",
    },
    {
      index: 11,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 543,
      firstName: "Andrew",
      middleName: "-",
      lastName: "White",
      attend: "Yes",
      note: "-",
    },
    {
      index: 12,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 210,
      firstName: "Amanda",
      middleName: "-",
      lastName: "Walker",
      attend: "Yes",
      note: "-",
    },
    {
      index: 13,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 999,
      firstName: "Jason",
      middleName: "S.",
      lastName: "King",
      attend: "No",
      note: "Absent",
    },
    {
      index: 14,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 888,
      firstName: "Brittany",
      middleName: "-",
      lastName: "Hill",
      attend: "Yes",
      note: "-",
    },
    {
      index: 15,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 777,
      firstName: "Kevin",
      middleName: "-",
      lastName: "Carter",
      attend: "Yes",
      note: "-",
    },
    {
      index: 16,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 666,
      firstName: "Stephanie",
      middleName: "L.",
      lastName: "Scott",
      attend: "No",
      note: "-",
    },
    {
      index: 17,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 555,
      firstName: "Ryan",
      middleName: "-",
      lastName: "Adams",
      attend: "Yes",
      note: "-",
    },
    {
      index: 18,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 444,
      firstName: "Megan",
      middleName: "-",
      lastName: "Evans",
      attend: "Yes",
      note: "-",
    },
    {
      index: 19,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 333,
      firstName: "Justin",
      middleName: "-",
      lastName: "Turner",
      attend: "No",
      note: "Absent",
    },
    {
      index: 20,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 222,
      firstName: "Lauren",
      middleName: "-",
      lastName: "Parker",
      attend: "Yes",
      note: "-",
    },
    {
      index: 21,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 111,
      firstName: "Eric",
      middleName: "J.",
      lastName: "Cook",
      attend: "Yes",
      note: "-",
    },
    {
      index: 22,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 0,
      firstName: "Rachel",
      middleName: "-",
      lastName: "Morris",
      attend: "No",
      note: "Excused",
    },
    {
      index: 23,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 789,
      firstName: "Brandon",
      middleName: "-",
      lastName: "Wood",
      attend: "Yes",
      note: "-",
    },
    {
      index: 24,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 654,
      firstName: "Samantha",
      middleName: "-",
      lastName: "Reed",
      attend: "Yes",
      note: "-",
    },
    {
      index: 25,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 321,
      firstName: "Nicole",
      middleName: "-",
      lastName: "Phillips",
      attend: "No",
      note: "-",
    },
    {
      index: 26,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 987,
      firstName: "Tyler",
      middleName: "A.",
      lastName: "Morris",
      attend: "Yes",
      note: "-",
    },
    {
      index: 27,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 456,
      firstName: "Kayla",
      middleName: "-",
      lastName: "Bell",
      attend: "Yes",
      note: "-",
    },
    {
      index: 28,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 654,
      firstName: "Benjamin",
      middleName: "-",
      lastName: "Reed",
      attend: "No",
      note: "Absent",
    },
    {
      index: 29,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 987,
      firstName: "Vanessa",
      middleName: "-",
      lastName: "Lewis",
      attend: "Yes",
      note: "-",
    },
    {
      index: 30,
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      code: 123,
      firstName: "Austin",
      middleName: "-",
      lastName: "Nelson",
      attend: "Yes",
      note: "-",
    },
  ];

  return (
    <div className="grid h-[100%] place-items-center bg-white text-black">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-5">
          <h1 className="text-3xl">Take attendance</h1>
          <p className="my-5">
            Attendance for hoann6 at slot 3 on Monday 19/02/2024 ar room
            DE-C210.This is the session number 11 of the course
          </p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#6b90da" }}>
                  <TableCell>Index</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Attend</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.index}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.index}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img
                        src={row.image}
                        alt={`Image ${row.index}`}
                        width={150}
                        height={150}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell>
                      {row.firstName +
                        " " +
                        row.lastName +
                        " " +
                        row.middleName}
                    </TableCell>
                    <TableCell>
                      <FormControl className="flex text-xs">
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="absent"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="attend"
                            control={<Radio />}
                            label="Attend"
                          />
                          <FormControlLabel
                            value="absent"
                            control={<Radio />}
                            label="Absent"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-basic"
                        label="Note"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="mt-5 flex justify-center">
          <Button variant="contained" style={{ backgroundColor: "blue" }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
