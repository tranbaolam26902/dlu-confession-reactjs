import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';
import styles from './UserActions.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import { Wrapper as PopoverWrapper } from '../Popover';
import Button from '../Button';
import NotificationButton from '../Notification/NotificationButton';

const cx = classNames.bind(styles);

const notify = [
    {
        id: 0,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description:
            'Many look up to me as the Shirasagi Himegimi and as the daughter of the Kamisato Clan. But the object of their respect has everything to do with my position, and nothing at all to do with me, Ayaka. It makes me think that... maybe, there is only one person I know who is truly able to get close to me',
        state: true,
    },
    {
        id: 1,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "I'm a social vegan. I avoid meet",
    },
    {
        id: 2,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "Mirrors don't lie. And lucky for you they don't laugh",
        state: true,
    },
    {
        id: 3,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "Mirrors don't lie. And lucky for you they don't laugh",
        state: true,
    },
    {
        id: 4,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "Mirrors don't lie. And lucky for you they don't laugh",
        state: true,
    },
    {
        id: 5,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "Mirrors don't lie. And lucky for you they don't laugh",
        state: true,
    },
    {
        id: 6,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "Mirrors don't lie. And lucky for you they don't laugh",
        state: true,
    },
    {
        id: 7,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: "Mirrors don't lie. And lucky for you they don't laugh",
        state: true,
    },
];

function UserActions() {
    //Test notification
    let notification = 12;
    let notificationProps = {
        notification: notification,
        data: notify,
    };

    // Global states
    const [states, dispatch] = useStore();
    const { token, removeToken } = useToken();
    const { apiURL, roles } = states;
    const viewPort = useViewPort();

    // Component's states
    const [userAvatar, setUserAvatar] = useState(images.avatar);
    const imageURL = `${apiURL}/image/user?id=`;

    // Variables
    const isMobile = viewPort.width < 992;

    const handleLogin = () => {
        dispatch(actions.setIsLoginModal(true));
        dispatch(actions.setShowLoginModal(true));
    };

    const handleSignUp = () => {
        dispatch(actions.setIsLoginModal(false));
        dispatch(actions.setShowLoginModal(true));
    };

    useEffect(() => {
        if (localStorage.getItem('token'))
            fetch(`${apiURL}/api/useraccount/getinfo`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.RoleTemps) dispatch(actions.setRoles(data.RoleTemps));
                    if (data.UserProfile.Avatar) setUserAvatar(`${imageURL}${data.UserProfile.Avatar}`);
                });
    }, []);

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
                        {/* <NotificationButton {...notificationProps} /> */}
                    </>
                )}
                {token && (
                    <>
                        <div className='d-flex justify-content-end'>
                            <Button secondary onClick={() => dispatch(actions.setShowCreatePostModal(true))}>
                                Tạo bài viết
                            </Button>
                            <NotificationButton {...notificationProps} />
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
                                    <img src={userAvatar} alt='user-avatar' className={cx('image')} />
                                </div>
                            </Tippy>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
