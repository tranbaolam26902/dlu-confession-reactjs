import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './PostModal.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import Button from '../Button';
import CategoryTag from '../CategoryTag';
import Vote from '../Vote';
import Comment from '../Comment';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function PostModal({ showPostModal, setShowPostModal, scrollToComment, setScrollToComment, data }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [userAvatar, setUserAvatar] = useState(images.avatar);
    const [like, setLike] = useState(data.Like);
    const [isVoted, setIsVoted] = useState(false);
    const [comment, setComment] = useState('');
    const [inputRows, setInputRows] = useState(2);
    const [postComments, setPostComments] = useState([]);

    // Variables
    const imageURL = `${apiURL}/image/post?id=`;
    const commentRef = useRef();
    const LINE_HEIGHT = 24;
    const INIT_HEIGHT = 64;
    const INIT_ROWS = 2;

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (data.Avatar) setUserAvatar(`${apiURL}/image/user?id=${data.Avatar}`);
            if (data.Comments.length) setPostComments(data.Comments);
        }

        return () => (mounted = false);
        // eslint-disable-next-line
    }, [postComments]);

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
                PostId: data.Id,
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
        setShowPostModal(false);
        setScrollToComment(false);
    };

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    return (
        <Modal show={showPostModal} size='lg' onHide={handleClose} centered onEntering={handleScroll}>
            <div id={data.Id} className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Bài viết của {data.NickName}</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='mb-3' />
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        <Avatar avatar={userAvatar} />
                        <div className='mx-3 w-100'>
                            <h4 className='fw-bold'>{data.NickName}</h4>
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <button>
                            <img src={icons.verticalOption} alt='icon-option' />
                        </button>
                    </div>
                    <div className='mb-2'>
                        {data.Categories.map((category) => {
                            return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                        })}
                    </div>
                    <div>
                        <h3 className='mb-1 fw-bold'>{data.Title}</h3>
                        <div className={cx('content')}>{data.Content}</div>
                        {data.Pictures.map((picture) => {
                            return (
                                <img
                                    src={imageURL + picture.Path}
                                    alt='post'
                                    key={picture.Id}
                                    className={cx('images')}
                                />
                            );
                        })}
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <div className='me-4'>
                            <img src={icons.comment} alt='icon-comment' />
                            <span className='ms-2'>{data.Comments.length}</span>
                        </div>
                        <Vote data={data} like={like} setLike={setLike} isVoted={isVoted} setIsVoted={setIsVoted} />
                    </div>
                    <div>
                        <div ref={commentRef}></div>
                        <hr />
                        <div className='text-center fw-bold'>Bình luận</div>
                        <hr />
                        <div className='mt-3'>
                            <div className='d-flex'>
                                <Avatar avatar={userAvatar} />
                                <textarea
                                    className={cx('comment')}
                                    placeholder='...'
                                    onChange={handleCommentInput}
                                    value={comment}
                                    rows={inputRows}
                                />
                            </div>
                            <div className='d-flex justify-content-between align-items-end my-3'>
                                <h5 className='fw-bold'>Tất cả bình luận</h5>
                                <Button secondary onClick={handleSend}>
                                    Gửi
                                </Button>
                            </div>
                            <hr />
                            <div>
                                {postComments.map((comment) => {
                                    return <Comment data={comment} key={comment.Id} />;
                                })}
                                {!data.Comments.length && (
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
