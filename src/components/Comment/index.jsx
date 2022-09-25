import { useState } from 'react';
import classNames from 'classnames/bind';
import images from '../../assets/img';
import Vote from '../Vote';

import styles from './Comment.module.scss';
import { Stack } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Comment({ data }) {
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className='position-relative me-3'>
                <img src={images.post} alt='user-avatar' className={cx('avatar')} />
                <div className={cx('divider')}></div>
            </div>
            <div>
                <div className={cx('info')}>
                    <h5>Name</h5>
                    <h6>{data.CreatedTime}</h6>
                </div>
                <div className={cx('body')}>
                    <h5 className={cx('content')}>{data.Description}</h5>
                    <Stack gap={3} direction='horizontal'>
                        <Vote voted={{ up, down }} action={{ setUp, setDown }}>
                            {up ? data.Like + 1 : data.Like}
                        </Vote>
                        <button className={cx('action')}>Phản hồi</button>
                        <button className={cx('action')}>Báo cáo</button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Comment;
