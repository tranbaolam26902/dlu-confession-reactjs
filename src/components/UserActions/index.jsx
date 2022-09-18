import useViewPort from '../../hooks';
import icons from '../../assets/icons';
import Button from '../Button';

function UserActions() {
    const viewPort = useViewPort();
    const isMobile = viewPort.width < 992;
    if (isMobile) {
        return <img src={icons.user} alt='logo' />;
    } else {
        return (
            <>
                <Button text>Đăng ký</Button>
                <Button secondary>Đăng nhập</Button>
            </>
        );
    }
}

export default UserActions;
