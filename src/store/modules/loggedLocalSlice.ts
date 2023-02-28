import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoggedType } from "../../types/users";

const initialState : LoggedType= {
    loggedUserID: undefined,
};

export const loggedUserSlice = createSlice ({
    name: "loggedUser",
    initialState,
    reducers: {
        localLogIn: (state, action : PayloadAction<string>) => {
            state.loggedUserID = action.payload;
        },
        localLogOut: (state) => {
            state.loggedUserID = undefined;
        },
    }
});

export const { localLogIn, localLogOut } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;