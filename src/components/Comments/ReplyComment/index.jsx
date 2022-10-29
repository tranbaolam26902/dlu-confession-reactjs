import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './ReplyComment.module.scss';
import icons from '../../../assets/icons';

import Avatar from '../../Avatar';

const cx = classNames.bind(styles);

function ReplyComment({ data, setShowReply }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, userAvatar } = states;

    // Variables
    const INIT_HEIGHT = 40;
    const INIT_ROWS = 1;
    const LINE_HEIGHT = 24;

    // Component's states
    const [comment, setComment] = useState('Trả lời ' + data.NickName + ': ');
    const [inputRows, setInputRows] = useState(INIT_ROWS);

    // Functions
    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };
    const updatePostData = (commentData) => {
        const formData = new FormData();
        formData.append('id', commentData.PostId);
        fetch(`${apiURL}/api/post/getpostbyid`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responsePostData) => {
                dispatch(actions.setPostData(responsePostData));
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
        // Dynamic textarea's height
        const currentHeight = e.target.scrollHeight;
        const row = (currentHeight - INIT_HEIGHT) / LINE_HEIGHT;
        if (inputRows <= 8) setInputRows(row + INIT_ROWS);
    };
    const handleSend = () => {
        if (comment !== '') {
            const formData = new FormData();
            const commentData = {
                Content: comment,
                PostId: data.PostId,
                ParentId: data.Id,
                LevelComment: data.LevelComment + 1,
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
                    setShowReply(false);
                    updatePostData(responseCommentData);
                    updatePosts();
                });
        }
    };

    useEffect(() => {
        // Auto focus textarea
        const commentInput = document.getElementById('comment');
        const end = commentInput.value.length;
        commentInput.setSelectionRange(end, end);
        commentInput.focus();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Avatar avatar={userAvatar} />
            <textarea
                id='comment'
                className={cx('comment')}
                placeholder='Viết bình luận...'
                value={comment}
                rows={inputRows}
                onChange={handleCommentInput}
            />
            <button className='mt-2' onClick={handleSend}>
                <img src={icons.send} alt='btn-send' />
            </button>
        </div>
    );
}

export default ReplyComment;
