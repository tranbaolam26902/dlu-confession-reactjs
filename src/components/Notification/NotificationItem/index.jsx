import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import images from '../../../assets/img';

const cx = classNames.bind(styles);

function NotificationItem(props) {
    return (
        <div className={cx('notification-item d-flex justify-content-between align-items-center')}>
            <div className={cx('thumbnail-container')}>
                <img src={images.post} alt='' className={cx('thumbnail')} />
            </div>
            <div className={cx('info flex-grow-1 text-start')}>
                <div className={cx('posting-time')}>{props.time}</div>
                <div className={cx('description')}>{props.description}</div>
            </div>
            <span className=''>{props.id}</span>
        </div>
    );
}

export default NotificationItem;
