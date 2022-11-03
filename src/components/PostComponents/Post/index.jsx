import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './Post.module.scss';
import icons from '../../../assets/icons';
import images from '../../../assets/img';

import CategoryTag from '../../CategoryTag';
import PostImage from '../PostImage';
import Avatar from '../../Avatar';
import PostOptions from '../PostOptions';
import { ButtonToProfile } from '../../Buttons';

const cx = classNames.bind(styles);

function Post({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { token, apiURL, userId, avatarURL } = states;

    // Component's states
    const [isLiked, setIsLiked] = useState(false);

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Functions
    const checkIsLikedPost = () => {
        data.PostLikes.map((postLike) => {
            if (postLike.UserID === userId) setIsLiked(true);
            return null;
        });
    };
    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };

    // Event handlers
    const handleOpenPostModal = () => {
        dispatch(actions.setPostData(data));
        dispatch(actions.setShowPostModal(true));
    };
    const handleComment = () => {
        if (token !== '') {
            dispatch(actions.setPostData(data));
            dispatch(actions.setShowPostModal(true));
            dispatch(actions.setScrollToComment(true));
        } else dispatch(actions.setShowLoginModal(true));
    };
    const handleLike = () => {
        if (localStorage.getItem('token')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/userpost/like`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            }).then(() => {
                setIsLiked(!isLiked);
                updatePosts();
            });
        } else dispatch(actions.setShowLoginModal(true));
    };

    useEffect(() => {
        checkIsLikedPost();
        // eslint-disable-next-line
    }, [userId]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        {data.PrivateMode && <Avatar avatar={images.avatar} />}
                        {!data.PrivateMode && <Avatar avatar={`${avatarURL}${data.Avatar}`} />}
                        <div className='mx-3 w-100'>
                            {data.PrivateMode && <h4 className='fw-bold'>Ẩn danh</h4>}
                            {!data.PrivateMode && (
                                <h4 className='fw-bold'>
                                    <ButtonToProfile id={data.PostHistories[0].AccountId}>
                                        {data.NickName}
                                    </ButtonToProfile>
                                </h4>
                            )}
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <PostOptions data={data} />
                    </div>
                    <div className='mb-2'>
                        {data.Categories.map((category) => {
                            return (
                                <CategoryTag id={category.Id} key={category.Id}>
                                    {category.Name}
                                </CategoryTag>
                            );
                        })}
                    </div>
                    <div>
                        <h3 className='mb-1 fw-bold' role='button' onClick={handleOpenPostModal}>
                            {data.Title}
                        </h3>
                        <div className={cx('content')} onClick={handleOpenPostModal}>
                            {data.Content.replace(/\n+/g, '\n')}
                        </div>
                        <PostImage images={data.Pictures} onClick={handleOpenPostModal} />
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <button className='me-4' onClick={handleComment}>
                            <img src={icons.comment} alt='icon-comment' />
                            <span className='ms-2'>{data.TotalCmt}</span>
                        </button>
                        <button onClick={handleLike}>
                            {isLiked && <img src={icons.liked} alt='icon-liked' />}
                            {!isLiked && <img src={icons.like} alt='icon-like' />}
                            <span className={cx({ isLiked: isLiked })}>{data.Like}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
