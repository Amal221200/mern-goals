import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createGoal = createAsyncThunk('goals/createGoal', async (goal, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goal, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getGoals', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
        return thunkAPI.rejectWithValue(message)
    }
})

// export const updateGoal = createAsyncThunk('goals/updateGoal', async (goal, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await goalService.updateGoal(goal, token)
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

//         return thunkAPI.rejectWithValue(message)
//     }
// })

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isError = false
            })
            
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isError = false
            })
            // .addCase(updateGoal.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(updateGoal.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     // state.goals.push(action.payload)
            // })
            // .addCase(updateGoal.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            //     state.goals = state.goals.filter(goal => goal._id !== action.payload._id).concat(action.payload)
            //     state.isError = false
            // })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter(goal => goal._id !== action.payload._id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isError = false
            })

    }
})

export const { reset } = goalSlice.actions

export default goalSlice.reducer