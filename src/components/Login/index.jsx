import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';

import styles from './Login.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';
import Button from '../Button';

const cx = classNames.bind(styles);

function Login() {
    const [states, dispatch] = useStore();
    const { showLoginModal, isLoginModal } = states;
    const handleClose = () => {
        dispatch(actions.setShowLoginModal(false));
        dispatch(actions.setIsLoginModal(true));
    };
    const handleSwitch = () => dispatch(actions.setIsLoginModal(!isLoginModal));

    if (isLoginModal) {
        return (
            <Modal show={showLoginModal} onHide={handleClose} centered>
                <div className={cx('wrapper')}>
                    <button onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                    <div className='mt-3 mb-5 text-center'>
                        <img src={images.logoLarge} alt='logo' />
                        <h4 className='my-2 fw-bold'>ĐĂNG NHẬP</h4>
                    </div>
                    <form>
                        <Stack gap={2}>
                            <div className='d-flex flex-column'>
                                <label htmlFor='username-login'>Tên đăng nhập</label>
                                <input id='username-login' className={cx('text-box')} required />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='password-login'>Mật khẩu</label>
                                <input id='password-login' type='password' className={cx('text-box')} required />
                            </div>
                            <div className='d-flex align-items-center'>
                                <input id='remember-user' type='checkbox' className='me-1' />
                                <label htmlFor='remember-user'>Lưu tài khoản</label>
                            </div>
                            <Button secondary fluid>
                                Đăng nhập
                            </Button>
                        </Stack>
                    </form>
                    <div className='mt-3'>
                        <hr />
                        <h5 className='mt-3 text-center'>
                            <span>Chưa có tài khoản?</span>
                            <button className={cx('switch')} onClick={handleSwitch}>
                                Đăng ký ngay
                            </button>
                        </h5>
                    </div>
                </div>
            </Modal>
        );
    }
    return (
        <Modal show={showLoginModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <button onClick={handleClose}>
                    <img src={icons.close} alt='icon-close' />
                </button>
                <div className='mt-3 mb-5 text-center'>
                    <img src={images.logoLarge} alt='logo' />
                    <h4 className='my-2 fw-bold'>ĐĂNG KÝ</h4>
                </div>
                <form>
                    <Stack gap={2}>
                        <div className='d-flex flex-column'>
                            <label htmlFor='username-sign-up'>Tên đăng nhập</label>
                            <input id='username-sign-up' className={cx('text-box')} required />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='email'>Email</label>
                            <input id='email' type='email' className={cx('text-box')} required />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='password-sign-up'>Mật khẩu</label>
                            <input id='password-sign-up' type='password' className={cx('text-box')} required />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <label htmlFor='confirm-password'>Nhập lại mật khẩu</label>
                            <input id='confirm-password' type='password' className={cx('text-box')} required />
                        </div>
                        <Button secondary fluid>
                            Đăng ký
                        </Button>
                    </Stack>
                </form>
                <div className='mt-3'>
                    <hr />
                    <h5 className='mt-3 text-center'>
                        <span>Đã có tài khoản?</span>
                        <button className={cx('switch')} onClick={handleSwitch}>
                            Đăng nhập
                        </button>
                    </h5>
                </div>
            </div>
        </Modal>
    );
}

export default Login;
