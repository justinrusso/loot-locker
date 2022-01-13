import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { entities: { reviews: {} } }

export const createReview = createAsyncThunk(
    "reviews/createReview",
    async (payload, thunkAPI) => {
        const response = await fetch(`/api/items/${payload.itemId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(['An error occured. Please try again.'])
        }
    }
)
