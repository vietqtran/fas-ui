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


  return (
    <div className="h-[100vh] w-[100vw] bg-white text-black">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl mt-8">Instructor Detail</h1>
          <div className="w-full my-10">
            <table className="w-full">
              <tbody>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Username</td>
                  <td>DatND</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Fullname</td>
                  <td>Nguyen Dac Dat</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Avatar</td>
                  <td>
                    <img className="my-3" src="https://cdn.fstoppers.com/styles/full/s3/media/2017/09/10/1_use_psychology_to_take_better_photographs.jpeg" alt="" width={200} height={200}/>
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Email</td>
                  <td>datnd@ou.edu</td>
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
