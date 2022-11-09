import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions, useFocusInput } from '../../store';
import styles from './ReportModal.module.scss';
import icons from '../../assets/icons';

import { Button } from '../Buttons';

const cx = classNames.bind(styles);

function ReportModal() {
    // Custom hooks
    const [inputRef, setInputFocus] = useFocusInput();

    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, postData, showReportModal } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    // Variables
    const reasons = [
        'Nội dung không phù hợp',
        'Spam',
        'Thông tin sai sự thật',
        'Sử dụng hình ảnh cá nhân của tôi',
        'Ngôn từ gây thù ghét',
    ];

    // Functions

    // Event handlers
    const handleClose = () => {
        setErrorMessage('');
        dispatch(actions.setShowReportModal(false));
    };
    const handleReport = (e) => {
        e.preventDefault();
        if (reason === '' && otherReason === '') {
            setErrorMessage('Vui lòng chọn lý do');
        } else {
            const formData = new FormData();
            const data = {};
            data.Description = reason ? reason !== '' : otherReason;
            reason !== '' ? (data.Description = reason) : (data.Description = otherReason);
            formData.append('id', postData.Id);
            formData.append('Report', JSON.stringify(data));
            fetch(`${apiURL}/api/userpost/Report`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((responsePost) => {
                    if (responsePost.Id) {
                        handleClose();
                        dispatch(
                            actions.setMessage(
                                'Báo cáo của bạn đã được gửi đến quản trị viên để xem xét.\nCảm ơn bạn đã đóng góp',
                            ),
                        );
                        dispatch(actions.setShowMessageModal(true));
                    }
                    if (responsePost.ModelState) {
                        setErrorMessage(responsePost.ModelState.Error[0]);
                    }
                });
        }
    };

    return (
        <Modal show={showReportModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Báo cáo bài viết</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='my-0' />
                <form onSubmit={handleReport}>
                    <Stack gap={3} className='pt-3'>
                        <div className='text-danger text-center'>{errorMessage}</div>
                        <div className='fw-bold'>Chọn lý do báo cáo:</div>
                        <div className='d-flex'>
                            <input
                                id='reason-0'
                                type='radio'
                                name='reason'
                                value={reasons[0]}
                                className={cx('option')}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label htmlFor='reason-0' className='ms-1'>
                                {reasons[0]}
                            </label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='reason-1'
                                type='radio'
                                name='reason'
                                value={reasons[1]}
                                className={cx('option')}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label htmlFor='reason-1' className='ms-1'>
                                {reasons[1]}
                            </label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='reason-2'
                                type='radio'
                                name='reason'
                                value={reasons[2]}
                                className={cx('option')}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label htmlFor='reason-2' className='ms-1'>
                                {reasons[2]}
                            </label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='reason-3'
                                type='radio'
                                name='reason'
                                value={reasons[3]}
                                className={cx('option')}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label htmlFor='reason-3' className='ms-1'>
                                {reasons[3]}
                            </label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='reason-4'
                                type='radio'
                                name='reason'
                                value={reasons[4]}
                                className={cx('option')}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label htmlFor='reason-4' className='ms-1'>
                                {reasons[4]}
                            </label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='reason-5'
                                type='radio'
                                name='reason'
                                value={reasons[5]}
                                className={cx('option')}
                                onChange={() => {
                                    setInputFocus();
                                    setReason('');
                                }}
                            />
                            <label htmlFor='reason-5' className='ms-1'>
                                Khác
                            </label>
                            <input
                                ref={inputRef}
                                className={cx('other')}
                                placeholder='Vui lòng điền'
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                            />
                        </div>
                        <div className='text-end'>
                            <Button text onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button secondary>Gửi</Button>
                        </div>
                    </Stack>
                </form>
            </div>
        </Modal>
    );
}

export default ReportModal;
