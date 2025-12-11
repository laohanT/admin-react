import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Slice.authProps = {
    isLogin: false,
    token: null,
    isCheck: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action: PayloadAction<string>) => {
            state.isLogin = true
            console.log(state.isLogin, 'state');

            state.token = action.payload
            window.sessionStorage.setItem("access_token", action.payload)
        },
        loginout: (state) => {
            state.isLogin = false
            state.token = null
            window.sessionStorage.removeItem("access_token")
        },
        checkLogin: (state) => {
            const token = window.sessionStorage.getItem("access_token")
            state.isLogin = !!token
            state.token = token
            state.isCheck = true
        }
    }
})

export const { authLogin, loginout, checkLogin } = authSlice.actions

export default authSlice.reducer