import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

function Notification({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL, notifications } = states;

    // Convert time
    const date = data.NotifyDate.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Functions
    const showPost = () => {
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
    const getNotifications = () => {
        if (localStorage.getItem('token')) {
            fetch(`${apiURL}/api/UserNotifi/index`, {
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            })
                .then((response) => response.json())
                .then((responseNotifications) => {
                    dispatch(actions.setNotifications(responseNotifications));
                });
        }
    };
    const setNotificationStatus = () => {
        const formData = new FormData();
        formData.append('id', data.Id);
        if (!data.IsRead)
            fetch(`${apiURL}/api/UserNotifi/ReadNotify`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            }).then(() => {
                getNotifications();
            });
    };

    // Event handlers
    const handleRead = () => {
        showPost();
        setNotificationStatus();
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
