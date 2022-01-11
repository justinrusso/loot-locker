import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { entities: { items: {} } }

export const createItem = createAsyncThunk(
    "items/createItem",
    async (itemDetails, thunkAPI) => {
        const response = await fetch("/api/items/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemDetails),
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);

export const getItems = createAsyncThunk(
    "items/getItems",
    async (searchKey = '', thunkAPI) => {
        const response = await fetch(`/api/items/${searchKey}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data.items;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);

export const editItem = createAsyncThunk(
    "items/editItem",
    async (itemDetails, thunkAPI) => {
        const response = await fetch("/api/items/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemDetails),
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);

export const deleteItem = createAsyncThunk(
    "items/deleteItem",
    async ({ itemId }, thunkAPI) => {
        const response = await fetch("/api/items/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemId
            }),
        });
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);

const itemSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createItem.fulfilled, (state, action) => {
            state.items.entities.items[action.payload.id] = action.payload;
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            const items = {}
            action.payload.forEach((item) => {
                items[item.id] = item
            })
            state.items.entities.items = items;
        });
        builder.addCase(editItem.fulfilled, (state, action) => {
            state.items.entities.items[action.payload.id] = action.payload;
        });
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            delete state.items.entities.items[action.payload.id];
        });
    },
});

export default itemSlice.reducer;
