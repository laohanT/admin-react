import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: Slice.UserInfoProps = {
    id: 0,
    roleId: 0,
    username: "",
    token: "",
    menuList: []
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserState: (state, action) => {
            return action.payload
        },
        restUserState: (state, action) => {
            return initialState
        }
    },
})

export const { setUserState } = userSlice.actions

export default userSlice.reducer