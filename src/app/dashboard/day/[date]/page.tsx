"use client"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import { useDispatch } from "react-redux"
import { setDisplayDay } from "@/redux/features/displayDay-slice"
import { useAppSelector } from "@/redux/store"
import { BinarySearch } from "@/util/util"
import { EventType } from "@/types/models"

interface EventTypeDict {
    [key: number]: EventType[];
}


export default function DayPage({ }) {
    const params = useParams<{ date: string }>();
    const calendar = useAppSelector((state) => state.calendarReducer.value);
    const day = useAppSelector((state) => state.displayDayReducer.value);
    const dispatch = useDispatch();
    const [dict, setDict] = useState<EventTypeDict>({})
    const colors = ["bg-primary", "bg-secondary", "bg-yellow-400"];


    useEffect(() => {
        dispatch(setDisplayDay(calendar[BinarySearch(params.date, calendar)]));
    }, [calendar, params.date]);


    useEffect(() => {
        const dic: EventTypeDict = {}
        for (let i = 0; i <= 23; i++) {
            const ax: EventType[] = []
            day?.events?.map((event: EventType) => {
                if (parseInt(event.begin_time.split(':')[0]) === i) {
                    ax.push(event)
                }
            })
            dic[i] = ax;
        }
        setDict(dic);
    }, [day])

    function calculateMargin(beginTime: string) {
        const [, minutes] = beginTime.split(":").map(Number);
        const margin = (5 / 3) * minutes;
        console.log(margin);
        return `${margin / 10}%`;
    }

    function calculateHeight(beginTime: string, endTime: string) {
        const [hb, mb] = beginTime.split(":").map(Number);
        const [he, me] = endTime.split(":").map(Number);

        let height;

        height = (he - hb) * 115.8;
        height += Math.abs(me - mb) * (20);  


        console.log(height);
        return `${height}%`
    }

    function calculateWidth(length: number) {
        return `${(100 / length) - 10}%`
    }

    return (
        <div className="w-3/4 h-full px-2 flex flex-col items-center justify-center">
            <div className="w-full h-[100%] max-h-[100%] overflow-y-auto justify-evenly">
                {Object.keys(dict).map((key: string, index: number) => (
                    <div className="h-1/5 px-1" key={key}>
                        <h2>{key}</h2>
                        <div className="w-full h-[1px] bg-black"></div>
                        <div className="w-full max-w-full flex-row h-[85%] flex justify-around">
                            {dict[parseInt(key)].map((event: EventType, eventIndex: number) => (
                                <div
                                    key={eventIndex}
                                    className={`${colors[index % colors.length]}
                                        flex flex-col justify-between p-1 rounded-lg text-black hover:scale-[102%] 
                                        transition-all duration-200 ease-out`}
                                    style={{
                                        marginTop: calculateMargin(event.begin_time),
                                        height: calculateHeight(event.begin_time, event.end_time),
                                        width: calculateWidth(dict[parseInt(key)].length)
                                    }}
                                >
                                    <p>{event.begin_time}</p>
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <p>{event.end_time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}