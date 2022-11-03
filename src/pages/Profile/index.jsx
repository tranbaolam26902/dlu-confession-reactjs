import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../../store';

import { Post } from '../../components/PostComponents';

function Profile() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

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

    useEffect(() => {
        getUserPosts();
    }, [navigate]);

    return (
        <>
            {userPosts.map((post) => {
                return <Post data={post} key={post.Id} />;
            })}
        </>
    );
}

export default Profile;
