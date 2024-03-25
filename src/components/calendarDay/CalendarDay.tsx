import { Day, EventType } from "@/types/models";
import Link from "next/link";

export default function CalendarDay({ day }: { day: Day }) {
    return (
        <Link href={`/dashboard/day/${day.date}`}>
            <div
                className={`w-1/7 h-[100%] p-1 border-1 hover:scale-105 transition-all duration-100 ease-in border-primary cursor-pointer
                ${day.isToday ? 'border-primary text-primary' : ''} ${day.isNotInMonth ? 'opacity-50' : ""} `}
            >
                <h1 className="text-lg font-bold">
                    {day?.date?.split("-")[2] + "/" + day?.date?.split('-')[1]}
                </h1>
                <h2 className="text-md mr-1">{day.dayOfTheWeek}</h2>
                <div className="w-2/3 h-[20%] flex flex-col justify-around">
                    {day.events && day.events.slice(0, 2).map((e: EventType, i: number) => (
                        <div className="flex flex-row items-center justify-between" key={i}>
                            <div className={`w-2 h-2 rounded-full bg-${i % 2 == 0 ? "secondary" : "primary"}`}></div>
                            <h3 className="text-[13px] min-w-[50px] max-w-[50px] overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: "calc(100% - 10px)" }}>
                                {e.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    );
}
