import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Convert time
    const date = data.NotifyDate.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>{data.Avatar && <img src={avatarURL + data.Avatar} alt='avatar' />}</div>
            <div className={cx('content')}>
                <h6>{day + ' tháng ' + month}</h6>
                <h5 className={cx('description')}>
                    <span className='fw-bold'>{data.NotifyName}</span>
                    <span>{data.Description}</span>
                </h5>
            </div>
            <div className='position-relative d-flex align-items-center'>
                <span className={cx({ isRead: !data.IsRead })}></span>
            </div>
        </div>
    );
}

export default Notification;
