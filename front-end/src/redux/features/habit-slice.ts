import { Habit, Day } from "@/types/models";
import { BinarySearch, getFomatedToday } from "@/util/util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Habits {
    value: Habit[],
    displayContent: Day[],
}

const initialState: Habits = {
    value: [],
    displayContent: [],
}

export const habits = createSlice({
    name: "habits",
    initialState,
    reducers: {
        setHabits: (state, action: PayloadAction<Habit[]>) => {
            state.value = action.payload
        },
        setHabitDisplayContent(state, action: PayloadAction<Day[]>) {
            const calendar = action.payload;
            const formattedDate = getFomatedToday();

            const index = BinarySearch(formattedDate, calendar);

            let start = index;
            let end = index;
            while (calendar[start].dayOfTheWeek !== "Mon") {
                start--;
            }

            while (calendar[end].dayOfTheWeek !== "Sun") {
                end++;
            }

            if (start === 0) {
                state.displayContent = calendar.slice(start, end + 8);
            } else {
                state.displayContent = calendar.slice(start - 7, end + 1);
            }


        },
        addHabit: (state, action: PayloadAction<{ title: string, index: number }>) => {
            state.displayContent[action.payload.index].habits[action.payload.title] = {}
        },
        removeHabit: (state, action: PayloadAction<{ title: string, index: number }>) => {
            delete state.displayContent[action.payload.index].habits[action.payload.title]
        },
        addHabitToList: (state, action: PayloadAction<Habit>) => {
            state.value.push(action.payload);
        }
    }
})


export const { setHabits, setHabitDisplayContent, addHabit, removeHabit, addHabitToList } = habits.actions;
export default habits.reducer;