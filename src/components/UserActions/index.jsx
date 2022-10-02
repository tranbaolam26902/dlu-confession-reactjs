import { useStore, actions, useToken } from '../../store';
import { useViewPort } from '../../store';
import classNames from 'classnames/bind';

import styles from './UserActions.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import Button from '../Button';

const cx = classNames.bind(styles);

function UserActions() {
    //Test notification
    let notification = 12;
    
    const [states, dispatch] = useStore();
    const { token } = useToken;
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
                            <div dataNewNotification={notification} className={cx({notification: notification})}>
                                <img src={icons.noti} alt='icon-notification' />
                            </div>
                        </button>
                        <img src={images.avatar} alt='user-avatar' />
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
