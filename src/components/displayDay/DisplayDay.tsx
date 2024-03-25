import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export default function DisplayDay() {
    const day = useAppSelector((state) => state.displayDayReducer.value)

    const dic: { [key: number]: string } = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
    };

    useEffect(()=>{
        console.log(day)
    },[day])

    return (
        <div className="w-full p-3 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">{dic[parseInt(day?.date?.split("-")[1])]}. {day?.date?.split('-')[0]}</h1>
            <h2 className="text-xl">{day?.dayOfTheWeek}, {day?.date?.split('-')?.reverse()?.join("/")}</h2>
        </div>
    )
}
