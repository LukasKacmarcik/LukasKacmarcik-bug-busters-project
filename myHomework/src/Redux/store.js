import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session";
import itemsReducer from "./slices/items";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    items: itemsReducer,
  },
});
