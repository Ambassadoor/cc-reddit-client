import React, { useEffect } from 'react'
import { loadPost } from './compactPostSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../store/selectors'
import he from 'he'

const CompactPost = ({ postId, post }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPost(post))
    }, [post, dispatch])

    const thisPost = useSelector((state) => state.compactPosts[postId])

    return (
        <div>
            {thisPost && (
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
                </>
            )}
        </div>
    )
}

export default CompactPost
