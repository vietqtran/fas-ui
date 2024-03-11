"use client";

import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  formatDateForMySQL,
  getFirstMonday,
  getWeek,
  getWeekDayByDateString,
  getWeeks,
} from "@/utils/date";
import { useRouter, useSearchParams } from "next/navigation";

import Activity from "@/components/Student/Dashboard/Activity";
import { Button } from "@mui/material";
import Header from "@/components/Common/Header";
import InputLabel from "@mui/material/InputLabel";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import { getStudentActivityByWeekYear } from "@/helpers/api/activity";
import { useSelector } from "react-redux";
import { RootState } from "@/helpers/redux/reducers";

const StudentSchedule = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user } = useSelector((state: RootState) => state.user);
  console.log("=>>>>>>>>>", user);

  const currentYear = new Date().getFullYear();
  const currentWeek = getWeek(new Date());

    const [year, setYear] = useState(currentYear)
    const [week, setWeek] = useState(1)
    const [from, setFrom] = useState(formatDateForMySQL(getFirstMonday(currentYear)));
    const [to, setTo] = useState('');
    const [days, setDays] = useState([])

  const years = [
    currentYear - 4,
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ];

  const slots = [
    { index: 1, from: "07:30", to: "09:50", name: "Slot 1" },
    { index: 2, from: "10:00", to: "12:20", name: "Slot 2" },
    { index: 3, from: "12:50", to: "15:10", name: "Slot 3" },
    { index: 4, from: "15:20", to: "17:40", name: "Slot 4" },
    { index: 5, from: "18:10", to: "20:30", name: "Slot 5" },
    { index: 6, from: "20:10", to: "22:30", name: "Slot 6" },
  ];

  const weeksComputed = getWeeks(year);

  useEffect(() => {
    const updateDateRange = () => {
      const firstMondayOfYear = getFirstMonday(year);
      const startOfWeek = new Date(firstMondayOfYear);
      startOfWeek.setDate(firstMondayOfYear.getDate() + (week - 1) * 7);
      setFrom(formatDateForMySQL(startOfWeek));

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      setTo(formatDateForMySQL(endOfWeek));

      const newDays = [];
      const [yearValue, month, day] = from.split("-");
      const startDate = new Date(`${month}/${day}/${yearValue}`);
      for (let i = 0; i < 7; i++) {
        const newDate = new Date(startDate.getTime());
        newDate.setDate(newDate.getDate() + i);
        newDays.push(newDate);
      }

      setDays(
        newDays.map((date) => {
          const weekDay = date.toLocaleString("default", {
            weekday: "short",
          });
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return {
            weekDay,
            date: `${day}/${month}`,
          };
        })
      );
    };

    updateDateRange();
  }, [year, week]);

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      if (user) {
        const data = await getStudentActivityByWeekYear(
          user?.student?.id || "",
          week,
          year
        );
        console.log(data);
        setActivities(data.data as unknown as any[]);
      }
    };

    fetchActivity();
  }, [year, week]);

  const nextWeek = () => {
    if (week < 52) {
      setWeek(week + 1);
    } else if (year < years[years.length - 1]) {
      setWeek(1);
      setYear(year + 1);
    }
  };

  const prevWeek = () => {
    if (week > 1) {
      setWeek(week - 1);
    } else if (year > years[0]) {
      setWeek(52);
      setYear(year - 1);
    }
  };

  const setCurrentWeek = () => {
    setYear(currentYear);
    setWeek(1);
  };

  useEffect(() => {
    const parsedYear = parseInt(searchParams.get("year")) || currentYear;
    const parsedWeek = parseInt(searchParams.get("week")) || 1;
    setYear(parsedYear);
    setWeek(parsedWeek);
  }, [searchParams]);

  useEffect(() => {
    return () => {
      setYear(currentYear);
      setWeek(1);
    };
  }, []);

  const handleYearChange = (e) => {
    const queryParams = new URLSearchParams();
    queryParams.set("year", e.target.value);
    router.push(`?${queryParams.toString()}`);
  };

  const handleWeekChange = (e) => {
    const queryParams = new URLSearchParams();
    queryParams.set("week", e.target.value);
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-white text-black">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="p-5 text-black">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div>
                <InputLabel id="year">Year</InputLabel>
                <Select
                  id="year-select"
                  labelId="year"
                  className={`w-48 ${
                    Number(year) === Number(years[0])
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  value={year}
                  onChange={handleYearChange}
                >
                  {years.map((y, i) => (
                    <MenuItem key={i} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <InputLabel id="week">Week</InputLabel>
                <Select
                  id="week-select"
                  labelId="week"
                  value={week}
                  onChange={handleWeekChange}
                >
                  {weeksComputed.map((w, i) => (
                    <MenuItem key={i} value={w.value}>
                      {w.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-5 text-white md:pt-0">
              <Button
                className="v-duration bg-blue-500"
                onClick={setCurrentWeek}
                color="primary"
                variant="contained"
              >
                Current
              </Button>
              <Button
                className="v-duration bg-blue-500"
                onClick={prevWeek}
                color="primary"
                variant="contained"
              >
                Prev
              </Button>
              <Button
                className="v-duration bg-blue-500"
                onClick={nextWeek}
                color="primary"
                variant="contained"
              >
                Next
              </Button>
            </div>
          </div>

          <div className="pt-10">
            <table className="hidden min-w-full table-auto border-collapse border-spacing-px p-3 md:table">
              <thead>
                <tr className="row py-2">
                  <th></th>
                  {days.map((d, i) => (
                    <th className="p-1" key={i}>
                      <div className="bg-green-500 mx-auto w-full max-w-[150px] rounded-lg text-center text-white">
                        <div className="text-sm font-semibold">{d.weekDay}</div>
                        <div className="text-sm font-semibold">{d.date}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="mt-5">
                {slots.map((slot, i) => (
                  <tr key={i} className="row">
                    <td className="col border text-center font-semibold">
                      <div>Slot {slot.index}</div>
                      <div className="grid w-full place-items-center">
                        <span className="bg-green-500 block w-fit whitespace-nowrap rounded-md p-1 text-[10px] font-semibold text-white">{`(${slot.from} - ${slot.to})`}</span>
                      </div>
                    </td>
                    {days.map((day, i) => (
                      <td className="col border" key={i}>
                        {activities?.length > 0 &&
                          activities.map(
                            (a, j) =>
                              a.slot.name === slot.name &&
                              getWeekDayByDateString(a.date) === i && (
                                <Link href={`/activityDetail/${a.id}`}>
                                  <Activity activity={a} />
                                </Link>
                              )
                          )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="md:hidden">
              <div className="flex text-black  items-center justify-between gap-1">
                {days.map((day, i) => (
                  <div
                    key={i}
                    className="bg-green-500 mx-auto w-full max-w-[150px] text-black cursor-pointer rounded-lg text-center"
                  >
                    <span
                      style={{ color: "black !important" }}
                      className="text-sm font-semibold !text-black"
                    >
                      {day.weekDay}
                    </span>
                    <span
                      style={{ color: "black !important" }}
                      className="text-sm font-semibold !text-black"
                    >
                      {day.date}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 border">
                {slots.map((slot, i) => (
                  <div
                    className="row flex items-center justify-start gap-2 border-b p-3"
                    key={i}
                  >
                    <div className="grid place-items-center">
                      <div className="font-semibold">Slot {slot.index}</div>
                      <div className="grid w-full place-items-center">
                        <span className="bg-green-500 block w-fit whitespace-nowrap rounded-md p-1 text-[10px] font-semibold text-white">{`(${slot.from} - ${slot.to})`}</span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className='pt-10'>
               <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  <PreviewCourse />
               </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;
