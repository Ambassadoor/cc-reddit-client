import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        before: null,
        after: null,
        allPosts: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchDataStart(state) {
            state.loading = true
            state.error = null
        },
        fetchDataSuccess(state, action) {
            state.loading = false
            state.before = action.payload.before
            state.after = action.payload.after
            state.allPosts = action.payload.allPosts
        },
        fetchDataFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
    postsSlice.actions

export default postsSlice.reducer
