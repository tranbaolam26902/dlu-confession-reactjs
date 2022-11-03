import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Modal, Stack } from 'react-bootstrap';

import { useStore } from '../../../store';
import styles from './EditModal.module.scss';
import icons from '../../../assets/icons';

import { Button } from '../../Buttons';

const cx = classNames.bind(styles);

function EditModal({ data, showEditModal, setShowEditModal }) {
    // Global states
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');

    // Event handlers
    const handleClose = () => {
        setShowEditModal(false);
    };
    const handleEdit = () => {};
    const handleChangeAvatar = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    useEffect(() => {
        try {
            if (data.UserProfile.NickName) setNickname(data.UserProfile.NickName);
            if (data.UserProfile.Description) setDescription(data.UserProfile.Description);
            if (data.UserProfile.Avatar) setAvatar(avatarURL + data.UserProfile.Avatar);
        } catch {}
    }, []);

    return (
        <Modal size='lg' show={showEditModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Chỉnh sửa thông tin</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='my-0' />
                {data.Id ? (
                    <form onSubmit={handleEdit}>
                        <Stack gap={3} className='mt-3'>
                            <div className='text-danger text-center'>{errorMessage}</div>
                            <label for='avatar' className={cx('avatar-selector')}>
                                <img src={avatar} className={cx('avatar')} alt='avatar' />
                                <div className={cx('overlay')}>Đổi ảnh đại diện</div>
                            </label>
                            <input id='avatar' type='file' hidden onChange={handleChangeAvatar} />
                            <div className='d-flex flex-column'>
                                <label for='nickname'>Tên hiển thị: *</label>
                                <input
                                    id='nickname'
                                    className={cx('text-box')}
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <label for='description'>Giới thiệu:</label>
                                <input
                                    id='description'
                                    className={cx('text-box')}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='d-flex justify-content-end align-items-center'>
                                <Button text onClick={handleClose}>
                                    Hủy
                                </Button>
                                <Button secondary>Lưu</Button>
                            </div>
                        </Stack>
                    </form>
                ) : null}
            </div>
        </Modal>
    );
}

export default EditModal;
