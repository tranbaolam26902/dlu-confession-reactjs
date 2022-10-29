import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

function Notification({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    // Convert time
    const date = data.NotifyDate.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Event handlers
    const handleRead = () => {
        const formData = new FormData();
        formData.append('id', data.PostId);
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
                if (data.TypeNotify) dispatch(actions.setScrollToComment(true));
                dispatch(actions.setPostData(responsePostData));
                dispatch(actions.setShowPostModal(true));
            })
            .catch(() => {
                dispatch(actions.setMessage('Bài viết không tồn tại hoặc đã bị xóa!'));
                dispatch(actions.setShowMessageModal(true));
            });
    };

    return (
        <div className={cx('wrapper')} onClick={handleRead}>
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
