import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { user: null };

export const authenticate = createAsyncThunk(
  "session/authenticate",
  async (_args, thunkAPI) => {
    const response = await fetch("/api/auth/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok && !data.errors) {
      return data;
    }
    throw thunkAPI.rejectWithValue(["Not authenticated"]);
  }
);

export const login = createAsyncThunk(
  "session/login",
  async ({ email, password }, thunkAPI) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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

export const signUp = createAsyncThunk(
  "session/signUp",
  async ({ username, email, password }, thunkAPI) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
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

export const logout = createAsyncThunk(
  "session/logout",
  async (_args, thunkAPI) => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw thunkAPI.rejectWithValue(["Failed to log out"]);
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default sessionSlice.reducer;

export const selectUser = () => (state) => state.session.user;
