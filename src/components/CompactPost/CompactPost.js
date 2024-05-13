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
                    <div className="post-content">
                        <div className="post-media-container">
                            {thisPost.hint === 'image' && (
                                <>
                                    {thisPost.preview.images[0].variants.gif ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            src={he.decode(
                                                thisPost.preview.images[0]
                                                    .variants.mp4.source.url
                                            )}
                                        />
                                    ) : (
                                        <img
                                            className="post-image"
                                            src={he.decode(
                                                thisPost.preview.images[0]
                                                    .source.url
                                            )}
                                            alt=""
                                        />
                                    )}
                                </>
                            )}
                            {thisPost.hint === 'hosted:video' && (
                                <video
                                    className="post-video"
                                    controls
                                    src={
                                        thisPost.media.reddit_video.fallback_url
                                    }
                                />
                            )}
                            {thisPost.isGallery && (
                                <PhotoCarousel
                                    gallery={thisPost.mediaMetaData}
                                    galleryId={thisPost.id}
                                    galleryData={
                                        thisPost.galleryData
                                    }></PhotoCarousel>
                            )}
                        </div>
                        <div className="post-text-container">
                            {(thisPost.hint === 'self' || thisPost.isSelf) && (
                                <div
                                    className="post-text"
                                    dangerouslySetInnerHTML={{
                                        __html: he.decode(thisPost.text),
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CompactPost
