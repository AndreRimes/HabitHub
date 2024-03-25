export interface User {
    email: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Todo {
    id: number;
    title: string;
    term: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    user_id: number;
}

export interface EventType {
    id: number;
    title: string;
    frequency: string;
    frequency_extension: string;
    begin_time: string
    end_time: string
    createdAt: Date;
    updatedAt: Date;
    user_id: number;
}

export interface Day {
    date: string;
    dayOfTheWeek: string;
    events: EventType[];
    isToday: boolean;
    isNotInMonth: boolean;
}


export interface Calendar {
    days: Day[]
}