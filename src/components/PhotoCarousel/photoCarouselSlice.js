import { createSlice } from '@reduxjs/toolkit'

const photoCarouselSlice = createSlice({
    name: 'photoCarousel',
    initialState: {},
    reducers: {
        loadGallery(state, action) {
            const { galleryImages, galleryId } = action.payload
            return {
                ...state,
                [galleryId]: {
                    gallery: galleryImages,
                    renderedImageIndex: 0,
                    maxHeight: 0,
                },
            }
        },
        selectImage(state, action) {
            const { imageIndex, galleryId } = action.payload
            return {
                ...state,
                [galleryId]: {
                    ...state[galleryId],
                    renderedImageIndex: imageIndex,
                },
            }
        },
        setMaxHeight(state, action) {
            const { maxHeight, galleryId } = action.payload
            return {
                ...state,
                [galleryId]: {
                    ...state[galleryId],
                    maxHeight: maxHeight,
                },
            }
        },
    },
})

export const { loadGallery, selectImage, setMaxHeight } =
    photoCarouselSlice.actions

export default photoCarouselSlice.reducer
