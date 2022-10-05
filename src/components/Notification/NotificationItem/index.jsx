import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import images from '../../../assets/img';

const cx = classNames.bind(styles);

function NotificationItem(props) {
    return (
        <div className={cx('notification-item')}>
            <div className={cx('thumbnail-container')}>
                <img src={images.post} alt='' className={cx('thumbnail')} />
            </div>
            <div className={cx('info')}>
                <div className={cx('info-time')}>{props.time}</div>
                <h4 className={cx('info-description')}>{props.description}</h4>
            </div>
            <span className={cx('state')}>{props.id}</span>
        </div>
    );
}

export default NotificationItem;
