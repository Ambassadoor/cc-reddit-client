import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import postsSliceReducer from '../components/MainPage/mainPageSlice'
import compactPostReducer from '../components/CompactPost/compactPostSlice'

const rootReducer = combineReducers({
    posts: postsSliceReducer,
    compactPosts: compactPostReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
