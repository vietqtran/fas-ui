"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useStudent from "@/hooks/Student";
import { useInstructor } from "@/hooks/Instructor";

type Props = {
  params: {
    instructorId: string;
  };
};

const Profile = (props: Props) => {
  const { instructorId } = props.params;

  const { instructorDetail, fetchInstructor } = useInstructor();

  useEffect(() => {
    fetchInstructor(instructorId);
  }, []);

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
                  <td>{instructorDetail?.username}</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Fullname</td>
                  <td>
                    {instructorDetail?.firstName +
                      " " +
                      instructorDetail?.middleName +
                      " " +
                      instructorDetail?.lastName}
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Avatar</td>
                  <td>
                    <img
                      className="my-3"
                      src={instructorDetail?.profileImage}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Email</td>
                  <td>{instructorDetail?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
