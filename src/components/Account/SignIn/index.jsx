import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../../store';
import styles from '../Account.module.scss';
import icons from '../../../assets/icons';
import images from '../../../assets/img';

import { Button } from '../../Buttons';

const cx = classNames.bind(styles);

function SignIn() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, showSignInModal } = states;
    const { setToken } = useToken();

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Functions
    const validateSignIn = () => {
        if (username === '' || password === '') {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin tài khoản!');
            return false;
        }
        return true;
    };

    // Event handlers
    const handleLogin = (e) => {
        e.preventDefault();
        if (validateSignIn()) {
            fetch(`${apiURL}/token`, {
                method: 'POST',
                body: `grant_type=password&username=${username}&password=${password}`,
            })
                .then((response) => response.json())
                .then((responseToken) => {
                    if (responseToken.access_token) {
                        setToken('bearer ' + responseToken.access_token);
                    } else {
                        setErrorMessage(responseToken.error_description);
                    }
                });
        }
    };
    const handleForgotPassword = (e) => {
        e.preventDefault();
        dispatch(actions.setShowSignInModal(false));
        dispatch(actions.setShowForgotPasswordModal(true));
    };
    const handleSwitchToSignUp = () => {
        dispatch(actions.setShowSignInModal(false));
        dispatch(actions.setShowSignUpModal(true));
    };
    const handleClose = () => {
        setErrorMessage('');
        setUsername('');
        setPassword('');
        dispatch(actions.setShowSignInModal(false));
    };

    return (
        <Modal show={showSignInModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <button onClick={handleClose}>
                    <img src={icons.close} alt='icon-close' />
                </button>
                <div className='mt-3 mb-4 text-center'>
                    <img src={images.logoLarge} alt='logo' />
                    <h4 className='my-2 fw-bold'>ĐĂNG NHẬP</h4>
                </div>
                {errorMessage ? <div className='text-center text-danger'>{errorMessage}</div> : null}
                <form className='pt-4' onSubmit={handleLogin}>
                    <Stack gap={2}>
                        <div className='d-flex flex-column'>
                            <label htmlFor='username-login'>Tên đăng nhập</label>
                            <input
                                id='username-login'
                                className={cx('text-box')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <h5 className='my-1 text-end'>
                            <span role='button' onClick={handleForgotPassword}>
                                Quên mật khẩu?
                            </span>
                        </h5>
                        <Button secondary fluid>
                            Đăng nhập
                        </Button>
                    </Stack>
                </form>
                <div className='mt-3'>
                    <hr />
                    <h5 className='mt-3 text-center'>
                        <span>Chưa có tài khoản?</span>
                        <button className={cx('switch')} onClick={handleSwitchToSignUp}>
                            Đăng ký ngay
                        </button>
                    </h5>
                </div>
            </div>
        </Modal>
    );
}

export default SignIn;
