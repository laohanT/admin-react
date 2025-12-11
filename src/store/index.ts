import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import userSlice from "./slice/user"
import cryptoSlice from './slice/cryptoSlice'
import authSlice from "./slice/authSlice";

const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice,
        crypto: cryptoSlice,
        auth: authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store