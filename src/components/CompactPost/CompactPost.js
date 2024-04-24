import React, { useEffect } from 'react'
import { loadPost } from './compactPostSlice'
import { useDispatch, useSelector } from 'react-redux'

import he from 'he'
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel'

const CompactPost = ({ postId, post }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPost(post))
    }, [post, dispatch])

    const thisPost = useSelector((state) => state.compactPosts[postId])

    return (
        <div className="compact-post-container">
            {thisPost && (
                <>
                    <h3 className="post-title">{thisPost.title}</h3>
                    {thisPost.hint === 'image' && (
                        <img
                            className="post-image"
                            src={he.decode(
                                thisPost.preview.images[0].source.url
                            )}
                            alt=""
                        />
                    )}
                    {thisPost.hint === 'hosted:video' && (
                        <video
                            className="post-video"
                            controls
                            src={thisPost.media.reddit_video.fallback_url}
                        />
                    )}
                    {(thisPost.hint === 'self' || thisPost.isSelf) && (
                        <div
                            className="post-text"
                            dangerouslySetInnerHTML={{
                                __html: he.decode(thisPost.text),
                            }}
                        />
                    )}
                    {thisPost.isGallery && (
                        <PhotoCarousel
                            className="photo-carousel"
                            gallery={thisPost.mediaMetaData}
                            galleryId={thisPost.id}
                            galleryData={thisPost.galleryData}></PhotoCarousel>
                    )}
                </>
            )}
        </div>
    )
}

export default CompactPost
