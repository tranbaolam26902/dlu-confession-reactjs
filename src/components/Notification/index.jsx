import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore } from '../../store';
import styles from './Notification.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);

function Notification() {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [notifications, setNotifications] = useState([]);
    const [newNotifications, setNewNotifications] = useState(0);
    const [isNewNotification, setIsNewNotification] = useState(false);

    // Functions
    const countNewNotifications = () => {
        let count = 0;
        notifications.map((notification) => {
            if (notification.IsRead === false) count -= -1;
            return null;
        });
        return count;
    };

    // Event handlers
    const handleReadAll = () => {
        fetch(`${apiURL}/api/UserNotifi/ReadAll`, {
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
        })
            .then((response) => response.json())
            .then((responseNotifications) => {
                setNotifications(responseNotifications);
                setNewNotifications(0);
                setIsNewNotification(false);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch(`${apiURL}/api/UserNotifi/index`, {
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            })
                .then((response) => response.json())
                .then((responseNotifications) => {
                    setNotifications(responseNotifications);
                });
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const temp = countNewNotifications();
        if (temp > 0) {
            setNewNotifications(temp);
            setIsNewNotification(true);
        }
        // eslint-disable-next-line
    }, [notifications]);

    return (
        <div className='position-relative d-flex align-items-center'>
            <Tippy
                interactive
                trigger='click'
                placement='bottom-end'
                render={(attrs) => (
                    <div className='mt-2'>
                        <PopoverWrapper>
                            <div className='px-4' tabIndex={-1}>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h3 className={cx('header')}>Thông báo</h3>
                                    <h5 className={cx('read-all')} onClick={handleReadAll}>
                                        Đánh dấu tất cả là đã đọc
                                    </h5>
                                </div>
                                <hr />
                                {notifications.length === 0 && (
                                    <div className={cx('empty-notifications')}>Không có thông báo nào gần đây!</div>
                                )}
                                {notifications.map((notification) => {
                                    return <NotificationItem data={notification} key={notification.Id} />;
                                })}
                            </div>
                        </PopoverWrapper>
                    </div>
                )}
            >
                <div
                    data={newNotifications}
                    className={cx({
                        notification: isNewNotification,
                    })}
                >
                    <img src={icons.notification} alt='icon-notification' className={cx('button')} />
                </div>
            </Tippy>
        </div>
    );
}

export default Notification;
