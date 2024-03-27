"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useStudent from "@/hooks/Student";
import useActivity from "@/hooks/Activity";
import useAssignsChedule from "@/hooks/AssignSchedule";
import Link from "next/link";

type Props = {
  params: {
    activityId: string;
  };
};

const Profile = (props: Props) => {
  const { activityId } = props.params;
  console.log(activityId);
  const { getActivityDetail, activityDetail } = useActivity();
  const { getAssignSchdule, assignSchedule } = useAssignsChedule();
  useEffect(() => {
    getActivityDetail(activityId);
  }, []);

  useEffect(() => {
    getAssignSchdule(activityDetail?.assign?.id);
  }, [activityDetail]);

  console.log(activityDetail);
  console.log(assignSchedule);

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
                  <td>{activityDetail?.date}</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Slot:</td>
                  <td>{activityDetail?.slot?.name}</td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Student group</td>
                  <td>
                    <a href="../Course/Groups.aspx?group=42509">
                      {assignSchedule?.grade?.code}
                    </a>
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Instructor:</td>
                  <td>
                    <Link
                      href={`/instructorDetail/${activityDetail?.instructor?.id}`}
                      className="text-blue-500 font-semibold"
                    >
                      {activityDetail?.instructor?.username}
                    </Link>
                  </td>
                </tr>
                <tr className="border-b px-4 py-2">
                  <td className="font-semibold">Course:</td>
                  <td>
                    {assignSchedule?.course?.name} (
                    {assignSchedule?.course?.code})
                  </td>
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
