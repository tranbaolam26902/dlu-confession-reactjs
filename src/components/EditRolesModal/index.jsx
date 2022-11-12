import { useState, useEffect } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './EditRolesModal.module.scss';
import icons from '../../assets/icons';

import { Button } from '../Buttons';

const cx = classNames.bind(styles);

function EditRolesModal({ setReRender }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, showEditRolesModal, accountData } = states;

    // Component's states
    const [adminId, setAdminId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [userId, setUserId] = useState('');

    // Constants
    const ADMIN = 'Quản trị viên';
    const MANAGER = 'Quản lý';
    const USER = 'Người dùng';

    // Functions
    const getRoles = () => {
        fetch(`${apiURL}/api/AdmUser/getrole`, {
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
        })
            .then((response) => response.json())
            .then((responseRoles) => {
                responseRoles.map((role) => {
                    if (role.Name === 'Admin') setAdminId(role.Id);
                    if (role.Name === 'Manager') setManagerId(role.Id);
                    if (role.Name === 'User') setUserId(role.Id);
                    return null;
                });
            });
    };

    // Event handlers
    const handleClose = () => {
        dispatch(actions.setShowEditRolesModal(false));
    };
    const handleEdit = (e) => {
        e.preventDefault();
        const data = {
            RoleTemps: [],
            Id: accountData.Id,
        };
        if (accountData.Role === ADMIN) data.RoleTemps = [userId, managerId, adminId];
        if (accountData.Role === MANAGER) data.RoleTemps = [userId, managerId];
        if (accountData.Role === USER) data.RoleTemps = [userId];
        const formData = new FormData();
        formData.append('account', JSON.stringify(data));
        fetch(`${apiURL}/api/AdmUser/SetRolesUser`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
            body: formData,
        }).then((response) => {
            setReRender({ response });
            handleClose();
        });
    };
    const handleOnChange = (e) => {
        dispatch(
            actions.setAccountData({
                Id: accountData.Id,
                Role: e.target.value,
            }),
        );
    };

    useEffect(() => {
        getRoles();
        // eslint-disable-next-line
    }, []);

    return (
        <Modal show={showEditRolesModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Chỉnh sửa tài khoản</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='my-0' />
                <form onSubmit={handleEdit}>
                    <Stack gap={3} className='pt-3'>
                        <div>Chọn loại tài khoản:</div>
                        <div>
                            <input
                                id='admin'
                                type='radio'
                                name='roles'
                                value={ADMIN}
                                checked={accountData.Role === ADMIN}
                                onChange={handleOnChange}
                            />
                            <label htmlFor='admin' className='ms-1'>
                                {ADMIN}
                            </label>
                        </div>
                        <div>
                            <input
                                id='manager'
                                type='radio'
                                name='roles'
                                value={MANAGER}
                                checked={accountData.Role === MANAGER}
                                onChange={handleOnChange}
                            />
                            <label htmlFor='manager' className='ms-1'>
                                {MANAGER}
                            </label>
                        </div>
                        <div>
                            <input
                                id='user'
                                type='radio'
                                name='roles'
                                value={USER}
                                checked={accountData.Role === USER}
                                onChange={handleOnChange}
                            />
                            <label htmlFor='user' className='ms-1'>
                                {USER}
                            </label>
                        </div>
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

export default EditRolesModal;
