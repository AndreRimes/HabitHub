import { Day } from "@/types/models"
import CalendarDay from "../calendarDay/CalendarDay"


export default function Calendar({ calendar }: { calendar: Day[]}) {


    return (
        <div className="w-3/4 h-full px-2">
            <div className="w-full h-full py-1 grid grid-flow-row grid-cols-7">
                <h2 className="text-xl font-semibold">Mon</h2>
                <h2 className="text-xl font-semibold">Tue</h2>
                <h2 className="text-xl font-semibold">Wed</h2>
                <h2 className="text-xl font-semibold">Thu</h2>
                <h2 className="text-xl font-semibold">Fri</h2>
                <h2 className="text-xl font-semibold">Sat</h2>
                <h2 className="text-xl font-semibold">Sun</h2>
                {calendar && calendar.map((day: Day,index) => {
                    return (
                        <CalendarDay key={index} day={day} />
                    )
                })}
            </div>
        </div>
    )
}