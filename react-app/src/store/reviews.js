import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { entities: { reviews: {} } }

export const createReview = createAsyncThunk(
    'reviews/createReview',
    async (formDetails, thunkAPI) => {
        const response = await fetch(`/api/items/${formDetails.itemId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDetails)
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

export const getReviews = createAsyncThunk(
    'reviws/getReviews',
    async (itemId, thunkAPI) => {
        const response = await fetch(`/api/items/${itemId}/reviews`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.entities.reviews[action.payload.id] = action.payload;
        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            const reviews = {}
            action.payload.forEach((review) => {
                // Change this later to user_id
                reviews[review.id] = review
            });
            state.entities.reviews = reviews;
        })
    }
})

export default reviewSlice.reducer
