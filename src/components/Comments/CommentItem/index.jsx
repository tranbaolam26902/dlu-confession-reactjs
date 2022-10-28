import { useState } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../../store';
import styles from './CommentItem.module.scss';

import Avatar from '../../Avatar';
import ReplyComment from '../ReplyComment';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Component's states
    const [showReply, setShowReply] = useState(false);

    // Event handlers
    const handleReply = () => {
        setShowReply(true);
    };

    // Convert comment's datetime
    const date = data.PostTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side')}>
                <Avatar avatar={`${avatarURL}${data.Avatar}`} />
                {data.ChildComments.length !== 0 && <div className={cx('divider')}></div>}
                {data.ParentId && <div className={cx('match-parent')}></div>}
            </div>
            <div className={cx('main')}>
                <div className={cx('content')}>
                    <h5 className='fw-bold'>{data.NickName}</h5>
                    <span>{data.Content}</span>
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
