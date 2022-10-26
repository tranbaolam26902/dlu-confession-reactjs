import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useToken, useStore, actions } from '../../store';
import styles from './Login.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import Button from '../Button';

const cx = classNames.bind(styles);

function Login() {
    // Global states
    const [states, dispatch] = useStore();
    const { showLoginModal, isLoginModal, apiURL } = states;
    const { setToken } = useToken();

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [signUpNickname, setSignUpNickname] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');

    const handleSwitch = () => {
        setErrorMessage('');
        setLoginUsername('');
        setLoginPassword('');
        setSignUpUsername('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
        setSignUpNickname('');
        setSignUpEmail('');
        dispatch(actions.setIsLoginModal(!isLoginModal));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginUsername == '' || loginPassword == '') {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin tài khoản!');
            return;
        }
        fetch(`${apiURL}/token`, {
            method: 'POST',
            body: `grant_type=password&username=${loginUsername}&password=${loginPassword}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.access_token) {
                    setToken('bearer ' + data.access_token);
                } else {
                    setErrorMessage(data.error_description);
                }
            });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (signUpUsername == '' || signUpPassword == '' || signUpConfirmPassword == '' || signUpEmail == '') {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin tài khoản!');
            return;
        }
        if (signUpPassword !== signUpConfirmPassword) {
            setErrorMessage('Mật khẩu và mật khẩu xác thực không trùng khớp!');
            return;
        }
        const data = {
            UserName: signUpUsername,
            Password: signUpPassword,
            ConfirmPassword: signUpConfirmPassword,
            Email: signUpEmail,
            NickName: signUpNickname,
        };
        fetch(`${apiURL}/api/Account/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ModelState) {
                    setErrorMessage(data.ModelState.Error[0]);
                    return;
                }
                fetch(`${apiURL}/token`, {
                    method: 'POST',
                    body: `grant_type=password&username=${signUpUsername}&password=${signUpPassword}`,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setToken('bearer ' + data.access_token);
                    });
            });
    };

    const handleClose = () => {
        setErrorMessage('');
        setLoginUsername('');
        setLoginPassword('');
        setSignUpUsername('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
        setSignUpNickname('');
        setSignUpEmail('');
        dispatch(actions.setShowLoginModal(false));
        dispatch(actions.setIsLoginModal(true));
    };

    if (isLoginModal) {
        return (
            <Modal show={showLoginModal} onHide={handleClose} centered>
                <div className={cx('wrapper')}>
                    <button onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                    <div className='mt-3 mb-4 text-center'>
                        <img src={images.logoLarge} alt='logo' />
                        <h4 className='my-2 fw-bold'>ĐĂNG NHẬP</h4>
                    </div>
                    {errorMessage && <div className='text-center text-danger'>{errorMessage}</div>}
                    <form className='pt-4' onSubmit={handleLogin}>
                        <Stack gap={2}>
                            <div className='d-flex flex-column'>
                                <label htmlFor='username-login'>Tên đăng nhập</label>
                                <input
                                    id='username-login'
                                    className={cx('text-box')}
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='password-login'>Mật khẩu</label>
                                <input
                                    id='password-login'
                                    type='password'
                                    className={cx('text-box')}
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='d-flex align-items-center'>
                                {/* <input id='remember-user' type='checkbox' className='me-1' />
                                <label htmlFor='remember-user'>Lưu tài khoản</label> */}
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
    } else {
        return (
            <Modal show={showLoginModal} onHide={handleClose} centered>
                <div className={cx('wrapper')}>
                    <button onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                    <div className='mt-3 mb-4 text-center'>
                        <img src={images.logoLarge} alt='logo' />
                        <h4 className='my-2 fw-bold'>ĐĂNG KÝ</h4>
                    </div>
                    {errorMessage && <div className='text-center text-danger'>{errorMessage}</div>}
                    <form className='pt-4' onSubmit={handleSignUp}>
                        <Stack gap={2}>
                            <div className='d-flex flex-column'>
                                <label htmlFor='username-sign-up'>Tên đăng nhập *</label>
                                <input
                                    id='username-sign-up'
                                    className={cx('text-box')}
                                    value={signUpUsername}
                                    onChange={(e) => setSignUpUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='email'>Email *</label>
                                <input
                                    id='email'
                                    type='email'
                                    className={cx('text-box')}
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='email'>Tên hiển thị</label>
                                <input
                                    id='nickname'
                                    className={cx('text-box')}
                                    value={signUpNickname}
                                    onChange={(e) => setSignUpNickname(e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column position-relative'>
                                <label htmlFor='password-sign-up'>Mật khẩu *</label>
                                <input
                                    id='password-sign-up'
                                    type='password'
                                    className={cx('text-box')}
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    required
                                />
                                <div className={cx('password-hint')}>
                                    Mật khẩu phải có ít nhất 01 chữ cái thường, 01 chữ số và tối thiểu 06 ký tự
                                </div>
                            </div>
                            <div className='d-flex flex-column mb-2'>
                                <label htmlFor='confirm-password'>Nhập lại mật khẩu *</label>
                                <input
                                    id='confirm-password'
                                    type='password'
                                    className={cx('text-box')}
                                    value={signUpConfirmPassword}
                                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                                    required
                                />
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
}

export default Login;
