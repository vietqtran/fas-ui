"use client";
import Header from "@/components/Common/Header";
import useStudent from "@/hooks/Student";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { fetchStudentByEmail } = useStudent();

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
    idcard: "",
  });

  let email = localStorage.getItem("email");
  console.log(email);

  useEffect(() => {
    handleGetStudent(email);
  }, []);

  console.log(student);

  const handleGetStudent = async (email) => {
    let data = await fetchStudentByEmail(email);
    console.log(data);
    setStudent(data);
  };

  return (
    <div className="bg-white text-black h-[100%] w-[100vw] grid place-items-center">
      <div className="container mx-auto text-gray-600">
        <Header />
        <div className="mt-5">
          <h1 className="text-3xl">Student information</h1>
          <img
            src={student.profileImage}
            className="w-[120px] h-[140px] mt-3"
            alt="Student Avatar"
          />
          <div>
            <table className="table border border-gray-300 w-full">
              <tbody>
                <tr className="border border-gray-300 flex justify-between w-full">
                  <td style={{ width: "20%" }} className="basis-1/3">
                    <fieldset>
                      <legend
                        style={{ backgroundColor: "#6b90da" }}
                        className="w-full"
                      >
                        <b>Profile</b>
                      </legend>
                      <table className="table border border-gray-300">
                        <tbody>
                          <TableRow
                            label="Full name"
                            value={
                              student.firstName +
                              student.middleName +
                              student.lastName
                            }
                          />
                          <TableRow
                            label="Date of birth"
                            value={student.birthDay.split("T")[0]}
                          />
                          <TableRow
                            label="Gender"
                            value={student.gender ? "Male" : "Female"}
                          />
                          <TableRow label="ID Card" value={student.idcard} />
                          <TableRow label="Address" value={student.address} />
                          <TableRow
                            label="Phone number"
                            value={student.phone}
                          />
                          <TableRow
                            label="Email"
                            value={
                              <a href="mailto:cuongvvhe170851@fpt.edu.vn">
                                {student?.email}
                              </a>
                            }
                          />
                          <TableRow label="Date of issue" value="27/06/2018" />
                          <TableRow
                            label="Place of issue"
                            value="Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư"
                          />
                        </tbody>
                      </table>
                    </fieldset>
                  </td>
                  <td style={{ width: "20%" }} className="basis-1/3">
                    <fieldset>
                      <legend
                        style={{ backgroundColor: "#6b90da" }}
                        className="w-full"
                      >
                        <b>Academic</b>
                      </legend>
                      <table className="table border border-black">
                        <tbody>
                          <TableRow
                            label="Roll number"
                            value={student.studentCode}
                          />
                          <TableRow label="Old RollNumber" value="" />
                          <TableRow
                            label="Member Code "
                            value={
                              student.lastName +
                              student.firstName.split("")[0] +
                              student.middleName.split("")[0] +
                              student.studentCode
                            }
                          />
                          <TableRow label="Enrol date " value="" />
                          <TableRow label="Mode" value="Chính quy" />
                          <TableRow
                            label="Status "
                            value="HD - HD, Is progress"
                          />
                          <TableRow label="Current Term No" value="5" />
                          <TableRow label="Major" value={student.major.code} />
                          <TableRow label="Curriculum" value="BIT_SE_17C_NJ" />
                          {/* <TableRow label="Capstone project" value="" /> */}
                        </tbody>
                      </table>
                    </fieldset>
                    {/* <fieldset>
                    <legend>
                      <b>Parent</b>
                    </legend>
                    <table className="table border border-black">
                      <tbody>
                        <TableRow label="Name" value="Vũ Văn Minh" />
                        <TableRow label="Phone number" value="0982798766" />
                        <TableRow label="Address" value="" />
                        <TableRow
                          label="Email"
                          value={<a href="mailto:"></a>}
                        />
                        <TableRow label="Job" value="tự do" />
                        <TableRow label="Place of work" value="" />
                      </tbody>
                    </table>
                  </fieldset> */}
                  </td>
                  <td style={{ width: "20%" }} className="basis-1/3">
                    <fieldset>
                      <legend
                        style={{ backgroundColor: "#6b90da" }}
                        className="w-full"
                      >
                        <b>Parent</b>
                      </legend>
                      <table className="table border border-black">
                        <tbody>
                          <TableRow label="Name" value="Vũ Văn Minh" />
                          <TableRow label="Phone number" value="0982798766" />
                          <TableRow label="Address" value="" />
                          <TableRow
                            label="Email"
                            value={<a href="mailto:"></a>}
                          />
                          <TableRow label="Job" value="tự do" />
                          <TableRow label="Place of work" value="" />
                        </tbody>
                      </table>
                    </fieldset>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border border-gray-300">
    <td className="w-1/5 text-left border border-gray-300">{label}&nbsp;</td>
    <td>
      <span>{value}</span>
    </td>
  </tr>
);

export default Profile;
