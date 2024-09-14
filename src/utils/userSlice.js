//if user signup or sign in we get user object and we have to store this user object bcoz we'll be needing in anywhere in our app
//so add user data to redux store and navigate the user to browse page

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: null,

  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
