import classNames from 'classnames/bind';
import styles from './Notify.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const notificationsArray = [
    {
        id: 0,
        title: 'This is a dummy notification, no worries',
    },
    {
        id: 1,
        title: 'This is a dummy notification, no worries',
    },
    {
        id: 2,
        title: 'This is a dummy notification, no worries',
    },
    {
        id: 3,
        title: 'This is a dummy notification, no worries',
    },
];

function Notify() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        setNotifications(notificationsArray);
    });

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('first-row')}>
                    <h3 className={cx('title')}>Notifications</h3>
                    <button className={cx('close-button')}>X</button>
                </div>
                <div className={cx('notification')}></div>
                {notifications.map((notification) => {
                    return (
                        <>
                            <div className={cx('')}></div>
                            <div className={cx('')}></div>
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default Notify;
