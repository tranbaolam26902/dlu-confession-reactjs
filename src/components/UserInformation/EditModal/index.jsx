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
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState();
    const [isVertical, setIsVertical] = useState(false);

    // Functions
    const validateInformation = () => {
        if (nickname === '') return false;
        return true;
    };

    // Event handlers
    const handleClose = () => {
        setErrorMessage('');
        setShowEditModal(false);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        if (validateInformation()) {
            const userData = {
                UserProfile: {
                    NickName: nickname,
                    Description: description,
                },
            };
            const formData = new FormData();
            if (avatarFile !== null) formData.append('file', avatarFile);
            formData.append('account', JSON.stringify(userData));
            fetch(`${apiURL}/api/useraccount/UpdateAccount`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            }).then(() => window.location.reload());
        } else setErrorMessage('Tên hiển thị không được để trống!');
    };
    const handleChangeAvatar = (e) => {
        const imgURL = URL.createObjectURL(e.target.files[0]);
        const img = new Image();
        img.src = imgURL;
        img.onload = () => {
            if (img.height > img.width) setIsVertical(true);
            else setIsVertical(false);
        };
        setAvatar(imgURL);
        setAvatarFile(e.target.files[0]);
    };
    const handleLoadAvatar = () => {
        const img = new Image();
        img.src = `${avatarURL}${data.UserProfile.Avatar}`;
        img.onload = () => {
            if (img.height > img.width) setIsVertical(true);
            else setIsVertical(false);
        };
    };

    useEffect(() => {
        try {
            if (data.UserProfile.NickName) setNickname(data.UserProfile.NickName);
            if (data.UserProfile.Description) setDescription(data.UserProfile.Description);
            if (data.UserProfile.Avatar) setAvatar(avatarURL + data.UserProfile.Avatar);
        } catch {}
        // eslint-disable-next-line
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
                            <label htmlFor='avatar' className={cx('avatar-selector')}>
                                <img
                                    src={avatar}
                                    className={cx('avatar', { isVertical: isVertical })}
                                    alt='avatar'
                                    onChange={handleLoadAvatar}
                                />
                                <div className={cx('overlay')}>Đổi ảnh đại diện</div>
                            </label>
                            <input id='avatar' type='file' hidden onChange={handleChangeAvatar} />
                            <div className='d-flex flex-column'>
                                <label htmlFor='nickname'>Tên hiển thị: *</label>
                                <input
                                    id='nickname'
                                    className={cx('text-box')}
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' && e.preventDefault();
                                    }}
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='description'>Giới thiệu:</label>
                                <input
                                    id='description'
                                    className={cx('text-box')}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' && e.preventDefault();
                                    }}
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
