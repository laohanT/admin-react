import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPublickKey } from "../../api/public";
// 异步获取公钥
export const fetchPublicKey = createAsyncThunk(
    "crypto/fetchPublicKey",
    async () => {
        const res = await getPublickKey()
        return res.data?.pubKey
    }
)

const initialState = {
    publicKey: null
}

const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {
        setPublicKey: (state, action) => {
            state.publicKey = action.payload;
        },
        clearPublicKey: (state) => {
            state.publicKey = null
        }
    }
})

export const { setPublicKey, clearPublicKey } = cryptoSlice.actions
export default cryptoSlice.reducer