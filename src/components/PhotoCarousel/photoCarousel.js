import React, { useEffect, useMemo } from 'react'

import he from 'he'
import { useDispatch, useSelector } from 'react-redux'
import { loadGallery, selectImage, setMaxHeight } from './photoCarouselSlice'

const PhotoCarousel = ({ gallery, galleryId, galleryData }) => {
    const dispatch = useDispatch()

    const galleryImages = useMemo(
        () =>
            galleryData.items
                .filter((image) => gallery[image.media_id]?.status === 'valid')
                .map((image) => {
                    const galleryObject = gallery[image.media_id]
                    const mediaId = image.media_id
                    const mediaSrc =
                        galleryObject?.s?.u || galleryObject?.s?.mp4
                    const mediaType = galleryObject?.e

                    return {
                        mediaId: mediaId,
                        mediaSrc: mediaSrc,
                        mediaType: mediaType,
                    }
                }),
        [galleryData.items, gallery]
    )

    useEffect(() => {
        dispatch(loadGallery({ galleryImages, galleryId }))
    }, [galleryImages, galleryId, dispatch])

    useEffect(() => {
        const updateMaxHeight = () => {
            const newMaxHeight = Math.min(
                Math.max(
                    ...Object.values(gallery).map(
                        (image) =>
                            (image?.s?.y / image.s?.x) *
                            (window.innerWidth * 0.5)
                    )
                ),
                window.innerHeight * 0.65
            )
            dispatch(setMaxHeight({ maxHeight: newMaxHeight, galleryId }))
        }
        updateMaxHeight()

        window.addEventListener('resize', updateMaxHeight)

        return () => {
            window.removeEventListener('resize', updateMaxHeight)
        }
    }, [gallery, galleryId, dispatch])

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

    const mediaSrc =
        thisGallery &&
        thisGallery[currentImageIndex] &&
        he.decode(thisGallery[currentImageIndex]?.mediaSrc)

    const galleryTypes = {
        Image: <img className="gallery-image" src={mediaSrc} alt="" />,
        AnimatedImage: (
            <video className="gallery-gif" autoPlay loop muted src={mediaSrc} />
        ),
        Video: <video className="gallery-video" src={mediaSrc} />,
        External: <p>External Link</p>,
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
                        className="gallery-media-container"
                        style={{
                            maxHeight: maxImageHeight,
                            height: maxImageHeight,
                        }}>
                        {
                            galleryTypes[
                                thisGallery[currentImageIndex]?.mediaType
                            ]
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default PhotoCarousel
