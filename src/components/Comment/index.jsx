import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './Comment.module.scss';
import images from '../../assets/img';

import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function Comment({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [userAvatar, setUserAvatar] = useState(images.avatar);

    // Variables
    const imageURL = `${apiURL}/image/user?id=`;

    // Convert datetime
    const date = data.PostTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    useEffect(() => {
        let mounted = true;

        if (mounted && data.Avatar) setUserAvatar(`${imageURL}${data.Avatar}`);

        return () => (mounted = false);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side')}>
                <Avatar avatar={userAvatar} />
                {!data.ParentId && data.ChildComments.length !== 0 && <div className={cx('divider')}></div>}
                {data.ParentId && <div className={cx('match-parent')}></div>}
            </div>
            <div className={cx('main')}>
                <div className={cx('content')}>
                    <h5 className='fw-bold'>{data.NickName}</h5>
                    {data.Content}
                </div>
                <div className={cx('actions')}>
                    <button>Phản hồi</button>
                    <button>Báo cáo</button>
                    <h6>{day + ' tháng ' + month}</h6>
                </div>
                <div>
                    {data.ChildComments.map((childComment) => {
                        return <Comment data={childComment} key={childComment.Id} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Comment;
