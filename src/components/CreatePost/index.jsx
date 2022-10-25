import { useState, useEffect } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import DropdownMultiSelect from 'react-multiselect-dropdown-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './CreatePost.module.scss';
import icons from '../../assets/icons';

import Button from '../Button';

const cx = classNames.bind(styles);

function CreatePost() {
    // Global states
    const [states, dispatch] = useStore();
    const { showCreatePostModal, apiURL } = states;

    // States for create post
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]); // Categories for dropdown input
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isPrivatePost, setIsPrivatePost] = useState(false);
    const [postCategories, setPostCategories] = useState([]); // POST to API
    const [uploadImages, setUploadImages] = useState([]); // Preview Images
    const [postImages, setPostImages] = useState([]); // POST to API

    // Get and set categories for dropdown categories menu
    useEffect(() => {
        let mounted = true;

        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((data) => {
                const selectedCategories = [];
                data.map((category) => {
                    selectedCategories.push({ key: category.Id, label: category.Name });
                });
                if (mounted) setCategories(selectedCategories);
            });

        return () => (mounted = false);
    }, [categories]);

    const handleSelectCategories = (selected) => setPostCategories(selected);

    // Upload images and preview
    const handleUploadImages = (e) => {
        const currentUploadImages = [];
        const targetFiles = e.target.files;
        const targetFilesArray = [...postImages, ...targetFiles];
        targetFilesArray.map((file) => {
            currentUploadImages.push(URL.createObjectURL(file));
            console.log(URL.createObjectURL(file));
        });
        setUploadImages(currentUploadImages);
        setPostImages(targetFilesArray);
    };

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

        const formData = new FormData();
        const postData = {
            Title: postTitle,
            Content: postContent,
            SelectedCategories: postCategories,
            PrivateMode: isPrivatePost,
        };
        formData.append('Post', JSON.stringify(postData));
        postImages.map((image) => {
            formData.append('File', image);
        });
        fetch(`${apiURL}/api/userpost/create`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
            body: formData,
        }).then((res) => {
            handleClose();
        });
    };

    const handleRemoveUploadImages = () => {
        setPostImages([]);
        setUploadImages([]);
    };

    const handleClose = () => {
        setErrorMessage('');
        setPostCategories([]);
        setPostTitle('');
        setPostContent('');
        setUploadImages([]);
        setPostImages([]);
        setIsPrivatePost(false);
        dispatch(actions.setShowCreatePostModal(false));
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
                                    <button onClick={handleRemoveUploadImages}>
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
                                        {uploadImages.length - 6 && (
                                            <h2 className={cx('upload-images-remaining')}>
                                                +{uploadImages.length - 6}
                                            </h2>
                                        )}
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
                                            onChange={() => setIsPrivatePost(!isPrivatePost)}
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
