import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { entities: { items: {}, new: [], picks: [] } }

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
    async ({searchKey, categoryId}, thunkAPI) => {
        let url = "/api/items";
        if (categoryId) {
            url += `?category=${categoryId}`;
        }
        if (searchKey) {
            url += (categoryId ? "&" : "?") + `key=${searchKey}`;
        }

        const response = await fetch(url);
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

export const getHomepageItems = createAsyncThunk(
    "items/getHomepageItems",
    async (_args, thunkAPI) => {
        const response = await fetch(`/api/items/homepage`)
        const data = await response.json()
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

// sets a single item to state for rendering in ItemInfo
export const getAnItem = createAsyncThunk(
    "items/getAnItem",
    async (itemId, thunkAPI) => {
        const response = await fetch(`/api/items/${itemId}`)
        const data = await response.json()
        if (response.ok && !data.errors) {
            return data;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
)

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
            state.entities.items[action.payload.id] = action.payload;
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            const items = {}
            action.payload.forEach((item) => {
                items[item.id] = item
            })
            state.entities.items = items;
        });
        builder.addCase(getHomepageItems.fulfilled, (state, action) => {
            const items = {}
            action.payload.items.forEach((item) => {
                items[item.id] = item
            })
            state.entities.items = items;
            state.new = action.payload.new;
            state.picks = action.payload.picks;
        });
        builder.addCase(getAnItem.fulfilled, (state, action) => {
            state.entities.items[action.payload.id] = action.payload
        })
        builder.addCase(editItem.fulfilled, (state, action) => {
            state.entities.items[action.payload.id] = action.payload;
        });
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            delete state.entities.items[action.payload.id];
        });
    },
});

export default itemSlice.reducer;
