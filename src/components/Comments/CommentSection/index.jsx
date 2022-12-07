import { useState } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../../store';
import styles from './CommentSection.module.scss';

import Avatar from '../../Avatar';
import { Button } from '../../Buttons';
import CommentItem from '../CommentItem';

const cx = classNames.bind(styles);

function CommentSection() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, userAvatar, postData } = states;
    const { token } = useToken();

    // Variables
    const LINE_HEIGHT = 24;
    const INIT_HEIGHT = 40;
    const INIT_ROWS = 1;

    // Component's states
    const [comment, setComment] = useState('');
    const [inputRows, setInputRows] = useState(INIT_ROWS);

    // Functions
    const updatePostData = (commentData) => {
        const formData = new FormData();
        formData.append('id', commentData.PostId);
        fetch(`${apiURL}/api/post/getpostbyid`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('400 bad request');
                }
                return response.json();
            })
            .then((responsePostData) => {
                dispatch(actions.setPostData(responsePostData));
            })
            .catch(() => {
                dispatch(actions.setMessage('Bài viết không tồn tại hoặc đã bị xóa!'));
                dispatch(actions.setShowMessageModal(true));
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
                .then((response) => response.json())
                .then((responseCommentData) => {
                    setComment('');
                    setInputRows(INIT_ROWS);
                    updatePostData(responseCommentData);
                    updatePosts();
                });
        }
    };

    return (
        <>
            <hr />
            <div className='text-center fw-bold'>Bình luận</div>
            <hr />
            <div className='mt-3'>
                {token ? (
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
                ) : null}
                {!token ? (
                    <h5 className={cx('not-logged-in')}>
                        <button
                            onClick={() => {
                                dispatch(actions.setShowSignInModal(true));
                                dispatch(actions.setShowPostModal(false));
                            }}
                        >
                            Đăng nhập
                        </button>{' '}
                        để bình luận về bài viết!
                    </h5>
                ) : null}
                <div className='d-flex justify-content-between align-items-end my-3'>
                    <h5 className='fw-bold'>Tất cả bình luận</h5>
                    {token ? (
                        <Button secondary onClick={handleSend}>
                            Gửi
                        </Button>
                    ) : null}
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
        </>
    );
}

export default CommentSection;
