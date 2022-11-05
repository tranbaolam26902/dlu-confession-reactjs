import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../../store';
import styles from '../Account.module.scss';
import icons from '../../../assets/icons';
import images from '../../../assets/img';

import { Button } from '../../Buttons';

const cx = classNames.bind(styles);

function SignUp() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, showSignUpModal } = states;
    const { setToken } = useToken();

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');

    // Functions
    const validateSignUp = () => {
        if (username === '' || password === '' || confirmPassword === '' || email === '') {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin tài khoản!');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu và mật khẩu xác thực không trùng khớp!');
            return false;
        }
        return true;
    };
    const login = () => {
        fetch(`${apiURL}/token`, {
            method: 'POST',
            body: `grant_type=password&username=${username}&password=${password}`,
        })
            .then((response) => response.json())
            .then((responseToken) => {
                setToken('bearer ' + responseToken.access_token);
            });
    };

    // Event handlers
    const handleSignUp = (e) => {
        e.preventDefault();
        if (validateSignUp()) {
            const data = {
                UserName: username,
                Password: password,
                ConfirmPassword: confirmPassword,
                Email: email,
                NickName: nickname,
            };
            fetch(`${apiURL}/api/Account/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseError) => {
                    if (responseError.ModelState) {
                        setErrorMessage(responseError.ModelState.Error[0]);
                        return;
                    } else login();
                });
        }
    };
    const handleSwitchToSignIn = () => {
        dispatch(actions.setShowSignUpModal(false));
        dispatch(actions.setShowSignInModal(true));
    };
    const handleClose = () => {
        setErrorMessage('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setNickname('');
        setEmail('');
        dispatch(actions.setShowSignUpModal(false));
    };

    return (
        <Modal show={showSignUpModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <button onClick={handleClose}>
                    <img src={icons.close} alt='icon-close' />
                </button>
                <div className='mt-3 mb-4 text-center'>
                    <img src={images.logoLarge} alt='logo' />
                    <h4 className='my-2 fw-bold'>ĐĂNG KÝ</h4>
                </div>
                {errorMessage ? <div className='text-center text-danger'>{errorMessage}</div> : null}
                <form className='pt-4' onSubmit={handleSignUp}>
                    <Stack gap={2}>
                        <div className='d-flex flex-column'>
                            <label htmlFor='username-sign-up'>Tên đăng nhập *</label>
                            <input
                                autoFocus
                                id='username-sign-up'
                                className={cx('text-box')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='email'>Email *</label>
                            <input
                                id='email'
                                type='email'
                                className={cx('text-box')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='email'>Tên hiển thị</label>
                            <input
                                id='nickname'
                                className={cx('text-box')}
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                        <div className='d-flex flex-column position-relative'>
                            <label htmlFor='password-sign-up'>Mật khẩu *</label>
                            <input
                                id='password-sign-up'
                                type='password'
                                className={cx('text-box')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                        <button className={cx('switch')} onClick={handleSwitchToSignIn}>
                            Đăng nhập
                        </button>
                    </h5>
                </div>
            </div>
        </Modal>
    );
}

export default SignUp;
