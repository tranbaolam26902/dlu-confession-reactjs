import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from '../Account.module.scss';
import icons from '../../../assets/icons';
import images from '../../../assets/img';

import { Button } from '../../Buttons';

const cx = classNames.bind(styles);

function ForgotPassword() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, showForgotPasswordModal } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [sendCode, setSendCode] = useState('Gửi mã');
    const [disableSendCode, setDisableSendCode] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Constants
    const SEND_CODE_TIME_OUT = 30; // 30 seconds

    // Functions
    const validateEmail = () => {
        if (email === '') {
            setErrorMessage('Vui lòng nhập Email');
            return false;
        }
        return true;
    };
    const setCountdown = () => {
        setDisableSendCode(true);
        setSendCode(SEND_CODE_TIME_OUT);
        const countdown = setInterval(() => {
            setSendCode((sendCode) => {
                if (sendCode === 0) {
                    setSendCode('Gửi mã');
                    setDisableSendCode(false);
                    clearInterval(countdown);
                }
                return sendCode - 1;
            });
        }, 1000);
    };

    // Event handlers
    const handleSendCode = (e) => {
        e.preventDefault();
        if (errorMessage !== '') setErrorMessage('');
        if (validateEmail()) {
            setCountdown();
            const formData = new FormData();
            formData.append('email', email);
            fetch(`${apiURL}/api/Account/SendEmailOTP`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (response.status !== 200) return response.json();
                })
                .then((responseError) => {
                    if (responseError.ModelState) {
                        setErrorMessage(responseError.ModelState.Error[0]);
                    }
                });
        }
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const data = {
            Email: email,
            Otp: otp,
            NewPassword: newPassword,
        };
        formData.append('ForgotPassword', JSON.stringify(data));
        fetch(`${apiURL}/api/Account/ForgotPassword`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.status !== 200) return response.json();
                else {
                    handleClose();
                    dispatch(actions.setMessage('Đổi mật khẩu thành công'));
                    dispatch(actions.setShowMessageModal(true));
                }
            })
            .then((responseError) => {
                if (responseError.ModelState) {
                    setErrorMessage(responseError.ModelState.Error[0]);
                }
            });
    };
    const handleSwitchToSignIn = () => {
        dispatch(actions.setShowForgotPasswordModal(false));
        dispatch(actions.setShowSignInModal(true));
    };
    const handleClose = () => {
        setErrorMessage('');
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        dispatch(actions.setShowForgotPasswordModal(false));
    };

    return (
        <Modal show={showForgotPasswordModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <button onClick={handleClose}>
                    <img src={icons.close} alt='icon-close' />
                </button>
                <div className='mt-3 mb-4 text-center'>
                    <img src={images.logoLarge} alt='logo' />
                    <h4 className='my-2 fw-bold'>KHÔI PHỤC MẬT KHẨU</h4>
                </div>
                <div className='mb-3 text-center'>
                    <i>
                        Vui lòng nhập Email của tài khoản bị mất để lấy mã xác nhận trước khi tiến hành đặt lại mật khẩu
                    </i>
                </div>
                {errorMessage ? <div className='text-center text-danger'>{errorMessage}</div> : null}
                <form className='pt-4' onSubmit={handleChangePassword}>
                    <Stack gap={2}>
                        <div className='d-flex'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    className={cx('text-box')}
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>
                            <span
                                role='button'
                                className={cx('btn-get-code', { disable: disableSendCode })}
                                onClick={
                                    disableSendCode
                                        ? (e) => {
                                              e.preventDefault();
                                          }
                                        : handleSendCode
                                }
                            >
                                {sendCode}
                            </span>
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <label htmlFor='otp'>Mã xác nhận</label>
                            <input
                                id='otp'
                                className={cx('text-box')}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <div className='d-flex flex-column position-relative'>
                                <label htmlFor='new-password'>Mật khẩu mới</label>
                                <input
                                    id='new-password'
                                    type='password'
                                    className={cx('text-box')}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <div className={cx('password-hint')}>
                                    Mật khẩu phải có ít nhất 01 chữ cái thường, 01 chữ số và tối thiểu 06 ký tự
                                </div>
                            </div>
                            <label htmlFor='confirm-new-password'>Nhập lại mật khẩu mới</label>
                            <input
                                id='confirm-new-password'
                                type='password'
                                className={cx('text-box')}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button secondary fluid>
                            Xác nhận
                        </Button>
                    </Stack>
                </form>
                <div className='mt-3'>
                    <hr />
                    <h5 className='mt-3 text-center'>
                        <span>Quay lại</span>
                        <button className={cx('switch')} onClick={handleSwitchToSignIn}>
                            Đăng nhập
                        </button>
                    </h5>
                </div>
            </div>
        </Modal>
    );
}

export default ForgotPassword;
