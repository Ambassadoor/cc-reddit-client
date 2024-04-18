import { createSlice } from '@reduxjs/toolkit'

const compactPostSlice = createSlice({
    name: 'compactPosts',
    initialState: {},
    reducers: {
        loadPost(state, action) {
            const post = action.payload
            return {
                ...state,
                [post.id]: {
                    ...post,
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
                    author: post.author,
                    stickied: post.stickied,
                    isVideo: post.isVideo,
                    flairColor: post.link_flair_background_color,
                    numComments: post.num_comments,
                    media: post.media,
                    galleryData: post.gallery_data,
                    mediaMetaData: post.media_metadata,
                    permalink: post.permalink,
                    isGallery: post.is_gallery,
                    isSelf: post.is_self
                },
            }
        },
    },
})

export const { loadPost } = compactPostSlice.actions

export default compactPostSlice.reducer
