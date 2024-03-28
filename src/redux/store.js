import { configureStore } from "@reduxjs/toolkit";
import users from "./user-slice";

export const store = configureStore({
  reducer: { users },
  devTools: process.env.NODE_ENV !== "production",
});
