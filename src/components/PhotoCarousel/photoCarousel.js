import React, { useEffect, useMemo } from 'react'

import he from 'he'
import { useDispatch, useSelector } from 'react-redux'
import { loadGallery, selectImage } from './photoCarouselSlice'

const PhotoCarousel = ({ gallery, galleryId }) => {
    const dispatch = useDispatch()
    const galleryImages = useMemo(
        () => Object.values(gallery).map((image) => image.s.u),
        [gallery]
    )

    useEffect(() => {
        dispatch(loadGallery({ galleryImages, galleryId }))
    }, [galleryImages, galleryId, dispatch])

    const thisGallery = useSelector(
        (state) => state.photoCarousel[galleryId]?.gallery
    )
    const currentImageIndex = useSelector(
        (state) => state.photoCarousel[galleryId]?.renderedImageIndex
    )

    const prevImage = () => {
        if (currentImageIndex > 0) {
            dispatch(
                selectImage({ imageIndex: currentImageIndex - 1, galleryId })
            )
        }
    }

    const nextImage = () => {
        if (currentImageIndex < thisGallery.length - 1) {
            dispatch(
                selectImage({ imageIndex: currentImageIndex + 1, galleryId })
            )
        }
    }

    return (
        <div className='photo-carousel-container'>
            {thisGallery && (
                <>
                    <div className='photo-carousel-button-container'>
                    <button
                        className='photo-carousel-button'
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}>
                        Prev
                    </button>
                    <button
                        className='photo-carousel-button'
                        onClick={nextImage}
                        disabled={currentImageIndex === thisGallery.length - 1}>
                        Next
                    </button>
                    </div>
                    <img
                        className='photo-carousel-image'
                        src={he.decode(thisGallery[currentImageIndex])}
                        alt=""
                    />
                </>
            )}
        </div>
        
    )
}

export default PhotoCarousel
