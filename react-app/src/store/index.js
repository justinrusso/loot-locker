import cartItems from "./cart-items";
import session from "./session";
import items from "./items";
<<<<<<< HEAD
import reviews from './reviews';
=======
import categories from "./categories";
>>>>>>> main
import { configureStore } from "@reduxjs/toolkit";

const isDev = process.env.NODE_ENV !== "production";

const store = configureStore({
  reducer: {
    cartItems,
    session,
    items,
<<<<<<< HEAD
    reviews,
=======
    categories
>>>>>>> main
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
