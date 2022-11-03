import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './Profile.Module.scss';
import images from '../../assets/img';

import { Post } from '../../components/PostComponents';

const cx = classNames.bind(styles);

function Profile() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;

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
        // eslint-disable-next-line
    }, [navigate, posts]);

    return (
        <>
            {userPosts.length === 0 ? (
                <div className={cx('wrapper')}>
                    <img src={images.emptyPosts} alt='empty-posts' />
                    <h5>
                        <i>Chưa có bài viết</i>
                    </h5>
                </div>
            ) : null}
            {userPosts.map((post) => {
                return <Post data={post} key={post.Id} />;
            })}
        </>
    );
}

export default Profile;
