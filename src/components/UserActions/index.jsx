import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';

import styles from './UserActions.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import Button from '../Button';
import { Wrapper as PopoverWrapper } from '../Popover';
import NotificationButton from '../Notification/NotificationButton';

const cx = classNames.bind(styles);

const notify = [
    {
        id: 0,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 1,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 2,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 3,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 4,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 5,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 6,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
    {
        id: 7,
        imgUrl: 'avatar.png',
        time: '12 minutes ago',
        description: '5 sao, he Phong, kiem don',
        state: true,
    },
];

function UserActions() {
    //Test notification
    let notification = 12;
    let notificationProps = {
        notification: notification,
        data:notify,
    }
    const [states, dispatch] = useStore();
    const { token, removeToken } = useToken();
    const viewPort = useViewPort();
    const isMobile = viewPort.width < 992;
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
                        {/* <NotificationButton {...notificationProps} /> */}
                    </>
                )}
                {token && (
                    <>
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
                            <img src={images.avatar} alt='user-avatar' />
                        </Tippy>
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
