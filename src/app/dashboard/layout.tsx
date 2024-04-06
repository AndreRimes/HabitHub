"use client"
import React, { useEffect, useState } from "react"
import CreateTodoModal from "@/components/modalTodo/ModalTodo"
import CreateEventModal from "@/components/modalEvent/ModalEvent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispathc } from "@/redux/store";
import { login } from "@/redux/features/user-slice";
import { setTodos } from "@/redux/features/todo-slice";
import { setCalendar } from "@/redux/features/calendar-slice";
import { setDisplayDay, setToday } from "@/redux/features/displayDay-slice";
import Todos from "@/components/todo/Todos";
import Events from "@/components/event/Event";
import DisplayDay from "@/components/displayDay/DisplayDay";

interface prop {
    children: React.ReactNode
}

export default function DashBoardLayout({ children }: prop) {
    const [showModalEvent, setShowModalEvent] = useState(false);
    const [showModalTodo, setShowModalTodo] = useState(false);
    const dispatch = useDispatch<AppDispathc>();


    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            try {
                const response = await axios.get("http://localhost:8080/us", { headers });
                dispatch(login(response.data.user));
                dispatch(setTodos(response.data.todos));
                dispatch(setCalendar(response.data.calendar));
                dispatch(setDisplayDay(response.data.today));
                dispatch(setToday(response.data.today));
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, []);

    


    return (
        <>
            <CreateEventModal showModal={showModalEvent} setShowModal={setShowModalEvent} />
            <CreateTodoModal showModal={showModalTodo} setShowModal={setShowModalTodo} />
            <div className="w-3/4 h-[91%] rounded-lg border p-2 flex flex-row">
                <div className="h-full w-1/4 border-r flex flex-col items-center">
                    <DisplayDay />
                    <div className="w-full h-4/5 p-2 flex flex-col items-center justify-evenly">
                        <Events setShowModalEvent={setShowModalEvent} />
                        <Todos setShowModalTodo={setShowModalTodo} />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}
