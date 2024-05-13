"use client";
import Calendar from "@/components/calendar/Calendar";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayToday } from "@/redux/features/displayDay-slice";
import {
  backwardCalendar,
  fowardCalendar,
} from "@/redux/features/calendar-slice";
import axios from "axios";
import rightArrow from "../../../public/right-arrow.png"
import Image from "next/image";

export default function DashBoardPage() {
  const calendar = useAppSelector((state) => state.calendarReducer);
  const dispatch = useDispatch();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    dispatch(
      displayToday("nao consigo tirar a necessidade de ter um parametro")
    );
  }, [dispatch]);

  async function arrowClick(isRight: boolean) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      let ax = isRight ? +1 : -1;
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/calendar/" + (calendar.offset + ax).toString(),
        { headers }
      );
      if (isRight) {
        dispatch(fowardCalendar(res.data.calendar));
      } else {
        dispatch(backwardCalendar(res.data.calendar));
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Calendar calendar={calendar.value} />
      <div className="absolute translate-x-[57vw] translate-y-[85vh] flex flex-row">
        <Image className="rounded-full hover:bg-slate-500 transition-colors p-1 rotate-180 "
          src={rightArrow} width={25} height={25} alt="left arrow" onClick={() => arrowClick(false)} />

        <h2 className="">{months[parseInt(calendar?.value[10]?.date?.split('-')[1]) - 1] + "/" +
          calendar?.value[10]?.date?.split('-')[0]}</h2>

        <Image className="rounded-xl hover:bg-slate-500 transition-colors p-1"
          src={rightArrow} width={25} height={25} alt="left Arrow" onClick={() => arrowClick(true)} />
      </div>
       </>
  );
}
