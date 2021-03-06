import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { categories: null }

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (_args, thunkAPI) => {
        let url = "/api/categories"
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok && !data.errors) {
            return data.categories;
        } else if (response.status < 500) {
            throw thunkAPI.rejectWithValue(data.errors);
        } else {
            throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            const categories = {}
            action.payload.forEach((category) => {
                categories[category.id] = category
            })
            state.categories = categories;
        });
    },
});

export default categorySlice.reducer;

export const selectCategories = () => (state) => state.categories.categories;

/**
 * Selects categories and sorts them alphabetically
 * @returns A sorted array of categories
 */
export const selectSortedCategoriesArray = () => (state) =>
  Object.values(state.categories.categories).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
 