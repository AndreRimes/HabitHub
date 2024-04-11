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
  }, []);

  async function arrowClick(isRight: boolean) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      let ax = isRight ? +1 : -1;
      const res = await axios.get(
        "http://localhost:8080/calendar/" + (calendar.offset + ax).toString(),
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
      <div className="join absolute translate-x-[63vw] translate-y-[89.2vh] flex flex-row">
        <button
          className="join-item btn btn-primary btn-sm"
          onClick={() => arrowClick(false)}
        >
          «
        </button>
        <button className="join-item btn btn-sm">
          {months[parseInt(calendar?.value[10]?.date?.split("-")[1]) - 1] +
            "/" +
            calendar?.value[10]?.date?.split("-")[0]}
        </button>
        <button
          onClick={() => arrowClick(true)}
          className="join-item btn btn-sm btn-primary"
        >
          »
        </button>
      </div>
    </>
  );
}
