import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../../store';
import styles from './CommentItem.module.scss';
import icons from '../../../assets/icons';

import Avatar from '../../Avatar';
import ReplyComment from '../ReplyComment';
import CommentOptions from '../CommentOptions';
import { ButtonToProfile } from '../../Buttons';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, userId, avatarURL } = states;
    const { token } = useToken();

    // Variables
    const INIT_HEIGHT = 40;
    const INIT_ROWS = 1;
    const LINE_HEIGHT = 24;

    // Component's states
    const [showReply, setShowReply] = useState(false);
    const [isPersonalPost, setIsPersonalPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(data.Content);
    const [inputRows, setInputRows] = useState(INIT_ROWS);

    // Convert comment's datetime
    const date = data.PostTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Functions
    const checkIsPersonalPost = () => {
        const formData = new FormData();
        formData.append('id', data.PostId);
        fetch(`${apiURL}/api/post/getpostbyid`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responsePostData) => {
                if (responsePostData.PostHistories[0].AccountId === userId) setIsPersonalPost(true);
            });
    };
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
    const addLinkToText = () => {
        const content = data.Content.replace(/\n+/g, '\n').split(' ');
        let result = '';
        content.map((word, index) => {
            if (word.includes('http')) {
                console.log(word);
                result += ` <a href="${word}" target="__blank" style='color: #007bff;'>Liên kết</a> `;
                return null;
            }
            result += word + ' ';
            return null;
        });
        return result;
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
    const handleReply = () => {
        if (!token) {
            dispatch(actions.setShowPostModal(false));
            dispatch(actions.setShowSignInModal(true));
        } else setShowReply(true);
    };
    const handleSend = () => {
        if (comment !== '') {
            const formData = new FormData();
            const commentData = {
                Content: comment,
                Id: data.Id,
            };
            formData.append('comment', JSON.stringify(commentData));
            fetch(`${apiURL}/api/usercomment/edit`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((responseCommentData) => {
                    setIsEditing(false);
                    updatePostData(responseCommentData);
                    updatePosts();
                });
        }
    };

    useEffect(() => {
        checkIsPersonalPost();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side')}>
                <ButtonToProfile id={data.AccountId}>
                    <Avatar avatar={`${avatarURL}${data.Avatar}`} />
                </ButtonToProfile>
                {data.ChildComments.length !== 0 ? <div className={cx('divider')}></div> : null}
                {data.ParentId ? <div className={cx('match-parent')}></div> : null}
            </div>
            {!isEditing ? (
                <div className={cx('main')}>
                    <div className='d-flex align-items-center'>
                        <div className={cx('content')}>
                            <h5 className='fw-bold'>
                                <ButtonToProfile id={data.AccountId}>{data.NickName}</ButtonToProfile>
                            </h5>
                            <span dangerouslySetInnerHTML={{ __html: addLinkToText() }}></span>
                        </div>
                        {(data.AccountId === userId || isPersonalPost) && (
                            <CommentOptions data={data} setIsEditing={setIsEditing} />
                        )}
                    </div>
                    <div className={cx('actions')}>
                        <button onClick={handleReply}>Phản hồi</button>
                        <h6>{day + ' tháng ' + month}</h6>
                        {data.IsEdited && (
                            <h6>
                                <i>Đã chỉnh sửa</i>
                            </h6>
                        )}
                    </div>
                    <div>
                        {data.ChildComments.map((childComment) => {
                            return <CommentItem data={childComment} key={childComment.Id} />;
                        })}
                    </div>
                    {showReply && <ReplyComment data={data} setShowReply={setShowReply} />}
                </div>
            ) : null}
            {isEditing ? (
                <div className='d-flex align-items-end w-100'>
                    <textarea
                        id='comment'
                        className={cx('comment')}
                        placeholder='Viết bình luận...'
                        value={comment}
                        rows={inputRows}
                        onChange={handleCommentInput}
                    />
                    <button className='ms-3 mb-2' onClick={handleSend}>
                        <img src={icons.send} alt='btn-send' />
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default CommentItem;
