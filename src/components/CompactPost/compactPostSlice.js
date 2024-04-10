import { createSlice } from '@reduxjs/toolkit'

const compactPostSlice = createSlice({
    name: 'compactPost',
    initialState: {
        post: null,
    },
    reducers: {
        loadPost(state, action) {
            state.post = action.payload
        },
    },
})

export const { loadPost } = compactPostSlice.actions

export default compactPostSlice.reducer
