import { useState, useEffect } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import DropdownMultiSelect from 'react-multiselect-dropdown-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './CreatePost.module.scss';
import icons from '../../assets/icons';

import { Button } from '../Buttons';

const cx = classNames.bind(styles);

function CreatePost() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, imageURL, editPostData, showCreatePostModal } = states;

    // Component's states
    const [isEditing, setIsEditing] = useState(false); // For edit post
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]); // Categories for dropdown input
    const [postCategories, setPostCategories] = useState([]); // POST to API
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isPrivatePost, setIsPrivatePost] = useState(false);
    const [uploadImages, setUploadImages] = useState([]); // Preview Images
    const [postImages, setPostImages] = useState([]); // POST to API

    // Functions
    const getCategories = () => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((responseCategories) => {
                const tempCategories = [];
                responseCategories.map((category) => {
                    tempCategories.push({ key: category.Id, label: category.Name });
                    return null;
                });
                setCategories(tempCategories);
            });
    };
    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };
    const setDataForEditPost = () => {
        if (editPostData.Id) {
            setIsEditing(true);
            setPostCategories(editPostData.Categories.map((category) => category.Id));
            setPostTitle(editPostData.Title);
            if (editPostData.Content) setPostContent(editPostData.Content);
            else setPostContent('');
            setUploadImages(editPostData.Pictures.map((picture) => `${imageURL}${picture.Path}`));
            setIsPrivatePost(editPostData.PrivateMode);
        }
    };
    const clearData = () => {
        setPostCategories([]);
        setPostTitle('');
        setPostContent('');
        setUploadImages([]);
        setPostImages([]);
        setIsPrivatePost(false);
        setIsEditing(false);
    };
    const validatePostData = () => {
        if (postCategories.length === 0 && !isEditing) {
            setErrorMessage('Chọn ít nhất 01 danh mục');
            return false;
        }
        if (postTitle === '') {
            setErrorMessage('Nhập tiêu đề cho bài viết');
            return false;
        }
        return true;
    };
    const getPostData = () => {
        const formData = new FormData();
        const postData = {
            Title: postTitle,
            Content: postContent,
            SelectedCategories: postCategories,
            PrivateMode: isPrivatePost,
        };

        if (isEditing) postData.Id = editPostData.Id;
        if (postImages.length !== 0)
            postImages.map((image) => {
                formData.append('File', image);
                return null;
            });
        formData.append('Post', JSON.stringify(postData));

        return formData;
    };
    const editPost = (formData) => {
        fetch(`${apiURL}/api/userpost/edit`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
            body: formData,
        }).then(() => {
            clearData();
            handleClose();
            updatePosts();
        });
    };
    const createPost = (formData) => {
        fetch(`${apiURL}/api/userpost/create`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
            body: formData,
        }).then(() => {
            clearData();
            handleClose();
            updatePosts();
        });
    };

    // Event handlers
    const handleSelectCategories = (selected) => {
        setPostCategories(selected);
    };
    // Upload images and preview
    const handleUploadImages = (e) => {
        const currentUploadImages = [];
        const targetFiles = e.target.files;
        const targetFilesArray = [...postImages, ...targetFiles];
        targetFilesArray.map((file) => {
            currentUploadImages.push(URL.createObjectURL(file));
            return null;
        });
        setUploadImages(currentUploadImages);
        setPostImages(targetFilesArray);
    };
    const handlePost = (e) => {
        e.preventDefault();
        if (!validatePostData()) return;
        const postData = getPostData();
        if (isEditing) editPost(postData);
        else createPost(postData);
    };
    const handleRemoveUploadImages = () => {
        setPostImages([]);
        setUploadImages([]);
    };
    const handleClose = () => {
        if (isEditing) clearData();
        setErrorMessage('');
        dispatch(actions.setEditPostData({}));
        dispatch(actions.setShowCreatePostModal(false));
    };

    useEffect(() => {
        getCategories();
        setDataForEditPost();
        // eslint-disable-next-line
    }, [editPostData]);

    return (
        <>
            <Modal size='lg' show={showCreatePostModal} onHide={handleClose} centered>
                <div className={cx('wrapper')}>
                    {/* Start: Header */}
                    <div className={cx('header')}>
                        {!isEditing ? <h3 className={cx('title')}>Tạo bài viết</h3> : null}
                        {isEditing ? <h3 className={cx('title')}>Chỉnh sửa bài viết</h3> : null}
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
                            {!isEditing ? (
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='me-2'>Danh mục:</div>
                                    <div className={cx('select-categories')}>
                                        <DropdownMultiSelect
                                            name='categories'
                                            options={categories}
                                            placeholder='Chọn danh mục *'
                                            handleOnChange={handleSelectCategories}
                                        />
                                        <img
                                            src={icons.arrowDown}
                                            alt='icon-arrow-down'
                                            className={cx('dropdown-icon')}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {/* End: Select categories section */}

                            {/* Start: Title section */}
                            <input
                                className={cx('text-box')}
                                value={postTitle}
                                placeholder='Tiêu đề *'
                                onChange={(e) => setPostTitle(e.target.value)}
                                onKeyPress={(e) => {
                                    e.key === 'Enter' && e.preventDefault();
                                }}
                            />
                            {/* End: Title section */}

                            {/* Start: Content section */}
                            <textarea
                                className={cx('text-area')}
                                placeholder='Nội dung...'
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            {/* End: Content section */}

                            {/* Start: Upload images section */}
                            <input type='file' id='upload' hidden multiple onChange={handleUploadImages} />
                            <div className='d-flex justify-content-between'>
                                <label htmlFor='upload' className={cx('upload-label')}>
                                    <img src={icons.galleryAdd} alt='icon-upload' className='me-2' />
                                    <span>Thêm hình ảnh</span>
                                </label>
                                {uploadImages.length !== 0 ? (
                                    <button onClick={handleRemoveUploadImages}>
                                        <u>Xóa tất cả</u>
                                    </button>
                                ) : null}
                            </div>
                            <div className='d-flex'>
                                {uploadImages.map((image, index) => {
                                    if (index < 5)
                                        return (
                                            <div key={index} className={cx('image-preview-wrapper')}>
                                                <img src={image} alt='post' className={cx('image-preview')} />
                                            </div>
                                        );
                                    return <></>;
                                })}
                                {uploadImages.length >= 6 ? (
                                    <div className={cx('image-preview-wrapper')}>
                                        <img src={uploadImages[5]} alt='post' className={cx('image-preview')} />
                                        {uploadImages.length - 6 ? (
                                            <h2 className={cx('upload-images-remaining')}>
                                                +{uploadImages.length - 6}
                                            </h2>
                                        ) : null}
                                    </div>
                                ) : null}
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
                                            checked={isPrivatePost}
                                            onChange={() => setIsPrivatePost(!isPrivatePost)}
                                        />
                                        <h5>
                                            <label htmlFor='private' className={cx('private')}>
                                                Đăng ở chế độ ẩn danh
                                            </label>
                                        </h5>
                                    </div>
                                    <h6>(Những người khác sẽ không biết bạn là người đăng bài)</h6>
                                </div>
                                <div>
                                    <Button text onClick={handleClose}>
                                        Hủy
                                    </Button>
                                    {!isEditing ? <Button secondary>Đăng</Button> : null}
                                    {isEditing ? <Button secondary>Sửa</Button> : null}
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
