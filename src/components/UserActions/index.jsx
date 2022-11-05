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
import ChangePasswordModal from '../ChangePasswordModal';

const cx = classNames.bind(styles);

function UserActions() {
    // Global states
    const [states, dispatch] = useStore();
    const { userId, userAvatar, roles } = states;
    const { token, removeToken } = useToken();
    const viewPort = useViewPort();

    // Component's states
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    // Variables
    const isMobile = viewPort.width < 992;

    // Event handlers
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
                                                    {roles && roles.includes('Manager') ? (
                                                        <Link to='/manage-reported-posts' className={cx('option')}>
                                                            Quản lý bài viết
                                                        </Link>
                                                    ) : null}
                                                    <button
                                                        className={cx('option')}
                                                        onClick={() => setShowChangePasswordModal(true)}
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
                        <ChangePasswordModal
                            showChangePasswordModal={showChangePasswordModal}
                            setShowChangePasswordModal={setShowChangePasswordModal}
                        />
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
