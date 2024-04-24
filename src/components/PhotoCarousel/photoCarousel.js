import React, { useEffect, useMemo } from 'react'

import he from 'he'
import { useDispatch, useSelector } from 'react-redux'
import { loadGallery, selectImage, setMaxHeight } from './photoCarouselSlice'

const PhotoCarousel = ({ gallery, galleryId, galleryData }) => {
    const dispatch = useDispatch()

    const galleryImages = useMemo(
        () =>
            galleryData.items.map((element) => {
                const id = element.media_id
                return gallery[id].s.u
            }),
        [galleryData.items, gallery]
    )

    const maxHeight = useMemo(
        () =>
            Math.max(
                Math.min(
                    ...Object.values(gallery).map(
                        (image) =>
                            (image.s.y / image.s.x) * window.innerWidth * 0.5
                    )
                ),
                window.innerHeight * 0.25
            ),
        [gallery]
    )

    useEffect(() => {
        dispatch(loadGallery({ galleryImages, galleryId }))
        dispatch(setMaxHeight({ maxHeight, galleryId }))
    }, [maxHeight, galleryImages, galleryId, dispatch])

    const thisGallery = useSelector(
        (state) => state.photoCarousel[galleryId]?.gallery
    )
    const currentImageIndex = useSelector(
        (state) => state.photoCarousel[galleryId]?.renderedImageIndex
    )

    const maxImageHeight = useSelector(
        (state) => state.photoCarousel[galleryId]?.maxHeight
    )

    const lastIndex = thisGallery?.length - 1

    const prevImage = () => {
        if (currentImageIndex > 0) {
            dispatch(
                selectImage({ imageIndex: currentImageIndex - 1, galleryId })
            )
        }
    }

    const nextImage = () => {
        if (currentImageIndex < lastIndex) {
            dispatch(
                selectImage({ imageIndex: currentImageIndex + 1, galleryId })
            )
        }
    }

    return (
        <div className="photo-carousel-container">
            {thisGallery && (
                <>
                    <div className="photo-carousel-button-container">
                        <button
                            className="photo-carousel-button"
                            onClick={prevImage}
                            disabled={currentImageIndex === 0}>
                            Prev
                        </button>
                        <button
                            className="photo-carousel-button"
                            onClick={nextImage}
                            disabled={currentImageIndex === lastIndex}>
                            Next
                        </button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            width: '50vw',
                            height: maxImageHeight,
                            justifyContent: 'center',
                            objectFit: 'cover',
                        }}>
                        <img
                            className="photo-carousel-image"
                            src={he.decode(thisGallery[currentImageIndex])}
                            alt=""
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default PhotoCarousel
