'use client'
import Calendar from "@/components/calendar/Calendar";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToday } from "@/redux/features/displayDay-slice";
import Image from "next/image";
import rightArrow from "../../../public/right-arrow.png"


export default function DashBoardPage() {
    const calendar = useAppSelector((state) => state.calendarReducer.value)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToday(calendar));
    }, [])

    return (
        <>
            <Calendar calendar={calendar} />
            <Image className="absolute translate-x-[73vw]
             translate-y-[90.3vh] rounded-full " src={rightArrow} width={17} height={17} alt="right Arrow" />
            <Image className="absolute translate-x-[70vw] translate-y-[90.3vh] rotate-180  rounded-xl" src={rightArrow} width={17} height={17} alt="right Arrow" />
        </>
    )
}
