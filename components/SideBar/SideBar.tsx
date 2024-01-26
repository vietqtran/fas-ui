"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
type Props = {};
import Link from "next/link";
const SideBar = (props: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:rind-white group">
        <MenuIcon
          onClick={() => setOpen(!open)}
          className="block md-hidden h-6 w-6"
          aria-hidden="true"
        />
      </Button>
      <div
        className={`p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 `}
      >
        <div className="flex flex-col justify-start items-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4">
            FPT
          </h1>
          <div className="my-4 border-b border-gray-100 pb-4 w-full">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <DashboardIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                Dashboard
              </h3>
            </div>

            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <PersonIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <Link href="/dashboard/students">
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Student
                </h3>
              </Link>
            </div>

            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <DashboardIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                Dashboard
              </h3>
            </div>

            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <DashboardIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                Dashboard
              </h3>
            </div>
          </div>

          <div className="my-4 border-b border-gray-100 pb-4 w-full">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <DashboardIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                Dashboard
              </h3>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <DashboardIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                Dashboard
              </h3>
            </div>
          </div>

          <div className="my-4 w-full">
            <div className="flex mb-2 justify-start items-center gap-4 px-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <DashboardIcon className="text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                Dashboard
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
