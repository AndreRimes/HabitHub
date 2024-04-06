import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";
import todosReducer from "./features/todo-slice"
import calendarReducer from "./features/calendar-slice"
import displayDayReducer from "./features/displayDay-slice"
import habitsReducer from "./features/habit-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        userReducer,
        todosReducer,
        calendarReducer,
        displayDayReducer,
        habitsReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispathc = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;