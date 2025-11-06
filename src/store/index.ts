import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import userSlice from "./slice/user"

const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store