import cartItems from "./cart-items";
import session from "./session";
import items from "./items";
import categories from "./categories";
import { configureStore } from "@reduxjs/toolkit";

const isDev = process.env.NODE_ENV !== "production";

const store = configureStore({
  reducer: {
    cartItems,
    session,
    items,
    categories
  },
  middleware: (getDefaultMiddleware) => {
    if (isDev) {
      const logger = require("redux-logger").default;
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
  devTools: isDev,
});

export default store;
