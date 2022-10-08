import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import DropdownMultiSelect from 'react-multiselect-dropdown-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './CreatePost.module.scss';
import icons from '../../assets/icons';

import Button from '../Button';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function CreatePost() {
    const [states, dispatch] = useStore();
    const { showCreatePostModal } = states;
    const { apiURL } = states;

    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
        dispatch(actions.setShowCreatePostModal(false));
    };

    const [uploadImages, setUploadImages] = useState([]);
    const handleUploadImages = (e) => {
        const currentUploadImages = [...uploadImages];
        const targetFiles = e.target.files;
        setPostImages(targetFiles);
        const targetFilesObject = [...targetFiles];
        targetFilesObject.map((file) => {
            return currentUploadImages.push(URL.createObjectURL(file));
        });
        setUploadImages(currentUploadImages);
    };

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((data) => {
                const selectedCategories = [];
                data.map((category) => {
                    selectedCategories.push({ key: category.Id, label: category.Name });
                });
                setCategories(selectedCategories);
            });
    }, []);

    const handleSelectCategories = (selected) => {
        setPostCategories(selected);
    };

    let formData = {
        Title: 'Genshin Impact',
        Description: 'How to roll ayaka c6r5',
        Actived: true,
        SelectedCategories: ['43643945-eef6-41df-a050-8f3866f89132', 'ce20c7fc-c27d-4413-a46e-d0bca5313ac5'],
    };

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [postCategories, setPostCategories] = useState([]);
    const [postImages, setPostImages] = useState([]);

    formData.Title = postTitle;
    formData.Description = postContent;
    formData.PrivateMode = isPrivate;
    formData.SelectedCategories = postCategories;
    // formData.Images = postImages;

    const handlePost = (e) => {
        e.preventDefault();
        if (postCategories.length == 0) {
            setErrorMessage('Chọn ít nhất 01 danh mục');
            return;
        }
        if (postTitle == '') {
            setErrorMessage('Nhập tiêu đề cho bài viết');
            return;
        }
        fetch(`${apiURL}/api/userpost/create`, {
            method: 'POST',
            headers: {
                Host: '<calculated when request is sent>',
                Authorization: localStorage.getItem('token'),
            },
            body: {
                post: formData,
            },
        });
        console.log(localStorage.getItem('token'));
        console.log(formData);
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
                    <form onSubmit={handlePost}>
                        <Stack gap={3} className='mt-3'>
                            <div className='text-danger text-center'>{errorMessage}</div>
                            {/* Start: Select categories section */}
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='me-2'>Danh mục:</div>
                                <div className={cx('select-categories')}>
                                    <DropdownMultiSelect
                                        options={categories}
                                        name='categories'
                                        placeholder='Chọn danh mục *'
                                        handleOnChange={handleSelectCategories}
                                    />
                                    <img src={icons.arrowDown} alt='icon-arrow-down' className={cx('dropdown-icon')} />
                                </div>
                            </div>
                            {/* End: Select categories section */}

                            {/* Start: Title section */}
                            <input
                                className={cx('text-box')}
                                placeholder='Tiêu đề *'
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            {/* End: Title section */}

                            {/* Start: Content section */}
                            <textarea
                                className={cx('text-area')}
                                placeholder='Nội dung...'
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            {/* End: Content section */}

                            {/* Start: Upload images section */}
                            <input type='file' id='upload' hidden multiple onChange={handleUploadImages} />
                            <div className='d-flex justify-content-between'>
                                <label htmlFor='upload' className={cx('upload-label')}>
                                    <img
                                        src={icons.galleryAdd}
                                        alt='icon-upload-images'
                                        className={cx('upload-icon')}
                                    />
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
                                        <input
                                            id='private'
                                            type='checkbox'
                                            className='me-2'
                                            onChange={() => setIsPrivate(!isPrivate)}
                                        />
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
                    </form>
                    {/* End: Body */}
                </div>
            </Modal>
        </>
    );
}

export default CreatePost;
