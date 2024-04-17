import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import postsSliceReducer from '../components/MainPage/mainPageSlice'
import compactPostReducer from '../components/CompactPost/compactPostSlice'
import photoCarouselReducer from '../components/PhotoCarousel/photoCarouselSlice'

const rootReducer = combineReducers({
    posts: postsSliceReducer,
    compactPosts: compactPostReducer,
    photoCarousel: photoCarouselReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
