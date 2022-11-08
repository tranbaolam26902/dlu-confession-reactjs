import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';
import styles from './UserActions.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';
import { Button } from '../Buttons';
import { ButtonToProfile } from '../Buttons';
import Notification from '../Notification';

const cx = classNames.bind(styles);

function UserActions() {
    // Global states
    const [states, dispatch] = useStore();
    const { userId, userAvatar, roles } = states;
    const { token, removeToken } = useToken();
    const viewPort = useViewPort();

    // Component's states
    const [isVertical, setIsVertical] = useState(false);

    // Variables
    const isMobile = viewPort.width < 992;

    // Event handlers
    const handleSignIn = () => {
        dispatch(actions.setShowSignUpModal(false));
        dispatch(actions.setShowSignInModal(true));
    };
    const handleSignUp = () => {
        dispatch(actions.setShowSignInModal(false));
        dispatch(actions.setShowSignUpModal(true));
    };
    const handleLoadAvatar = () => {
        const img = new Image();
        img.src = userAvatar;
        img.onload = () => {
            if (img.height > img.width) setIsVertical(true);
            else setIsVertical(false);
        };
    };

    if (isMobile) {
        return <img src={icons.user} alt='logo' />;
    } else {
        return (
            <>
                {!token ? (
                    <>
                        <Button text onClick={handleSignUp}>
                            Đăng ký
                        </Button>
                        <Button secondary onClick={handleSignIn}>
                            Đăng nhập
                        </Button>
                    </>
                ) : null}
                {token ? (
                    <>
                        <div className='d-flex justify-content-end'>
                            <Button secondary onClick={() => dispatch(actions.setShowCreatePostModal(true))}>
                                Tạo bài viết
                            </Button>
                            <Notification />
                            <div>
                                <Tippy
                                    interactive
                                    trigger='click'
                                    placement='bottom-end'
                                    render={(attrs) => (
                                        <div style={{ marginTop: '2px' }}>
                                            <PopoverWrapper>
                                                <div className={cx('user-actions')}>
                                                    <ButtonToProfile id={userId}>
                                                        <button className={cx('option')}>Trang cá nhân</button>
                                                    </ButtonToProfile>
                                                    {roles && roles.includes('Admin') ? (
                                                        <Link to='/manage-accounts' className={cx('option')}>
                                                            Quản lý tài khoản
                                                        </Link>
                                                    ) : null}
                                                    {roles && roles.includes('Manager') ? (
                                                        <Link to='/manage-reported-posts' className={cx('option')}>
                                                            Quản lý bài viết
                                                        </Link>
                                                    ) : null}
                                                    <button
                                                        className={cx('option')}
                                                        onClick={() =>
                                                            dispatch(actions.setShowChangePasswordModal(true))
                                                        }
                                                    >
                                                        Đổi mật khẩu
                                                    </button>
                                                    <button className={cx('option', 'logout')} onClick={removeToken}>
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            </PopoverWrapper>
                                        </div>
                                    )}
                                >
                                    <div className={cx('avatar')}>
                                        {userAvatar ? (
                                            <img
                                                src={userAvatar}
                                                alt='user-avatar'
                                                loading='lazy'
                                                className={cx('image', { isVertical: isVertical })}
                                                onLoad={handleLoadAvatar}
                                            />
                                        ) : null}
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                    </>
                ) : null}
            </>
        );
    }
}

export default UserActions;
