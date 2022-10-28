import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './PostModal.module.scss';
import icons from '../../../assets/icons';

import { Button } from '../../Buttons';
import CategoryTag from '../../CategoryTag';
import Vote from '../../Vote';
import { CommentItem } from '../../Comments';
import Avatar from '../../Avatar';
import PostOptions from '../PostOptions';

const cx = classNames.bind(styles);

function PostModal() {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { token, apiURL, userId, postData, userAvatar, avatarURL, imageURL, showPostModal, scrollToComment } = states;

    // Variables
    const commentRef = useRef();
    const LINE_HEIGHT = 24;
    const INIT_HEIGHT = 40;
    const INIT_ROWS = 1;

    // Component's states
    // const [like, setLike] = useState(data.Like);
    const [isVoted, setIsVoted] = useState(false);
    const [comment, setComment] = useState('');
    const [inputRows, setInputRows] = useState(INIT_ROWS);

    // Convert created time
    const date = postData.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Event handlers
    const handleCommentInput = (e) => {
        if (e.target.value === '') {
            setComment('');
            setInputRows(INIT_ROWS);
            return;
        }
        setComment(e.target.value);
        const currentHeight = e.target.scrollHeight;
        const row = (currentHeight - INIT_HEIGHT) / LINE_HEIGHT;
        if (inputRows <= 8) setInputRows(row + INIT_ROWS);
    };
    const handleSend = () => {
        if (comment !== '') {
            const formData = new FormData();
            const commentData = {
                Content: comment,
                PostId: postData.Id,
                ParentId: '',
                LevelComment: 1,
            };
            formData.append('comment', JSON.stringify(commentData));
            fetch(`${apiURL}/api/usercomment/create`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    setComment('');
                });
        }
    };
    const handleScroll = () => {
        if (scrollToComment) commentRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const handleClose = () => {
        setComment('');
        dispatch(actions.setShowPostModal(false));
        dispatch(actions.setScrollToComment(false));
    };

    useEffect(() => {
        if (postData.PostLikes.length > 0)
            postData.PostLikes.map((postLike) => {
                if (postLike.UserID === userId) setIsVoted(postLike.IsLiked);
                return null;
            });
        else setIsVoted(false);
        // eslint-disable-next-line
    }, []);

    return (
        <Modal show={showPostModal} size='lg' onHide={handleClose} centered onEntering={handleScroll}>
            <div id={postData.Id} className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Bài viết của {postData.NickName}</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='mb-3' />
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        <Avatar avatar={`${avatarURL}${postData.Avatar}`} />
                        <div className='mx-3 w-100'>
                            <h4 className='fw-bold'>{postData.NickName}</h4>
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <PostOptions data={postData} />
                    </div>
                    <div className='mb-2'>
                        {postData.Categories.map((category) => {
                            return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                        })}
                    </div>
                    <div>
                        <h3 className='mb-1 fw-bold'>{postData.Title}</h3>
                        <div className={cx('content')}>{postData.Content}</div>
                        {postData.Pictures.map((picture) => {
                            return (
                                <img
                                    src={imageURL + picture.Path}
                                    className={cx('images')}
                                    alt='post'
                                    key={picture.Id}
                                />
                            );
                        })}
                    </div>
                    <div className='d-flex justify-content-end align-items-center mt-3'>
                        <div className='me-4'>
                            <img src={icons.comment} alt='icon-comment' />
                            <span className='ms-2'>{postData.TotalCmt}</span>
                        </div>
                        {/* <Vote
                            data={postData}
                            userId={userId}
                            like={like}
                            setLike={setLike}
                            isVoted={isVoted}
                            setIsVoted={setIsVoted}
                        /> */}
                    </div>
                    <div>
                        <div ref={commentRef}></div>
                        <hr />
                        <div className='text-center fw-bold'>Bình luận</div>
                        <hr />
                        <div className='mt-3'>
                            {token !== '' && (
                                <div className='d-flex'>
                                    <Avatar avatar={userAvatar} />
                                    <textarea
                                        className={cx('comment')}
                                        placeholder='Viết bình luận...'
                                        onChange={handleCommentInput}
                                        value={comment}
                                        rows={inputRows}
                                    />
                                </div>
                            )}
                            {token === '' && (
                                <h5 className={cx('not-logged-in')}>
                                    Vui lòng{' '}
                                    <button onClick={() => dispatch(actions.setShowLoginModal(true))}>Đăng nhập</button>{' '}
                                    để bình luận về bài viết!
                                </h5>
                            )}
                            <div className='d-flex justify-content-between align-items-end my-3'>
                                <h5 className='fw-bold'>Tất cả bình luận</h5>
                                {token !== '' && (
                                    <Button secondary onClick={handleSend}>
                                        Gửi
                                    </Button>
                                )}
                            </div>
                            <hr />
                            <div>
                                {postData.Comments.map((comment) => {
                                    return <CommentItem data={comment} key={comment.Id} />;
                                })}
                                {!postData.Comments.length && (
                                    <h5 className='text-center'>
                                        <i>Hãy là người đầu tiên bình luận về bài viết này</i>
                                    </h5>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PostModal;
