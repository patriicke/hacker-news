import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {},
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            state.isLoggedIn = true;
        },
        signout: (state) => {
            state.user = {};
            state.isLoggedIn = false;
        },
    },
});
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
