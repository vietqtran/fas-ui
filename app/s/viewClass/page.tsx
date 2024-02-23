"use client";

import Header from "@/components/Common/Header";
import useCourse from "@/hooks/Course";
import useGrade from "@/hooks/Grade";
import useMajor from "@/hooks/Major";
import useStudent from "@/hooks/Student";
import {
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
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
    const campus = "FU-HL";
    const terms = ["SUMMER2023", "FALL2023", "SPRING2024"];
    // const majors = ["Artificial Intelligence", "Software Engineering", "Japanese", "English"];
    // const courses = ["Data Structures and Algorithms (CSD201)", "Introduction to Databases (DBI202)", "Front-End web development with React (FER202)", "Computer Networking (NWC203c)", "Programming Fundamentals (PRF192)"];
    const classes = ["SE1759-NJ", "SE1764-NJ", "SE1764-NJ", "SE1764-NJ"];

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

    const { majors } = useMajor();
    const { majorId, setMajorId, courses } = useCourse();
    const { courseId, setCourseId, grades } = useGrade()
    const { gradeId, setGradeId, gradeStudents } = useStudent();

    console.log(gradeId);


    return (
        <div className="grid h-[100%] w-[100vw] place-items-center bg-white text-black">
            <div className="container mx-auto py-5 text-gray-600">
                <Header />
                <div className="mt-5">
                    <h1 className="text-3xl text-gray-400">Select a course, then a group ...</h1>
                    <div className="my-5">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#6b90da" }}>
                                        <TableCell style={{ borderRight: "1px solid white" }}>CAMPUS</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>TERM</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>MAJOR</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>COURSE</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>GROUP</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-top" component="th" scope="row">
                                            <span className="font-bold">{campus}</span>
                                        </TableCell>

                                        <TableCell className="align-top" component="th" scope="row">
                                            {
                                                terms.map((term, index) => (
                                                    <div key={index + 1}>
                                                        <span className={term === "SPRING2024" ? "font-bold" : `text-blue-600 cursor-pointer hover:text-blue-900 hover:underline`}>{term}</span>
                                                    </div>
                                                ))
                                            }
                                        </TableCell>

                                        <TableCell className="align-top" component="th" scope="row">
                                            {
                                                majors.map((major, index) => (
                                                    <div onClick={() => setMajorId(major.id)} key={index + 1}>
                                                        <span className={majorId === major.id ? "font-bold" : "text-blue-600 cursor-pointer hover:text-blue-900 hover:underline"}>{major.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </TableCell>

                                        <TableCell className="align-top" component="th" scope="row">
                                            {
                                                courses.map((course, index) => (
                                                    <div onClick={() => setCourseId(course.id)} key={index + 1}>
                                                        <span className={courseId === course.id ? "font-bold" : `text-blue-600 cursor-pointer hover:text-blue-900 hover:underline`}>{course.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </TableCell>

                                        <TableCell className="align-top" component="th" scope="row">
                                            <div className="flex flex-wrap">
                                                {
                                                    grades.map((grade, index) => (
                                                        <div onClick={() => setGradeId(grade.id)} className="w-1/3 p-1" key={index + 1}>
                                                            <span className={gradeId === grade.id ? "font-bold" : `text-blue-600 cursor-pointer hover:text-blue-900 hover:underline`}>{grade.code}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>


                                <div className="my-3">
                                    <TableFooter>
                                        <h1 className="text-3xl text-gray-400">... then see student list</h1>
                                    </TableFooter>
                                </div>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="my-5">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#6b90da" }}>
                                        <TableCell style={{ borderRight: "1px solid white" }}>INDEX</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>IMAGE</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>Code</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>SURNAME</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>MIDDLENAME</TableCell>
                                        <TableCell style={{ borderRight: "1px solid white" }}>GIVENNAME</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gradeStudents.map((student, index) => (
                                        <TableRow
                                            key={index + 1}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <img
                                                    className="block border border-blue-500 w-[10rem] h-[10rem]"
                                                    src={student.profileImage}
                                                    alt={`Image ${index + 1}`}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {student.studentCode}
                                            </TableCell>
                                            <TableCell>
                                                {student.firstName}
                                            </TableCell>
                                            <TableCell>
                                                {student.middleName}
                                            </TableCell>
                                            <TableCell>
                                                {student.lastName}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className="flex justify-center mt-3">
                            <Pagination count={10} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default page;
