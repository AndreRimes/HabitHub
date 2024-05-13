'use client'
import { useAppSelector } from "@/redux/store"
import { Day, Habit } from "@/types/models"
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHabits, setHabitDisplayContent, removeHabit } from "@/redux/features/habit-slice";
import { addHabit } from "@/redux/features/habit-slice";
import ModalHabit from "@/components/modalhabit/ModalHabit";


export default function HabitTracker() {
    const [showModal, setShowModal] = useState(false);
    const calendar = useAppSelector((state) => state.calendarReducer.value);
    const habitsReducer = useAppSelector((state) => state.habitsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        axios.get(process.env.NEXT_PUBLIC_API_URL + "/habit", { headers })
            .then((e) => dispatch(setHabits(e.data.habits)))
            .catch((e) => console.error(e))


        if (calendar.length !== 0) {
            dispatch(setHabitDisplayContent(calendar));
        }
    }, [calendar, dispatch])

    async function handleCheck(habitId: number, date: string, isCheck: boolean, index: number, title: string) {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const data = {
            habit_id: habitId,
            date,
        }

        try {
            if (isCheck) {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + "/complete-day", data, { headers });
                dispatch(addHabit({ title, index }))
            } else {
                await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/complete-day?habit_id=${habitId}&date=${date}`, { headers });
                dispatch(removeHabit({ title, index }));
            }
        } catch (e) {
            console.error(e);
        }

    }

    return (
        <>
            <ModalHabit setShowModal={setShowModal} showModal={showModal} />
            <div className="w-3/4 h-full p-2 overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            {habitsReducer.value && habitsReducer.value.map((habit: Habit, index) => {
                                return (
                                    <th key={index} className="sticky top-0 z-10 text-center">{habit.title}</th>
                                )
                            })}
                            <th className="sticky top-0 z-10">
                                <div className="bg-primary text-2xl text-black w-6 h-6
                             rounded-sm flex items-center justify-center text-center hover:scale-105 transition-all  cursor-pointer 
                             " onClick={() => setShowModal(true)}>
                                    +
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitsReducer.displayContent.map((day: Day, index: number) => {
                            return (
                                <tr className={`${day.isToday && "bg-base-200"}`} key={index}>
                                    <th>{day.date}-{day.dayOfTheWeek}</th>
                                    {habitsReducer.value && habitsReducer.value.map((habit: Habit, i) => {
                                        return (
                                            <td key={i} className="text-center">
                                                {habit.week_days.split('-').includes(day.dayOfTheWeek) ?
                                                    <input onClick={() =>
                                                        handleCheck(habit.id, day.date, !(habit.title in day.habits), index, habit.title)}
                                                        type="checkbox" checked={habit.title in day.habits}
                                                        className="checkbox"
                                                    />
                                                    :
                                                    <div className=" inline-block">
                                                        --
                                                    </div>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}