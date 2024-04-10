import React, {useEffect} from 'react'
import { fetchDataFailure, fetchDataSuccess, fetchDataStart} from './mainPageSlice'
import { useDispatch } from 'react-redux'
import CompactPost from '../CompactPost/CompactPost'
import { useSelector } from 'react-redux'


const MainPage = ({ endpoint }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchDataStart());
            try {
                const response = await fetch(endpoint);
                const responseData = await response.json();
                const before = responseData.data.before;
                const after = responseData.data.after;
                const allPosts = responseData.data.children;

                dispatch(fetchDataSuccess({ before, after, allPosts }));

            } catch (error) {
                dispatch(fetchDataFailure(error.message));
            }
        };

        fetchData();
    }, [endpoint, dispatch]);

    const allPosts = useSelector((state) => state.posts.allPosts)

    return (
        <div>
            {allPosts && allPosts.map((post, index) => (
                <CompactPost key={post.id} postIndex={index} />
            ))}
        </div>
    )
}


export default MainPage