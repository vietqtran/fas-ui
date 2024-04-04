"use client";

import "swiper/css";

import { Provider, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import Header from "@/components/Common/Header";
import Image from "next/image";

import React from "react";
import { RootState } from "@/helpers/redux/reducers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useEvent from "@/hooks/Event";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user?.role?.name !== "STUDENT") {
    router.push("/login");
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-start bg-white py-5 text-black">
      <Header />

      <div className="w-full pt-20">
        <Contributors />
      </div>
      <div className="grid w-full grid-cols-4 gap-5 py-[30px]">
        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <Link href={"/viewProfile"}> View Profile Detail</Link>
        </div>
        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <Link href={"/updateProfile"}> Update Profile Detail</Link>
        </div>

        {user?.role?.id === 1 ? (
          <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
            <Link href={"/s/schedule"}> View Weekly Timetable</Link>
          </div>
        ) : (
          <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
            <Link href={"/attendStudent"}> Take Attendance Student</Link>
          </div>
        )}
        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <Link href={"/curriculum"}> Curriculum</Link>
        </div>

        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <Link href={"/studentFeedback"}> Feedback Instructor</Link>
        </div>
        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <Link href={"/terms"}> List Terms</Link>
        </div>
      </div>
    </div>
  );
}

const Contributors = () => {
  const { events } = useEvent();

  return (
    <Swiper
      id="2"
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay
    >
      {events.map((event, index) => (
        <Swiper
          id="2"
          spaceBetween={50}
          slidesPerView={1} // Chỉ hiển thị một ảnh mỗi lần
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full">
                <div className="h-[500px] w-full overflow-hidden rounded-lg">
                  {" "}
                  {/* Điều chỉnh kích thước của ảnh tại đây */}
                  <a
                    href={event.url}
                    target="_blank"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      src={event.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
    </Swiper>
  );
};
