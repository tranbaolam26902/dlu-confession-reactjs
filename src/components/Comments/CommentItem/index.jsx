import { useState } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../../store';
import styles from './CommentItem.module.scss';

import Avatar from '../../Avatar';
import ReplyComment from '../ReplyComment';
import CommentOptions from '../CommentOptions';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, userId, avatarURL } = states;

    // Component's states
    const [showReply, setShowReply] = useState(false);
    const [isPersonalPost, setIsPersonalPost] = useState(false);

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

    // Convert comment's datetime
    const date = data.PostTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Event handlers
    const handleReply = () => {
        setShowReply(true);
    };

    useEffect(() => {
        checkIsPersonalPost();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side')}>
                <Avatar avatar={`${avatarURL}${data.Avatar}`} />
                {data.ChildComments.length !== 0 && <div className={cx('divider')}></div>}
                {data.ParentId && <div className={cx('match-parent')}></div>}
            </div>
            <div className={cx('main')}>
                <div className='d-flex align-items-center'>
                    <div className={cx('content')}>
                        <h5 className='fw-bold'>{data.NickName}</h5>
                        <span>{data.Content}</span>
                    </div>
                    {(data.AccountId === userId || isPersonalPost) && <CommentOptions data={data} />}
                </div>
                <div className={cx('actions')}>
                    <button onClick={handleReply}>Phản hồi</button>
                    <button>Báo cáo</button>
                    <h6>{day + ' tháng ' + month}</h6>
                </div>
                <div>
                    {data.ChildComments.map((childComment) => {
                        return <CommentItem data={childComment} key={childComment.Id} />;
                    })}
                </div>
                {showReply && <ReplyComment data={data} setShowReply={setShowReply} />}
            </div>
        </div>
    );
}

export default CommentItem;
