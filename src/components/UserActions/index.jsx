import { useStore, actions } from '../../store';
import { useViewPort } from '../../store';
import icons from '../../assets/icons';
import images from '../../assets/img';
import Button from '../Button';

function UserActions() {
    const [states, dispatch] = useStore();
    const { token } = states;
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
                        <Button secondary onClick={() => dispatch(actions.setShowCreatePostModal(true))}>Tạo bài viết</Button>
                        <button className='mx-3'><img src={icons.notiNews} alt="icon-notification" /></button>
                        <img src={images.avatar} alt="user-avatar" />
                    </>
                )}
            </>
        );
    }
}

export default UserActions;
