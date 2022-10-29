import { useRef } from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './PostModal.module.scss';
import icons from '../../../assets/icons';

import CategoryTag from '../../CategoryTag';
import Avatar from '../../Avatar';
import PostOptions from '../PostOptions';
import CommentSection from '../../Comments/CommentSection';

const cx = classNames.bind(styles);

function PostModal() {
    // Global states
    const [states, dispatch] = useStore();
    const { postData, avatarURL, imageURL, showPostModal, scrollToComment } = states;

    // Variables
    const commentRef = useRef();

    // Convert created time
    const date = postData.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Event handlers
    const handleScroll = () => {
        if (scrollToComment) commentRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const handleClose = () => {
        dispatch(actions.setShowPostModal(false));
        dispatch(actions.setScrollToComment(false));
    };

    return (
        <Modal show={showPostModal} size='lg' onHide={handleClose} centered onEntering={handleScroll}>
            <div id={postData.Id} className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Bài viết của {postData.NickName}</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='mb-3' />
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        <Avatar avatar={`${avatarURL}${postData.Avatar}`} />
                        <div className='mx-3 w-100'>
                            <h4 className='fw-bold'>{postData.NickName}</h4>
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <PostOptions data={postData} />
                    </div>
                    <div className='mb-2'>
                        {postData.Categories.map((category) => {
                            return (
                                <CategoryTag
                                    key={category.Id}
                                    onClick={() => {
                                        dispatch(actions.setFilter(category.Id));
                                        dispatch(actions.setShowPostModal(false));
                                    }}
                                >
                                    {category.Name}
                                </CategoryTag>
                            );
                        })}
                    </div>
                    <div>
                        <h3 className='mb-1 fw-bold'>{postData.Title}</h3>
                        <div className={cx('content')}>{postData.Content.replace(/\n+/g, '\n')}</div>
                        {postData.Pictures.map((picture) => {
                            return (
                                <img
                                    src={imageURL + picture.Path}
                                    className={cx('images')}
                                    alt='post'
                                    key={picture.Id}
                                />
                            );
                        })}
                    </div>
                    <div ref={commentRef}>
                        <CommentSection />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PostModal;
