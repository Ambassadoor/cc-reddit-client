import React, { useEffect } from 'react'
import {
    fetchDataFailure,
    fetchDataSuccess,
    fetchDataStart,
} from './mainPageSlice'
import { useDispatch } from 'react-redux'
import CompactPost from '../CompactPost/CompactPost'
import { useSelector } from 'react-redux'
import { selectPosts } from '../../store/selectors'

const MainPage = ({ endpoint }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchDataStart())
            try {
                const response = await fetch(endpoint)
                const responseData = await response.json()
                const before = responseData.data.before
                const after = responseData.data.after
                const allPosts = responseData.data.children

                dispatch(fetchDataSuccess({ before, after, allPosts }))
            } catch (error) {
                console.log(error.message)
                dispatch(fetchDataFailure(error.message))
            }
        }

        fetchData()
    }, [endpoint, dispatch])

    const allPosts = useSelector(selectPosts)

    return (
        <div className='main-page-container'>
            {allPosts &&
                allPosts.map((post) => (
                    !post.data.stickied &&
                    <CompactPost
                        className='compact-post'
                        key={post.data.id}
                        postId={post.data.id}
                        post={post.data}
                    />
                ))}
        </div>
    )
}

export default MainPage
