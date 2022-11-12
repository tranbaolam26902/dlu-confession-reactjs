import { useState, useEffect } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './EditRolesModal.module.scss';
import icons from '../../assets/icons';

import { Button } from '../Buttons';

const cx = classNames.bind(styles);

function EditRolesModal() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, showEditRolesModal, roleForEdit } = states;

    // Component's states
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');

    // Constants
    const ADMIN = 'Quản trị viên';
    const MANAGER = 'Quản lý';
    const USER = 'Người dùng';

    // Functions
    const getRoleIds = () => {
        fetch(`${apiURL}/api/AdmUser/getrole`, {
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
        })
            .then((response) => response.json())
            .then((responseRoles) => {
                setRoles(responseRoles);
            });
    };
    const getRoleIdByName = (name) => {
        const roleTemp = roles.map((role) => {
            if (role.Name === name) return role;
        });
        return roleTemp.Id;
    };

    // Event handlers
    const handleClose = () => {
        dispatch(actions.setShowEditRolesModal(false));
    };
    const handleEdit = (e) => {
        e.preventDefault();
        console.log(roleId);
    };
    const handleOnChange = (e) => {
        dispatch(actions.setRoleForEdit(e.target.value));
        setRoleId(e.target.value);
    };

    useEffect(() => {
        getRoleIds();
    }, []);

    return (
        <Modal show={showEditRolesModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Chỉnh sửa quyền</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='my-0' />
                <form onSubmit={handleEdit}>
                    <Stack gap={3} className='pt-3'>
                        <div>
                            <input
                                id='admin'
                                type='radio'
                                name='roles'
                                value={getRoleIdByName(ADMIN)}
                                checked={ADMIN === roleForEdit}
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
                                value={getRoleIdByName(MANAGER)}
                                checked={MANAGER === roleForEdit}
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
                                value={getRoleIdByName(USER)}
                                checked={USER === roleForEdit}
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
