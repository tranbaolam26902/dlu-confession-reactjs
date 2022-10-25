import { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './Post.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import { Wrapper as PopoverWrapper } from '../Popover';
import CategoryTag from '../CategoryTag';
import Vote from '../Vote';
import PostModal from '../PostModal';
import PostImage from '../PostImage';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function Post({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { token, apiURL, roles, userId } = states;

    // Component's states
    const [userAvatar, setUserAvatar] = useState(images.avatar);
    const [like, setLike] = useState(data.Like);
    const [isVoted, setIsVoted] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [scrollToComment, setScrollToComment] = useState(false);

    // Variables
    const imageURL = `${apiURL}/image/user?id=`;

    const handleOpenPostModal = () => {
        setShowPostModal(true);
    };

    const handleComment = () => {
        if (token !== '') {
            setShowPostModal(true);
            setScrollToComment(true);
        } else dispatch(actions.setShowLoginModal(true));
    };

    const handleDelete = () => {
        if (window.confirm('Xác nhận xóa bài viết?')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/userpost/delete`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            });
        }
    };
    useEffect(() => {
        console.log(userId);
        let mounted = true;
        if (data.Avatar) setUserAvatar(`${imageURL}${data.Avatar}`);
        if (data.PostLikes.length > 0) {
            data.PostLikes.map((postLike) => {
                if (postLike.UserID == userId && mounted) {
                    setIsVoted(postLike.IsLiked);
                }
            });
        } else {
            setIsVoted(false);
        }

        return () => (mounted = false);
    }, [userId]);

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    return (
        <>
            <div id={data.Id} className={cx('wrapper')}>
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        <Avatar avatar={userAvatar} />
                        <div className='mx-3 w-100'>
                            {data.PrivateMode && <h4 className='fw-bold'>Ẩn danh</h4>}
                            {!data.PrivateMode && <h4 className='fw-bold'>{data.NickName}</h4>}
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <Tippy
                            interactive
                            delay={[0, 300]}
                            placement='bottom-end'
                            render={(attrs) => (
                                <PopoverWrapper>
                                    <div className='d-flex flex-column'>
                                        {!roles.includes('Manager') && (
                                            <button className={cx('post-option')}>Báo cáo</button>
                                        )}
                                        {userId === data.PostHistories[0].AccountId && (
                                            <button className={cx('post-option')}>Chỉnh sửa</button>
                                        )}
                                        {(roles.includes('Manager') || userId === data.PostHistories[0].AccountId) && (
                                            <button
                                                className={cx('post-option', { isDelete: true })}
                                                onClick={handleDelete}
                                            >
                                                Xóa
                                            </button>
                                        )}
                                    </div>
                                </PopoverWrapper>
                            )}
                        >
                            <img src={icons.verticalOption} alt='icon-option' />
                        </Tippy>
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
                    <div className='overflow-hidden'>
                        <h3 className='mb-1 fw-bold' role='button' onClick={handleOpenPostModal}>
                            {data.Title}
                        </h3>
                        <div className={cx('content')} onClick={handleOpenPostModal}>
                            {data.Content}
                        </div>
                        <PostImage images={data.Pictures} setShowPostModal={setShowPostModal} />
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
            <PostModal
                showPostModal={showPostModal}
                setShowPostModal={setShowPostModal}
                scrollToComment={scrollToComment}
                setScrollToComment={setScrollToComment}
                data={data}
            />
        </>
    );
}

export default Post;
