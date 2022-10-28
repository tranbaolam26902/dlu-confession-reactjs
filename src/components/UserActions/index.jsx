import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';
import styles from './UserActions.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';
import { Button } from '../Buttons';
import Notification from '../Notification';

const cx = classNames.bind(styles);

function UserActions() {
    // Global states
    const [states, dispatch] = useStore();
    const { userAvatar } = states;
    const { token, removeToken } = useToken();
    const viewPort = useViewPort();

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
                                    delay={[0, 300]}
                                    placement='bottom-end'
                                    render={(attrs) => (
                                        <div style={{ marginTop: '2px' }}>
                                            <PopoverWrapper>
                                                <div className={cx('user-actions')}>
                                                    <button className={cx('btn-logout')} onClick={removeToken}>
                                                        Logout
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
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
