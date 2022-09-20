import { useStore, actions } from '../../store';
import { useViewPort } from '../../store';
import icons from '../../assets/icons';
import Button from '../Button';

function UserActions() {
    const [states, dispatch] = useStore();
    const viewPort = useViewPort();
    const isMobile = viewPort.width < 992;
    const handleLogin = () => {
        dispatch(actions.setIsLoginModal(true));
        dispatch(actions.setShowLogin(true));
    }
    const handleSignUp = () => {
        dispatch(actions.setIsLoginModal(false));
        dispatch(actions.setShowLogin(true));
    }
    if (isMobile) {
        return <img src={icons.user} alt='logo' />;
    } else {
        return (
            <>
                <Button text onClick={handleSignUp}>Đăng ký</Button>
                <Button secondary onClick={handleLogin}>Đăng nhập</Button>
            </>
        );
    }
}

export default UserActions;
