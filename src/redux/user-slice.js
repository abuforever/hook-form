import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: JSON.parse(localStorage.getItem("key")) || [],
  reducers: {
    addUser(state, { payload }) {
      localStorage.setItem("key", JSON.stringify([...state, payload]));
      return [...state, payload];
    },
    setUsers(_, { payload }) {
      localStorage.setItem("key", JSON.stringify(payload));
      return payload;
    },
  },
});

export const { addUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
