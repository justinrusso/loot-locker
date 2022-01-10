import session from "./session";
import { configureStore } from "@reduxjs/toolkit";

const isDev = process.env.NODE_ENV !== "production";

const store = configureStore({
  reducer: {
    session,
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
