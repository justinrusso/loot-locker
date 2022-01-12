import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchCartItems = createAsyncThunk(
  "cartItems/fetchAll",
  async (_args, thunkAPI) => {
    const response = await fetch("/api/cart");

    if (response.ok) {
      const data = await response.json();
      return data.cartItems;
    }
    throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
  }
);

export const addCartItem = createAsyncThunk(
  "cartItems/addItem",
  async (cartItemDetails, thunkAPI) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemDetails),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status < 500) {
      const data = await response.json();
      throw thunkAPI.rejectWithValue(data.errors);
    } else {
      throw thunkAPI.rejectWithValue(["An error occurred. Please try again."]);
    }
  }
);

const cartItemsAdapter = createEntityAdapter({
  selectId: (cartItem) => cartItem.item.id,
  sortComparer: (itemA, itemB) => {
    // Sort by oldest added to cart to newest
    return new Date(itemA.createdAt) - new Date(itemB.createdAt);
  },
});

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: cartItemsAdapter.getInitialState(),
  reducers: {
    clearCartLocally: (state) => {
      cartItemsAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, cartItemsAdapter.upsertMany);
    builder.addCase(addCartItem.fulfilled, cartItemsAdapter.addOne);
  },
});

export const { clearCartLocally } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;

export const selectCartItems = () => (state) => state.cartItems;
