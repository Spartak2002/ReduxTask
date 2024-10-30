import axios from "axios";
import { createAppSlice } from "../../app/createAppSlice";
import { IState, IUser } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IState = {
    list: []
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        getAllUsers: create.asyncThunk(
            async() => {
                const response = await axios.get("http://localhost:3004/users")
                return response.data
            },
            {
                fulfilled: (state, action: PayloadAction<IUser[]>) => {
                    state.list = action.payload
                }
            }
        ),
        deleteUser: create.asyncThunk(
            async(id: number) => {  
                await axios.delete(`http://localhost:3004/users/${id}`)
                return id
            },
            {
                fulfilled: (state, action: PayloadAction<number>) => {
                    state.list = state.list.filter(user => user.id != action.payload)
                }
            }
        )
    }),
    selectors: {
        users: state => state.list
    }
})

export const { users } = userSlice.selectors
export const { getAllUsers, deleteUser } = userSlice.actions


