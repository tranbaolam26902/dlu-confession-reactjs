import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';

import styles from './UserActions.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import Button from '../Button';
import { Wrapper as PopoverWrapper } from '../Popover';

const cx = classNames.bind(styles);

function UserActions() {
    //Test notification
    let notification = 12;
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
                    </>
                )}
                {token && (
                    <>
                        <Button secondary onClick={() => dispatch(actions.setShowCreatePostModal(true))}>
                            Tạo bài viết
                        </Button>
                        <button className='mx-3'>
                            <div data={notification} className={cx({ notification: notification })}>
                                <img src={icons.noti} alt='icon-notification' />
                            </div>
                        </button>
                        <Tippy
                            interactive
                            delay={[0, 700]}
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
