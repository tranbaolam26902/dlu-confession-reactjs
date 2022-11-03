import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './ChangePasswordModal.module.scss';

import icons from '../../assets/icons';
import { Button } from '../Buttons';

const cx = classNames.bind(styles);

function ChangePasswordModal({ showChangePasswordModal, setShowChangePasswordModal }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Functions
    const validateChangePassword = () => {
        if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Mật khẩu và mật khẩu xác thực không trùng khớp!');
            return false;
        }
        return true;
    };

    // Event handlers
    const handleClose = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowChangePasswordModal(false);
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        if (validateChangePassword()) {
            const data = {
                OldPassword: oldPassword,
                NewPassword: newPassword,
                ConfirmPassword: confirmNewPassword,
            };
            fetch(`${apiURL}/api/Account/ChangePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status === 200) {
                    handleClose(e);
                    dispatch(actions.setMessage('Đổi mật khẩu thành công!'));
                    dispatch(actions.setShowMessageModal(true));
                    return;
                }
                if (response.status === 400) {
                    response.json().then((responseError) => {
                        setErrorMessage(responseError.ModelState.Error[0]);
                    });
                }
            });
        }
    };

    return (
        <Modal show={showChangePasswordModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Đổi mật khẩu</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='my-0' />
                <form onSubmit={handleChangePassword}>
                    <Stack gap={3} className='pt-3'>
                        <div className='text-danger text-center'>{errorMessage}</div>
                        <input
                            type='password'
                            autoFocus
                            className={cx('text-box')}
                            placeholder='Mật khẩu cũ'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === 'Enter' && e.preventDefault();
                            }}
                        />
                        <div className='position-relative'>
                            <input
                                type='password'
                                className={cx('text-box')}
                                placeholder='Mật khẩu mới'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onKeyPress={(e) => {
                                    e.key === 'Enter' && e.preventDefault();
                                }}
                            />
                            <div className={cx('password-hint')}>
                                Mật khẩu phải có ít nhất 01 chữ cái thường, 01 chữ số và tối thiểu 06 ký tự
                            </div>
                        </div>
                        <input
                            type='password'
                            className={cx('text-box')}
                            placeholder='Nhập lại mật khẩu mới'
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === 'Enter' && handleChangePassword(e);
                            }}
                        />
                        <div className='text-end'>
                            <Button text onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button secondary>Lưu</Button>
                        </div>
                    </Stack>
                </form>
            </div>
        </Modal>
    );
}

export default ChangePasswordModal;
