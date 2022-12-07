import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../../store';

import { Post } from '../../components/PostComponents';
import EmptyPosts from '../../components/EmptyPosts';

function Profile() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, posts, userId } = states;

    // Component's states
    const [userPosts, setUserPosts] = useState([]);

    const profileId = window.location.pathname.split('/').pop();

    // Functions
    const getUserPosts = () => {
        const formData = new FormData();
        formData.append('id', profileId);
        fetch(`${apiURL}/api/post/PostByUser`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responsePosts) => {
                setUserPosts(responsePosts);
            });
    };
    const countPrivatePosts = () => {
        let count = 0;
        userPosts.map((post) => {
            if (post.PrivateMode === true) count++;
            return null;
        });
        return count;
    };
    const isPersonalPosts = () => {
        let result = false;
        userPosts.map((post) => {
            if (post.PostHistories[0].AccountId === userId) result = true;
            return null;
        });
        return result;
    };

    useEffect(() => {
        getUserPosts();
        // eslint-disable-next-line
    }, [navigate, posts]);

    return (
        <>
            {(userPosts.length === 0 || userPosts.length === countPrivatePosts()) && !isPersonalPosts() ? (
                <EmptyPosts message='Chưa có bài viết' />
            ) : null}

            {userPosts.map((post) => {
                if (post.PrivateMode && post.PostHistories[0].AccountId !== userId) return null;
                return <Post data={post} key={post.Id} />;
            })}
        </>
    );
}

export default Profile;
