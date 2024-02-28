"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useStudent from "@/hooks/Student";

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
    idCard: "",
  });

  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    handleGetStudent(user.email);
  }, []);

  const handleGetStudent = async (email) => {
    let data = await fetchStudentByEmail(email);
    setStudent(data);
  };
  // get data from local storege (data user by email)

  return (
    <div className="h-[100vh] w-[100vw] bg-white text-black">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl mt-8">Activity Detail</h1>
          <div className="w-full my-10">
            <table className="w-full">
              <tbody>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Date:</td>
                  <td>Tuesday 27/02/2024</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Slot:</td>
                  <td>3</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Student group</td>
                  <td>
                    <a href="../Course/Groups.aspx?group=42509">SE1747-NET</a>
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Instructor:</td>
                  <td>
                    <a href="../User/UserDetail.aspx?login=anhctl7">anhctl7</a>
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Course:</td>
                  <td>Software Requirement(SWR302)</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Course session number:</td>
                  <td>13</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Course session type:</td>
                  <td></td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Course session description:</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Campus/Programme:</td>
                  <td>FU-HL</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Attendance:</td>
                  <td>Attended</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Record time:</td>
                  <td>27/02/2024 13:51:00</td>
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
    <td className="w-1/5 border border-gray-300 text-left">{label}&nbsp;</td>
    <td>
      <span>{value}</span>
    </td>
  </tr>
);

export default Profile;
