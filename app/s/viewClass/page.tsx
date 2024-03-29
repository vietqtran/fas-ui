"use client";

import Header from "@/components/Common/Header";
import useCourse from "@/hooks/Course";
import useGrade from "@/hooks/Grade";
import useMajor from "@/hooks/Major";
import useStudent from "@/hooks/Student";
import {
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChatIcon from "@mui/icons-material/Chat";
import FilterListIcon from "@mui/icons-material/FilterList";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React from "react";
import useTerm from "@/hooks/Term";
import { useSelector } from "react-redux";
import { RootState } from "@/helpers/redux/reducers";
import useChat from "@/hooks/Chat";
import { useRouter } from "next/navigation";

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
  const campus = "FU-HL";

  const { terms } = useTerm();
  const { majors } = useMajor();
  const { courseMajorId, setCourseMajorId, courses } = useCourse();
  const { courseId, setCourseId, grades, gradeTermId, setGradeTermId } =
    useGrade();
  const {
    gradeId,
    setGradeId,
    gradeStudents,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    setCourseStudentId,
    majorId,
    setMajorId,
    searchValue,
    setSearchValue,
    order,
    setOrder,
    setStudentTermId,
  } = useStudent();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage.toString());
  };

  const handleTermClick = (termId: string) => {
    setGradeTermId(termId);
    setStudentTermId(termId);
  };

  const handleMajorClick = (majorId: string) => {
    setCourseMajorId(majorId);
    const selectedMajor = majors.find((major) => major.id === majorId);

    if (
      selectedMajor &&
      selectedMajor.courses &&
      selectedMajor.courses.length > 0
    ) {
      handleCourseClick(selectedMajor.courses[0].id);
    }
  };

  const handleCourseClick = (courseId: string) => {
    setCourseId(courseId);
    setCourseStudentId(courseId);
    setCurrentPage("1");
    const selectedCourse = courses.find((course) => course.id === courseId);
    if (
      selectedCourse &&
      selectedCourse.grades &&
      selectedCourse.grades.length > 0
    ) {
      setGradeId(selectedCourse.grades[0].id);
    }
  };

  const handleRefresh = () => {
    setMajorId("");
    setOrder("");
    setSearchValue("");
  };

  const { handleCreateChat } = useChat();

  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const handleClickChat = (studentId: string) => {
    if (user?.role?.name === "STUDENT") {
      handleCreateChat(user.student.id, studentId);
      router.push("/s/message");
    }
  };

  return (
    <div className="grid min-h-[100vh] h-[100%] place-items-center bg-white text-black">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-5">
          <h1 className="text-3xl text-gray-400">
            Select a course, then a group ...
          </h1>
          <div className="my-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#6b90da" }}>
                    <TableCell
                      style={{ width: "10%", borderRight: "1px solid white" }}
                    >
                      CAMPUS
                    </TableCell>
                    <TableCell
                      style={{ width: "10%", borderRight: "1px solid white" }}
                    >
                      TERM
                    </TableCell>
                    <TableCell
                      style={{ width: "20%", borderRight: "1px solid white" }}
                    >
                      MAJOR
                    </TableCell>
                    <TableCell
                      style={{ width: "30%", borderRight: "1px solid white" }}
                    >
                      COURSE
                    </TableCell>
                    <TableCell
                      style={{ width: "30%", borderRight: "1px solid white" }}
                    >
                      GROUP
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="align-top" component="th" scope="row">
                      <span className="font-bold">{campus}</span>
                    </TableCell>
                    <TableCell className="align-top" component="th" scope="row">
                      {terms.map((term, index) => (
                        <div
                          onClick={() => handleTermClick(term.id)}
                          key={index + 1}
                        >
                          <span
                            className={
                              term.id === gradeTermId
                                ? "font-bold"
                                : `text-blue-600 cursor-pointer hover:text-blue-900 hover:underline`
                            }
                          >
                            {term.name}
                          </span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="align-top" component="th" scope="row">
                      {majors.map((major, index) => (
                        <div
                          onClick={() => handleMajorClick(major.id)}
                          key={index + 1}
                        >
                          <span
                            className={
                              courseMajorId === major.id
                                ? "font-bold"
                                : "text-blue-600 cursor-pointer hover:text-blue-900 hover:underline"
                            }
                          >
                            {major.name}
                          </span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="align-top" component="th" scope="row">
                      {courses.map((course, index) => (
                        <div
                          onClick={() => handleCourseClick(course.id)}
                          key={index + 1}
                        >
                          <span
                            className={
                              courseId === course.id
                                ? "font-bold"
                                : `text-blue-600 cursor-pointer hover:text-blue-900 hover:underline`
                            }
                          >
                            {course.name}
                          </span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="align-top" component="th" scope="row">
                      <div className="flex flex-wrap">
                        {grades.map((grade, index) => (
                          <div
                            onClick={() => {
                              setGradeId(grade.id);
                              setCurrentPage("1");
                            }}
                            className="w-1/6"
                            key={index + 1}
                          >
                            <span
                              className={
                                gradeId === grade.id
                                  ? "font-bold"
                                  : `text-blue-600 cursor-pointer hover:text-blue-900 hover:underline`
                              }
                            >
                              {grade.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="my-3">
                        <h1 className="text-3xl text-gray-400">
                          ... then see student list
                        </h1>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>

          <div className="my-8">
            <div className="flex space-x-5">
              <div className="w-1/6 sticky top-0">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <FilterListIcon />
                          <span>SORT AND FILTER</span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className="space-y-3">
                          <FormControl>
                            <FormLabel id="sort-code">Sort by code</FormLabel>
                            <RadioGroup
                              aria-labelledby="sort-code"
                              name="radio-buttons-group"
                              onChange={(e) => setOrder(e.target.value)}
                            >
                              <FormControlLabel
                                checked={order === "ASC"}
                                value="ASC"
                                control={<Radio />}
                                label="Ascending"
                              />
                              <FormControlLabel
                                checked={order === "DESC"}
                                value="DESC"
                                control={<Radio />}
                                label="Descending"
                              />
                            </RadioGroup>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="space-y-3">
                          <FormControl>
                            <FormLabel id="filter-major">Major</FormLabel>
                            <RadioGroup
                              aria-labelledby="filter-major"
                              name="radio-buttons-group"
                              onChange={(e) => setMajorId(e.target.value)}
                            >
                              {majors.map((major, index) => (
                                <FormControlLabel
                                  checked={majorId === major.id}
                                  key={index + 1}
                                  value={major.id}
                                  control={<Radio />}
                                  label={major.code}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="w-5/6">
                <div className="mb-5 flex items-center gap-3">
                  <button
                    onClick={handleRefresh}
                    className="rounded bg-gray-700 px-4 py-3 font-bold text-white hover:bg-gray-600 flex items-center gap-1"
                  >
                    <span>Refresh</span>
                    <RefreshIcon />
                  </button>
                  <div className=" flex h-12 flex-1 items-center overflow-hidden rounded-lg border border-gray-400 bg-white transition duration-300 ease-in-out focus-within:border-gray-300 focus-within:shadow-lg">
                    <div className="grid h-full w-12 place-items-center text-gray-300">
                      <SearchIcon />
                    </div>

                    <input
                      className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
                      type="text"
                      id="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search something..."
                    />
                  </div>
                </div>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#6b90da" }}>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          INDEX
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          IMAGE
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          Code
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          SURNAME
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          MIDDLENAME
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          GIVENNAME
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid white" }}>
                          ACTION
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {gradeStudents.map((student, index) => (
                        <TableRow
                          key={index + 1}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {(parseInt(currentPage) - 1) * parseInt(pageSize) +
                              index +
                              1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <img
                              className="block border border-blue-500 w-[8rem] h-[10rem]"
                              src={student.profileImage}
                              alt={`Image ${index + 1}`}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {student.studentCode}
                          </TableCell>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.middleName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleClickChat(student.id)}
                              disabled={student.id === user?.student?.id}
                            >
                              <ChatIcon
                                className={
                                  student.id === user?.student?.id
                                    ? `text-gray-500 text-xxl`
                                    : `text-blue-500 text-xxl`
                                }
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div className="flex justify-center mt-3">
                  <Pagination
                    onChange={handleChangePage}
                    page={parseInt(currentPage)}
                    count={totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
