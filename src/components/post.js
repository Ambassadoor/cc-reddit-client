import React, { useEffect, useState } from 'react';
import he from 'he';

const Post = (props) => {
    const endpoint = props.endpoint;
    const [posts, setPosts] = useState(null);
    const [postNumber, setPostNumber] = useState(0);

    const postPath = posts?.data?.children?.[postNumber]?.data;

    useEffect(() => {
        fetch(endpoint)
        .then(response => response.json())
        .then(posts => setPosts(posts))
        .catch(error => console.error('Error:', error))
    }, []);

    const prevPost = () => {
        if (postNumber > 0) {
            setPostNumber(prev => prev -1);
        }
    }

    const nextPost = () => {
        const childrenLength = posts?.data?.children.length;
        if (childrenLength && postNumber < childrenLength - 1) {
            setPostNumber(prev => prev + 1)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                prevPost();
            } else if (event.key === 'ArrowRight') {
                nextPost();
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        };
    }, );

    if (!postPath) {
        return null; // or some other fallback behavior
    }

    const decodedHtml = postPath.selftext_html ? he.decode(postPath.selftext_html): null;

    return (
        <div>
            <div class = 'post-title-container'>
                <h3 class = 'post-title'>{postPath.title}</h3>
                <p class = 'post-flair'>{postPath?.link_flair_text}</p>
            </div>
            <div class = 'post-content-container'>
                {/* {postPath.url && !postPath.is_video && postPath.selftext !== "" && <a href={postPath.url}>{postPath.url}</a>} */}
                {postPath.selftext_html && <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />}
                {!postPath.is_video && postPath.thumbnail && postPath.thumbnail !== 'self' && <img src={postPath.thumbnail} alt="Thumbnail" />}
                {postPath.is_video && <video controls><source src={postPath.media.reddit_video.fallback_url} type="video/mp4"></source></video>}
            </div>
            <div class = 'post-navigation-container'>
                <button onClick={prevPost} disabled={postNumber === 0}>Back {postNumber}</button>
                <button onClick={nextPost}>Next</button>
            </div>
        </div>
    )
}

export default Post;
