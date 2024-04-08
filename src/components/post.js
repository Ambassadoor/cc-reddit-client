import React, { useEffect, useState } from 'react';
import he from 'he';

const Post = (props) => {
    const endpoint = props.endpoint;
    const [posts, setPosts] = useState(null);
    let postNumber = 6;
    const postPath = posts?.data?.children?.[postNumber]?.data;

    useEffect(() => {
        fetch(endpoint)
        .then(response => response.json())
        .then(posts => setPosts(posts))
        .catch(error => console.error('Error:', error))
    }, []);

    if (!postPath) {
        return null; // or some other fallback behavior
    }

    const decodedHtml = postPath.selftext_html ? he.decode(postPath.selftext_html): null;

    return (
        <div>
            <h3>{postPath.title}</h3>
            {postPath.url && !postPath.is_video && !postPath.selftext && <a href={postPath.url}>{postPath.url}</a>}
            {postPath.selftext_html && <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />}
            {!postPath.is_video && postPath.thumbnail && postPath.thumbnail != 'self' && <img src={postPath.thumbnail} alt="Thumbnail" />}
            {postPath.is_video && <video controls><source src={postPath.media.reddit_video.fallback_url} type="video/mp4"></source></video>}

        </div>
    )
}

export default Post;
