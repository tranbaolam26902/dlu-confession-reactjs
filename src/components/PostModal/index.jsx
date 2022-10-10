import { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './PostModal.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import CategoryTag from '../CategoryTag';
import Vote from '../Vote';
import { useStore } from '../../store';

const cx = classNames.bind(styles);

function PostModal({ showPostModal, setShowPostModal, scrollToComment, setScrollToComment, data }) {
    const [states, dispatch] = useStore();
    const [up, setUp] = useState(false); // Vote icon states
    const [down, setDown] = useState(false); // Vote icon states
    const commentRef = useRef();
    const { apiURL } = states;
    const imgURL = `${apiURL}/image/post?id=`;

    const handleScroll = () => {
        if (scrollToComment) commentRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const handleClose = () => {
        setShowPostModal(false);
        setScrollToComment(false);
    };

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    return (
        <Modal show={showPostModal} size='lg' onHide={handleClose} centered onEntering={handleScroll}>
            <div id={data.Id} className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Bài viết của {data.NickName}</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='mb-3' />
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        <img src={images.avatar} alt='avatar' />
                        <div className='mx-3 w-100'>
                            <h4 className='fw-bold'>{data.NickName}</h4>
                            <h5>{day + ' tháng ' + month}</h5>
                        </div>
                        <button>
                            <img src={icons.verticalOption} alt='icon-option' />
                        </button>
                    </div>
                    <div className='mb-2'>
                        {data.Categories.map((category) => {
                            return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                        })}
                    </div>
                    <div>
                        <h3 className='mb-1 fw-bold'>{data.Title}</h3>
                        <div className={cx('content')}>{data.Content}</div>
                        {data.Pictures.map((picture) => {
                            return (
                                <img
                                    src={imgURL + picture.Path}
                                    alt='post-image'
                                    key={picture.Id}
                                    className={cx('images')}
                                />
                            );
                        })}
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <Vote voted={{ up, down }} action={{ setUp, setDown }}>
                            {up ? data.Like + 1 : data.Like}
                        </Vote>
                        <button>
                            <img src={icons.share} alt='icon-share' />
                            <span className='ms-2'>Share</span>
                        </button>
                    </div>
                    <div ref={commentRef}></div>
                </div>
            </div>
        </Modal>
    );
}

export default PostModal;
