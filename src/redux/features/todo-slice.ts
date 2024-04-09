import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "@/types/models";
import update from "immutability-helper"

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
        moveTodo: (state, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
            const { dragIndex, hoverIndex } = action.payload;

            const updatedTodos = update(state.value, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, state.value[dragIndex]],
                ],
            });

            state.value = updatedTodos;
        }
    }
});

export const { setTodos, clearTodos, toggleTodo, addTodo, moveTodo } = todos.actions;
export default todos.reducer;
