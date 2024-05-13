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
                    const mediaSrc = galleryObject?.s?.u || galleryObject?.s?.mp4
                    const mediaType = galleryObject?.e

                    return ({mediaId: mediaId, mediaSrc: mediaSrc, mediaType: mediaType})
                }),
        [galleryData.items, gallery]
    )


    const maxHeight = useMemo(
        () =>
            Math.max(
                Math.min(
                    ...Object.values(gallery).map(
                        (image) =>
                            (image?.s?.y / image.s?.x) * window.innerWidth * 0.5
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

    const mediaSrc = thisGallery && thisGallery[currentImageIndex] && he.decode(thisGallery[currentImageIndex]?.mediaSrc)

    const galleryTypes = {        
        'Image': <img src={mediaSrc} alt='' />,
        'AnimatedImage': <video autoPlay loop muted src={mediaSrc} />,
        'Video': <video src={mediaSrc} />,
        "External": <p>External Link</p>
        };


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
                        {galleryTypes[thisGallery[currentImageIndex]?.mediaType]}
                    </div>
                </>
            )}
        </div>
    )
}

export default PhotoCarousel
