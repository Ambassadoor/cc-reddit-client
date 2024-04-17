import React, { useEffect } from 'react'
import { loadGallery } from './photoCarouselSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectGallery } from '../../store/selectors'
import he from 'he'

const PhotoCarousel = ({ gallery }) => {
    const galleryImages = Object.values(gallery).map((image) => image.s.u)

    return (
        <div>
            {galleryImages &&
                galleryImages.map((image) => (
                    <>
                        <img src={he.decode(image)} alt="" />
                    </>
                ))}
        </div>
    )
}

export default PhotoCarousel
