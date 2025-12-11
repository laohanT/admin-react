import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            console.log(state, action, 'state, action');

            state.value += action.payload
        }
    }
})
// console.log(counterSlice.actions, counterSlice, 'counterSlice.actions');

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer