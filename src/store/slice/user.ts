import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";



const initialState: Slice.UserInfoProps = {
    userinfo: {
        roles: [], // 当前用户拥有的角色
        menus: [], // 当前用户拥有的已授权的菜单
        powers: [], // 当前用户拥有的权限数据
        userBasicInfo: {
            id: 1,
            userName: "张三",
            password: '123456',
            phone: '13773777377'
        },
    }, // 当前用户基本信息
    powersCode: [], //
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        reducerUserInfo: (state: Slice.UserInfoProps, action: PayloadAction<Slice.UserInfo>) => {
            console.log(state, action, 'reducerUserInfo');
            return {
                ...state,
                userInfo: action,
            }
        }

    },
})

export const { reducerUserInfo } = userSlice.actions

export default userSlice.reducer