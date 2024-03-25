import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/models";

type InitialState = {
    value: User
}

const initialState = {
    value: {
        email: '',
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as User
} as InitialState

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            return initialState
        },
        login: (_, action: PayloadAction<User>) => {
            return {
                value: action.payload
            }
        }
    }
})

export const { login, logout } = user.actions
export default user.reducer