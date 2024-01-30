"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

import Header from "@/components/Common/Header";
import Image from "next/image";
import React from "react";
import SlideItem from "@/components/Home/SlideItem";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col py-5 items-center justify-start bg-white text-black">
      <Header />
      {/* <div className="h-[100px] w-full">
        <Swiper
          id="1"
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <SlideItem src="/images/slide/1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideItem src="/images/slide/2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideItem src="/images/slide/3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideItem src="/images/slide/4.png" />
          </SwiperSlide>
        </Swiper>
      </div> */}

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
        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <h2>Attendance Report</h2>
        </div>

        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <h2>View Schedule</h2>
        </div>
        <div className="cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline">
          <h2>Attendance Report</h2>
        </div>
      </div>
    </div>
  );
}

const Contributors = () => {
  const events = [
    {
      name: "hola fest 2024",
      location: "Đại học FPT Hà Nội",
      date: "28/1/2024",
      image: "/images/event/1.png",
    },
    {
      name: `FPT Edu's Got Talent 2023`,
      location: "Nhà hát Hòa Bình (TP HCM)",
      date: "24/12/2023",
      image: "/images/event/2.png",
    },
    {
      name: "Homecoming 2023 - Như ngày hôm qua",
      location: "Đại học FPT Hà Nội",
      date: "11/11/2023",
      image: "/images/event/3.png",
    },
    {
      name: "LỄ TÔN VINH KỲ SUMMER 2023",
      location: "Đại học FPT Hà Nội",
      date: "25/10/2023",
      image: "/images/event/4.png",
    },
  ];

  return (
    <Swiper
      id="2"
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay
    >
      {events.map((event, index) => (
        <SwiperSlide>
          <div className="w-full">
            <div className="h-[200px] w-full overflow-hidden rounded-lg">
              <Image
                src={event.image}
                alt="contributor"
                className="h-full w-full object-cover"
                width={2000}
                height={200}
              />
            </div>
            <div className="flex items-start py-4">
              <div className="min-w-[150px] border-r-[1px] border-r-gray-300 p-2">
                <div className="w-full text-center">
                  {convertDate(event.date).mm}
                </div>
                <div className="w-full py-2 text-center text-5xl text-orange-500">
                  {convertDate(event.date).dd}
                </div>
                <div className="w-full text-center">
                  {getDayOfWeek(event.date)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </span>
                  <span>{event.location}</span>
                </div>
                <div className="break-all text-lg uppercase">{event.name}</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const convertDate = (date: string) => {
  const dd = date.split("/")[0];
  const mm = date.split("/")[1];
  const monthInVietnamese = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Bốn",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];
  const yyyy = date.split("/")[2];
  return { dd, mm: monthInVietnamese[parseInt(mm) - 1], yyyy };
};

const getDayOfWeek = (dateString: string) => {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const [dd, mm, yyyy] = dateString.split("/");
  const date = new Date(`${mm}/${dd}/${yyyy}`);
  return days[date.getDay()];
};
