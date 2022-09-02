import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
    event: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

export const create = createAsyncThunk('event/create', async (event, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.create(event,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get events
export const getEvents = createAsyncThunk('event/getevents', async(_, thunkAPI)=>{
    try{
        return await eventService.getEvents();
    }
    catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
}) 
//get myevents
export const getMyevents = createAsyncThunk('event/myevent', async(_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.getMyevents(token);
    }
    catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
}) 
//get event by id
export const getEventbyId = createAsyncThunk('event/eventid', async(id, thunkAPI)=>{
    try{
        console.log(id);
        return await eventService.getEventbyId(id);
    }
    catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)

    }

})
//delete event by id
export const deleteEvent = createAsyncThunk('event/delete', async(id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.deleteEvent(id, token);
    }
    catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)

    }

})


export const eventSlice = createSlice({
    name:'event',
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(create.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(create.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.event.push(action.payload)
        })
        .addCase(create.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getEvents.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(getEvents.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.event= action.payload
        })
        .addCase(getEvents.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getMyevents.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getMyevents.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.event= action.payload
        })
        .addCase(getMyevents.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getEventbyId.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getEventbyId.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.event = action.payload
        })
        .addCase(getEventbyId.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteEvent.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteEvent.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.event = state.event.filter((event)=>event._id !== action.payload)
        })
        .addCase(deleteEvent.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        
    }
        
})




export const {reset} = eventSlice.actions
export default eventSlice.reducer