import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { entities: { reviews: {}, totalRating: 0 } }

const calculateRating = (reviews) => {
    let sum = 0;
    const length = Object.keys(reviews).length
    for (const index in reviews) {
        sum += reviews[index].rating;
    }
    if (length) return (sum / length).toFixed(2);
    else return 0;
}

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
        const response = await fetch(`/api/items/${itemId}/reviews`);
        const data = await response.json();
        if (response.ok) {
            return data.reviews;
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
            method: 'DELETE'
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
            state.entities.totalRating = calculateRating(state.entities.reviews);
        });
        builder.addCase(editReview.fulfilled, (state, action) => {
            state.entities.reviews[action.payload.id] = action.payload;
            state.entities.totalRating = calculateRating(state.entities.reviews);
        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            const reviews = {}
            action.payload.forEach((review) => {
                reviews[review.id] = review
            });
            state.entities.reviews = reviews;
            state.entities.totalRating = calculateRating(state.entities.reviews);
        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            delete state.entities.reviews[action.payload.reviewId]
            state.entities.totalRating = calculateRating(state.entities.reviews);
        })
    }
})

export default reviewSlice.reducer
