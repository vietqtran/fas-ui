"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import { removeUser } from "@/helpers/redux/actions/user";
import { store } from "@/helpers/redux/store";

interface Props {
  children: ReactNode;
}

const SidebarLink: FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  return (
    <Link href={href} className={`block p-5 font-semibold`}>
      {children}
    </Link>
  );
};

const ManagerLayout: FC<Props> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowSidebar(window?.innerWidth >= 769 ? true : false);
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <div className="sticky left-0 right-0 top-0 z-30 flex items-center gap-4 border-b-[1px] border-b-gray-200 bg-white py-2 md:hidden">
        <button
          onClick={() => setShowSidebar(true)}
          type="button"
          className="ms-3 inline-flex w-fit items-center rounded-lg p-2 text-sm text-gray-500 duration-100 ease-linear hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:scale-90"
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <div className="h-[30px]">
          <Image
            src="/images/logo/FPT_University.png"
            alt="logo"
            width={200}
            height={200}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <aside
        className={`fixed z-50 left-0 top-0 h-screen w-[300px] md:top-0 md:left-0 border-r-[1px] border-r-gray-400 transition-transform  ${
          showSidebar
            ? "translate-x-0"
            : "-translate-x-[100%] md:-translate-x-[95%]"
        }`}
        aria-label="Sidebar"
      >
        <div className="relative h-full bg-[#fffbf4] md:py-10">
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className={`absolute  right-[-15px] top-[100px] hidden aspect-square ${
              showSidebar ? "rotate-90" : "-rotate-90"
            } cursor-pointer place-items-center rounded-full border-[1px] border-gray-300 bg-gray-50 p-2 md:grid`}
          >
            <span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
                  fill="black"
                  fillOpacity="0.54"
                />
              </svg>
            </span>
          </div>

          <div className="grid w-full place-items-end">
            <div
              onClick={() => setShowSidebar(false)}
              className="w-fit cursor-pointer p-3 md:hidden"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3491 17.9946L29.4795 7.85429C29.6582 7.67469 29.7584 7.43158 29.7583 7.17821C29.7581 6.92483 29.6575 6.68186 29.4786 6.50249C29.1204 6.14609 28.4895 6.14429 28.1277 6.50429L18 16.6446L7.86868 6.50159C7.50868 6.14609 6.87778 6.14789 6.51958 6.50339C6.43067 6.59195 6.36029 6.69732 6.31254 6.81337C6.26479 6.92941 6.24063 7.05381 6.24148 7.17929C6.24148 7.43489 6.34048 7.67429 6.51958 7.85159L16.65 17.9937L6.52048 28.1367C6.34172 28.3166 6.24162 28.56 6.24213 28.8136C6.24263 29.0672 6.34371 29.3102 6.52318 29.4894C6.69688 29.6613 6.94258 29.7603 7.19638 29.7603H7.20178C7.45648 29.7594 7.70218 29.6595 7.87228 29.4858L18 19.3455L28.1313 29.4885C28.3104 29.6667 28.5498 29.7657 28.8036 29.7657C28.9291 29.7661 29.0534 29.7416 29.1694 29.6937C29.2854 29.6459 29.3908 29.5755 29.4796 29.4868C29.5683 29.3981 29.6387 29.2927 29.6865 29.1766C29.7344 29.0606 29.7588 28.9363 29.7585 28.8108C29.7585 28.5561 29.6595 28.3158 29.4795 28.1385L19.3491 17.9946Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="grid w-full place-items-center">
            <div className="mb-5 h-[50px]">
              <Image
                src="/images/logo/FPT_University.png"
                alt="logo"
                width={200}
                height={200}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <ul className="py-5 text-gray-600">
            <li className="w-[80%]">
              <SidebarLink href="/manager/students">
                Students Management
              </SidebarLink>
            </li>
            <li className="w-[80%]">
              <SidebarLink href="/manager/instructors">
                Instructors Management
              </SidebarLink>
            </li>
            <li className="w-[80%]">
              <SidebarLink href="/manager/majors">Major Management</SidebarLink>
            </li>
            <li className="w-[80%]">
              <SidebarLink href="/manager/events">
                Events Management
              </SidebarLink>
            </li>
            <li className="w-[80%]">
              <SidebarLink href="/manager/courses">
                Courses Management
              </SidebarLink>
            </li>
            <li
              onClick={() => {
                dispatch(removeUser());
              }}
              className="w-[80%]"
            >
              <span className="block cursor-pointer p-5 font-semibold text-red-500">
                Log out
              </span>
            </li>
          </ul>
        </div>
      </aside>

      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed inset-0 bg-black z-40 bg-opacity-30 transition-opacity ${
          showSidebar ? "block md:hidden" : "hidden"
        } `}
      ></div>

      <main
        className={`bg-white flex items-start justify-center min-h-[100vh] w-full text-black duration-100 ease-linear ${
          showSidebar ? "md:pl-[300px]" : "md:pl-0"
        }`}
      >
        {children}
      </main>
    </Provider>
  );
};

export default ManagerLayout;
