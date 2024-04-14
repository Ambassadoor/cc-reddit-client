import { createSlice } from '@reduxjs/toolkit'

const compactPostSlice = createSlice({
    name: 'compactPost',
    initialState: {
        post: null,
        subreddit: null,
        text: null,
        title: null,
        downs: null,
        thumbnailHeight: null,
        ups: null,
        thumbnailWidth: null,
        flair: null,
        thumbnail: null,
        hint: null,
        nsfw: null,
        preview: null,
        spoiler: null,
        id: null,
        author: null,
        stickied: null,
        isVideo: null,
        flairColor: null,
        numComments: null,
        media: null,
        galleryData: null,
        mediaMetaData: null,
        permalink: null,
    },
    reducers: {
        loadPost(state, action) {
            const post = action.payload.data
            return {
                ...state,
                post,
                subreddit: post.subreddit_name_prefixed,
                text: post.selftext_html,
                title: post.title,
                downs: post.downs,
                thumbnailHeight: post.thumbnail_height,
                ups: post.ups,
                thumbnailWidth: post.thumbnail_width,
                flair: post.link_flair_text,
                thumbnail: post.thumbnail,
                hint: post.post_hint,
                nsfw: post.over_18,
                preview: post.preview,
                spoiler: post.spoiler,
                id: post.id,
                author: post.author,
                stickied: post.stickied,
                isVideo: post.isVideo,
                flairColor: post.link_flair_background_color,
                numComments: post.num_comments,
                media: post.media,
                galleryData: post.gallery_data,
                mediaMetaData: post.media_metadata,
                permalink: post.permalink,
            }
        },
    },
})

export const { loadPost } = compactPostSlice.actions

export default compactPostSlice.reducer
