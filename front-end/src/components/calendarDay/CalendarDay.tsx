import { Day, EventType } from "@/types/models";
import Link from "next/link";

export default function CalendarDay({ day, isBig }: { day: Day, isBig: boolean }) {
    return (
        <Link href={`/dashboard/day/${day.date}`}>
            <div
                className={`w-[14.29%] border-1 hover:scale-105 transition-all 
                duration-100 ease-in border-primary cursor-pointer 
                ${day.isToday ? 'border-primary text-primary' : ''} ${day.isNotInMonth ? 'opacity-50' : ""} `}
                style={{ height: isBig ? '5em' : "7em" }}
            >
                <h1 className="text-lg font-bold">
                    {day?.date?.split("-")[2] + "/" + day?.date?.split('-')[1]}
                </h1>
                <h2 className="text-md mr-1">{day.dayOfTheWeek}</h2>
                <ul className="w-full max-h-[10%] flex flex-col justify-around">
                    {day.events && day.events.slice(0,  isBig ? 1 : 2).map((e: EventType, i: number) => (
                        <li className="w-full flex flex-row items-center justify-between" key={i}>
                            <h3 className="text-[13px] min-w-[50px] max-w-[50px] overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: "calc(100% - 10px)" }}>
                                {e.title}
                            </h3>
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
}
