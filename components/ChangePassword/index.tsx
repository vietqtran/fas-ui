'use client'

import { changePassword } from "@/helpers/api/account";
import { RootState } from "@/helpers/redux/reducers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

const ChangePasswordPage = (props: Props) => {

    const {user} = useSelector((state: RootState) => state.user);

    const [oldPassword, setOldPassword] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleSubmit = async () => {
        try {
            const response = await changePassword({email: user.email, oldPassword, newPassword: password, confirmPassword});
            if(response.code === "SUCCESS"){
                toast.success("Change password success");
                setOldPassword('')
                setPassword('')
                setConfirmPassword('')

            } else {
                toast.error('Change password failed');
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <section className="relative bg-gray-50 w-screen ">
        <Link href={'/'} className="text-black flex items-center gap-2 absolute m-5 top-0 left-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

           <span> Back to Home page</span></Link>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
        >
          <Image
            width={200}
            height={100}
            className="mb-8"
            src="/images/logo/FPT_University.png"
            alt="logo"
          />
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Change Password
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Old Password
              </label>
              <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                New Password
              </label>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm password
              </label>
              <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 duration-200 ease-linear text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordPage;
