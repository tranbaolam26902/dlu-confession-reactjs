import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import DropdownMultiSelect from 'react-multiselect-dropdown-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './CreatePost.module.scss';
import icons from '../../assets/icons';

import Button from '../Button';

const cx = classNames.bind(styles);

function CreatePost() {
    const [states, dispatch] = useStore();
    const { showCreatePostModal } = states;
    const [uploadImages, setUploadImages] = useState([]);
    const handleClose = () => {
        dispatch(actions.setShowCreatePostModal(false));
    };
    const handleUploadImages = (e) => {
        const currentUploadImages = [...uploadImages];
        const targetFiles = e.target.files;
        const targetFilesObject = [...targetFiles];
        targetFilesObject.map((file) => {
            return currentUploadImages.push(URL.createObjectURL(file));
        });
        setUploadImages(currentUploadImages);
    };
    return (
        <>
            <Modal size='lg' show={showCreatePostModal} onHide={handleClose} centered>
                <div className={cx('wrapper')}>
                    {/* Start: Header */}
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>Tạo bài viết</h3>
                        <button className={cx('close')} onClick={handleClose}>
                            <img src={icons.close} alt='icon-close' />
                        </button>
                    </div>
                    <hr className='my-0' />
                    {/* End: Header */}

                    {/* Start: Body */}
                    <Stack gap={3} className='mt-3'>
                        {/* Start: Select categories section */}
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='me-2'>Danh mục:</div>
                            <div className={cx('select-categories')}>
                                <DropdownMultiSelect
                                    options={['Học tập', 'Tìm trọ', 'Ký túc xá', 'Học phí', 'Nhập học']}
                                    name='categories'
                                    placeholder='Chọn danh mục *'
                                />
                                <img src={icons.arrowDown} alt='icon-arrow-down' className={cx('dropdown-icon')} />
                            </div>
                        </div>
                        {/* End: Select categories section */}

                        {/* Start: Title section */}
                        <input className={cx('text-box')} placeholder='Tiêu đề *' />
                        {/* End: Title section */}

                        {/* Start: Content section */}
                        <textarea className={cx('text-area')} placeholder='Nội dung...' />
                        {/* End: Content section */}

                        {/* Start: Upload images section */}
                        <input type='file' id='upload' hidden multiple onChange={handleUploadImages} />
                        <div className='d-flex justify-content-between'>
                            <label htmlFor='upload' className={cx('upload-label')}>
                                <img src={icons.galleryAdd} alt='icon-upload-images' className={cx('upload-icon')} />
                                <span>Thêm hình ảnh</span>
                            </label>
                            {uploadImages.length != 0 && (
                                <button onClick={() => setUploadImages([])}>
                                    <u>Xóa tất cả</u>
                                </button>
                            )}
                        </div>
                        <div className='d-flex'>
                            {uploadImages.map((image, index) => {
                                if (index < 5)
                                    return (
                                        <div key={index} className={cx('image-preview-wrapper')}>
                                            <img src={image} alt='post-image' className={cx('image-preview')} />
                                        </div>
                                    );
                            })}
                            {uploadImages.length >= 6 && (
                                <div className={cx('image-preview-wrapper')}>
                                    <img src={uploadImages[5]} alt='post-image' className={cx('image-preview')} />
                                    <h2 className={cx('upload-images-remaining')}>+{uploadImages.length - 6}</h2>
                                </div>
                            )}
                        </div>
                        {/* End: Upload images section */}

                        {/* Start: Actions section */}
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex align-items-center'>
                                    <input id='private' type='checkbox' className='me-2' />
                                    <label htmlFor='private' className={cx('private')}>
                                        Đăng ở chế độ ẩn danh
                                    </label>
                                </div>
                                <h6>(Những người khác sẽ không biết bạn là người đăng bài)</h6>
                            </div>
                            <div>
                                <Button text onClick={handleClose}>
                                    Hủy
                                </Button>
                                <Button secondary>Đăng</Button>
                            </div>
                        </div>
                        {/* End: Actions section */}
                    </Stack>
                    {/* End: Body */}
                </div>
            </Modal>
        </>
    );
}

export default CreatePost;
