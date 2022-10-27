import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';
import styles from './UserActions.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';
import Button from '../Button';
import Notification from '../Notification';

const cx = classNames.bind(styles);

function UserActions() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, userAvatar } = states;
    const { token, removeToken } = useToken();
    const viewPort = useViewPort();

    // Component's states
    const [notifications, setNotifications] = useState([]);

    // Variables
    const isMobile = viewPort.width < 992;

    useEffect(() => {
        let mounted = true;

        if (localStorage.getItem('token')) {
            fetch(`${apiURL}/api/UserNotifi/index`, {
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (mounted) setNotifications(data);
                });
        }

        return () => (mounted = false);
    }, []);

    const handleLogin = () => {
        dispatch(actions.setIsLoginModal(true));
        dispatch(actions.setShowLoginModal(true));
    };

    const handleSignUp = () => {
        dispatch(actions.setIsLoginModal(false));
        dispatch(actions.setShowLoginModal(true));
    };

    if (isMobile) {
        return <img src={icons.user} alt='logo' />;
    } else {
        return (
            <>
                {!token && (
                    <>
                        <Button text onClick={handleSignUp}>
                            Đăng ký
                        </Button>
                        <Button secondary onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                    </>
                )}
                {token && (
                    <>
                        <div className='d-flex justify-content-end'>
                            <Button secondary onClick={() => dispatch(actions.setShowCreatePostModal(true))}>
                                Tạo bài viết
                            </Button>
                            <div className='d-flex align-items-center position-relative'>
                                <Tippy
                                    interactive
                                    delay={[0, 300]}
                                    placement='bottom-end'
                                    render={(attrs) => (
                                        <PopoverWrapper>
                                            <div className='px-4' tabIndex={-1}>
                                                <h3 className={cx('header')}>Thông báo</h3>
                                                <hr />
                                                {notifications.length == 0 && (
                                                    <div className={cx('empty-notifications')}>
                                                        Không có thông báo nào gần đây!
                                                    </div>
                                                )}
                                                {notifications.map((notification) => {
                                                    return <Notification data={notification} key={notification.Id} />;
                                                })}
                                            </div>
                                        </PopoverWrapper>
                                    )}
                                >
                                    <div
                                        data={notifications.map((notification) => !notification.IsRead).length}
                                        className={cx({
                                            notification:
                                                notifications.map((notification) => !notification.IsRead).length != 0,
                                        })}
                                    >
                                        <img src={icons.notification} alt='icon-notification' className='mx-3' />
                                    </div>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy
                                    interactive
                                    delay={[0, 300]}
                                    placement='bottom-end'
                                    render={(attrs) => (
                                        <PopoverWrapper>
                                            <div className={cx('user-actions')}>
                                                <button className={cx('btn-logout')} onClick={removeToken}>
                                                    Logout
                                                </button>
                                            </div>
                                        </PopoverWrapper>
                                    )}
                                >
                                    <div className={cx('avatar')}>
                                        {userAvatar && (
                                            <img
                                                src={userAvatar}
                                                alt='user-avatar'
                                                loading='lazy'
                                                className={cx('image')}
                                            />
                                        )}
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
