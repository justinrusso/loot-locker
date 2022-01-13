import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { entities: { reviews: {} } }

export const createReview = createAsyncThunk(
    'reviews/createReview',
    async ({ itemId, formDetails }, thunkAPI) => {
        const response = await fetch(`/api/items/${itemId}/reviews`, {
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
    'reviews/getReviews',
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

export const editReview = createAsyncThunk(
    'reviews/editReview',
    async ({ reviewId, formDetails }, thunkAPI) => {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDetails)
        });
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

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId, thunkAPI) => {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
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
        builder.addCase(editReview.fulfilled, (state, action) => {
            state.entities.reviews[action.payload.id] = action.payload;
        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            const reviews = {}
            action.payload.forEach((review) => {
                reviews[review.user_id] = review
            });
            state.entities.reviews = reviews;
        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            delete state.entities.reviews[action.payload.reviewId]
        })
    }
})

export default reviewSlice.reducer
