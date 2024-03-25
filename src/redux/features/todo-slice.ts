import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "@/types/models";

interface TodosState {
    value: Todo[];
}

const initialState: TodosState = {
    value: []
};

export const todos = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.value = action.payload;
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            state.value[action.payload].completed = !state.value[action.payload].completed
        },
        clearTodos: (state) => {
            state.value = [];
        },

        addTodo: (state, action: PayloadAction<Todo>) => {
            state.value.push(action.payload)
        },
    }
});

export const { setTodos, clearTodos, toggleTodo, addTodo } = todos.actions;
export default todos.reducer;
