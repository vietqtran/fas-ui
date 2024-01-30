'use client'

import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react'

import Header from '@/components/Common/Header'
import SlideItem from '@/components/Home/SlideItem'

export default function Home() {
   return (
      <div className='container mx-auto flex min-h-screen flex-col items-center justify-start bg-white text-black'>
         <Header />
         <div className='w-full'>
            <Swiper
               id='1'
               spaceBetween={50}
               slidesPerView={1}
               onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
            >
               <SwiperSlide>
                  <SlideItem src='/images/slide/1.png' />
               </SwiperSlide>
               <SwiperSlide>
                  <SlideItem src='/images/slide/2.png' />
               </SwiperSlide>
               <SwiperSlide>
                  <SlideItem src='/images/slide/3.png' />
               </SwiperSlide>
               <SwiperSlide>
                  <SlideItem src='/images/slide/4.png' />
               </SwiperSlide>
            </Swiper>
         </div>

         <div className='grid w-full grid-cols-4 gap-5 py-[30px]'>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>View Schedule</h2>
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>View Absent</h2>
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>Attendance Report</h2>
            </div>

            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>View Schedule</h2>
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>Attendance Report</h2>
            </div>
         </div>

         <div className='w-full'>
            <Swiper
               id='2'
               spaceBetween={50}
               slidesPerView={3}
               onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
            >
               <SwiperSlide>
                  <SlideItem src='/images/slide/1.png' />
               </SwiperSlide>
               <SwiperSlide>
                  <SlideItem src='/images/slide/2.png' />
               </SwiperSlide>
               <SwiperSlide>
                  <SlideItem src='/images/slide/3.png' />
               </SwiperSlide>
               <SwiperSlide>
                  <SlideItem src='/images/slide/4.png' />
               </SwiperSlide>
            </Swiper>
         </div>
      </div>
   )
}
