import React, { useEffect } from 'react'
import { loadPost } from './compactPostSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../store/selectors'
import he from 'he'
import PhotoCarousel from '../PhotoCarousel/photoCarousel'

const CompactPost = ({ postId, post }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPost(post))
    }, [post, dispatch])

    const thisPost = useSelector((state) => state.compactPosts[postId])

    return (
        <div>
            {thisPost && !thisPost.stickied && (
                <>
                    <h3>{thisPost.title}</h3>
                    {thisPost.hint === 'image' && (
                        <img
                            src={he.decode(
                                thisPost.preview.images[0].source.url
                            )}
                            alt=""
                        />
                    )}
                    {thisPost.hint === 'hosted:video' && (
                        <video
                            controls
                            src={thisPost.media.reddit_video.fallback_url}
                        />
                    )}
                    {thisPost.hint === 'self' || thisPost.isSelf && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: he.decode(thisPost.text),
                            }}
                        />
                    )}
                    {thisPost.isGallery && (
                        <PhotoCarousel
                            gallery={thisPost.mediaMetaData}
                            galleryId={thisPost.id}></PhotoCarousel>
                    )}
                </>
            )}
        </div>
    )
}

export default CompactPost
