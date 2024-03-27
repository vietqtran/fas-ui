"use client";

import Header from "@/components/Common/Header";
import { updateAttendance } from "@/helpers/api/attendance";
import useActivity from "@/hooks/Activity";
import useAssignsChedule from "@/hooks/AssignSchedule";
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
    id: string;
  };
};

interface Result {
  index: number;
  studentCode: string;
  attend: string;
  note: string;
}

const page = (props: Props) => {
  const { id } = props.params;

  const [reload, setReload] = React.useState(false);
  const {
    fetchActivityByAssign,
    activities,
    getActivityDetail,
    activityDetail,
    setActivityDetail,
  } = useActivity();
  const { assignSchedule, setAssignSchedule, getAssignSchdule } =
    useAssignsChedule();

  const [dataArray, setDataArray] = useState<any>([]);

  const getData = async (id: string) => {
    try {
      const data = await getActivityDetail(id);
      console.log(data);
      const assign = await getAssignSchdule(data?.assign?.id);
      setAssignSchedule(assign);
      setDataArray(data.attendances);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  const [results, setResults] = useState([]);

  const handleSaveClick = (e) => {
    e.preventDefault();
    const newResults = dataArray.map((row, index) => {
      const idValue = document.getElementById(`id-${index}`).innerHTML || "";
      const attendValue = row?.status;
      const noteValue =
        (document.getElementById(`note-${index}`) as HTMLInputElement)?.value ||
        "";

      return {
        index: index + 1,
        studentCode: idValue,
        attend: attendValue,
        note: noteValue,
      };
    });
    setResults(newResults);

    results.forEach(async (result, index) => {
      const data = {
        content: result?.note,
        status: result?.attend,
      };
      console.log(result?.studentCode);

      console.log(data);
      await updateAttendance(result?.studentCode, data);
    });

    toast.success("Update success");
  };

  return (
    <div className="grid h-[100%] place-items-center bg-white text-black">
      <form
        onSubmit={handleSaveClick}
        className="container mx-auto py-5 text-gray-600"
      >
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
                {dataArray.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      id={`id-${index}`}
                      scope="row"
                      className="hidden"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {assignSchedule?.grade?.code}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img
                        src={row.student.profileImage}
                        alt={`Image ${row.index}`}
                        className="w-[150px] h-[150px] object-cover"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.student.studentCode}
                    </TableCell>
                    <TableCell>
                      {row.student.firstName +
                        " " +
                        row.student.lastName +
                        " " +
                        row.student.middleName}
                    </TableCell>
                    <TableCell>
                      <FormControl className="flex text-xs">
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={
                            row.status === true ? "attend" : "absent"
                          }
                          onChange={(e) => {
                            setDataArray(
                              dataArray.map((item) => {
                                if (item.id === row.id) {
                                  return {
                                    ...item,
                                    status: e.target.checked,
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                          name="radio-buttons-group"
                          id={`attend-${index}`}
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
                        id={`note-${index}`}
                        label="Note"
                        variant="outlined"
                        size="small"
                        defaultValue={row.content}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="mt-5 flex justify-center">
          <Button
            variant="contained"
            style={{ backgroundColor: "blue" }}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
