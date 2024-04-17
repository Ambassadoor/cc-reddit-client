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
                    images: galleryImages,
                    displayedImage: 0,
                },
            }
        },
    },
})

export const { loadGallery } = photoCarouselSlice.actions

export default photoCarouselSlice.reducer
