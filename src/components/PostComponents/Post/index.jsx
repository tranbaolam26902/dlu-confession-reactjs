import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './Post.module.scss';
import icons from '../../../assets/icons';
import images from '../../../assets/img';

import CategoryTag from '../../CategoryTag';
import Vote from '../../Vote';
import PostImage from '../PostImage';
import Avatar from '../../Avatar';
import PostOptions from '../PostOptions';

const cx = classNames.bind(styles);

function Post({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { token, userId, avatarURL } = states;

    // Component's states
    const [like, setLike] = useState(data.Like);
    const [isVoted, setIsVoted] = useState(false);

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

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

    useEffect(() => {
        if (data.PostLikes.length > 0)
            data.PostLikes.map((postLike) => {
                if (postLike.UserID === userId) setIsVoted(postLike.IsLiked);
                return null;
            });
        else setIsVoted(false);
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
                            {!data.PrivateMode && <h4 className='fw-bold'>{data.NickName}</h4>}
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <PostOptions data={data} />
                    </div>
                    <div className='mb-2'>
                        {data.Categories.map((category) => {
                            return (
                                <CategoryTag key={category.Id} onClick={() => dispatch(actions.setFilter(category.Id))}>
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
                        <Vote
                            data={data}
                            userId={userId}
                            like={like}
                            setLike={setLike}
                            isVoted={isVoted}
                            setIsVoted={setIsVoted}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
