import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { RootState } from "@/helpers/redux/reducers";
import { removeUser } from "@/helpers/redux/actions/user";
import { useRouter } from "next/navigation";
import useStudent from "@/hooks/Student";
import { useInstructor } from "@/hooks/Instructor";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { fetchStudentByEmail } = useStudent();

  const { fetchInstructor } = useInstructor();

  let [userName, setUserName] = useState();
  let [campus, setCampus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role?.name === "STUDENT") {
        await handleGetStudent(user?.email ?? "");
      } else if (user?.role?.name === "INSTRUCTOR") {
        const data = await fetchInstructor(user?.instructor?.id);
        setUserName(data?.username);
        setCampus(data?.campus?.location);
      }
    };

    fetchData();
  }, []);

  const handleGetStudent = async (email) => {
    let data = await fetchStudentByEmail(email);
    setUserName(data?.username);
    setCampus(data?.campus?.name);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <div className="my-[10px] w-full">
        <h1 className="text-3xl text-black">FPT Attendance System</h1>
      </div>
      <div className="flex w-full justify-between bg-gray-50 p-3">
        <Link href="/" className="text-blue-400">
          Home
        </Link>
        <div className="flex items-center justify-end gap-3">
          <Link
            href={"/viewProfile"}
            className="block cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline"
          >
            {userName}
          </Link>
          <div
            onClick={() => {
              dispatch(removeUser());
              router.push("/login");
            }}
            className="cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline"
          >
            logout
          </div>
          <div className="cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline">
            Campus: {campus}
          </div>
          <Link href={"/changePassword"} className="cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline">Change password</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
