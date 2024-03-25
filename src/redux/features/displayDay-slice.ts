import { Day, EventType } from "@/types/models";
import { BinarySearch } from "@/util/util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const displayDay = createSlice({
    name: 'displayDay',
    initialState: {
        value: {} as Day
    },
    reducers: {
        setDisplayDay: (state, action: PayloadAction<Day>) => {
            state.value = action.payload;
        },
        addEventToDate: (state, action: PayloadAction<EventType>) => {
            const day = state.value
            const event = action.payload

            if (event.frequency === "Single") {
                if (day.date === event.frequency_extension) {
                    state.value.events.push(event)
                    return
                }
            } else if (event.frequency === "Monthly") {
                if (day.date.split("-")[2] === event.frequency_extension) {
                    state.value.events.push(event);
                    return
                }
            } else if (event.frequency === "Annually") {
                if (day.date.slice(5, day.date.length).split("-").map((e) => parseInt(e)).join('-') === event.frequency_extension.split('-').map((e) => parseInt(e)).join("-")) {
                    state.value.events.push(event);
                    return
                }
            } else {
                const weekDays = event.frequency_extension.split("-")
                for (let index = 0; index < weekDays.length; index++) {
                    if (weekDays[index] === day.dayOfTheWeek) {
                        state.value.events.push(event)
                    }
                }
            }
        },
        setToday: (state, action: PayloadAction<Day[]>) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            state.value = BinarySearch(formattedDate, action.payload);
        }
    },
})

export const { setDisplayDay, addEventToDate, setToday  } = displayDay.actions;
export default displayDay.reducer;
