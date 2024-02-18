import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {create} from "axios";
import usersService from "./usersService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getAllUsers = createAsyncThunk(
    'users/all',
    async (user, thunkAPI) => {
        try {
            return await usersService.getAllUsers(user)
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserById = createAsyncThunk(
    'users/getUserById',
    async (id, thunkAPI) => {
        try {
            return await usersService.getUserById(id, user)
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })
    }
})

export const {reset} = usersSlice.actions
export default usersSlice.reducer