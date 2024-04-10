import React, { useEffect } from 'react'
import { loadPost } from './compactPostSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../store/selectors'
import he from 'he'

const CompactPost = ({ postIndex }) => {
    const dispatch = useDispatch()
    const post = useSelector(selectPosts)[postIndex]

    useEffect(() => {
        const grabPost = () => {
            dispatch(loadPost(post))
        }
        grabPost()
    }, [post, dispatch])

    return (
        <div>
            {post && <h3>{post.data.title}</h3>}
            {post.data.post_hint === 'image' && (
                <img
                    src={he.decode(post.data.preview.images[0].source.url)}
                    alt=""></img>
            )}
            {post.data.post_hint === 'hosted:video' && (
                <video
                    controls
                    src={post.data.media.reddit_video.fallback_url}></video>
            )}
        </div>
    )
}

export default CompactPost
