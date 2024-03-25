import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventType, Day } from "@/types/models";

interface CalendarState {
    value: Day[];
}

const initialState: CalendarState = {
    value: []
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCalendar: (state, action: PayloadAction<Day[]>) => {
            state.value = action.payload;
        },
        addEvent: (state, action: PayloadAction<EventType>) => {
            const event = action.payload;
            console.log(event)
            const updatedCalendar = state.value.map(day => {
                switch (event.frequency) {
                    case "Single":
                        if (day.date === event.frequency_extension) {
                            return {
                                ...day,
                                events: [...day.events, event]
                            };
                        }
                        break;
                    case "Monthly":
                        if (day.date.split("-")[2] === event.frequency_extension) {
                            return {
                                ...day,
                                events: [...day.events, event]
                            };
                        }
                        break;
                    case "Annually":
                        const eventParts = event.frequency_extension.split("-");
                        const eventMonth = parseInt(eventParts[0], 10);
                        const eventDay = parseInt(eventParts[1], 10);
                        const parts = day.date.split("-");
                        const dayMonth = parseInt(parts[1], 10);
                        const dayDay = parseInt(parts[2], 10);
                        if (dayMonth === eventMonth && dayDay === eventDay) {
                            return {
                                ...day,
                                events: [...day.events, event]
                            };
                        }
                        break;
                    case "Weekly":
                        const weekDays = event.frequency_extension.split("-");
                        if (weekDays.includes(day.dayOfTheWeek)) {
                            return {
                                ...day,
                                events: [...day.events, event]
                            };
                        }
                        break;
                    default:
                        break;
                }
                return day;
            });

            state.value = updatedCalendar;
        },
    },
});

export const { setCalendar, addEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
