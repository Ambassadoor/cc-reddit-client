import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import mainPageReducer from '../src/components/MainPage/mainPageSlice'
import compactPostReducer from '../src/components/CompactPost/compactPostSlice'

const rootReducer = combineReducers({
    mainPage: mainPageReducer,
    compactPost: compactPostReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
