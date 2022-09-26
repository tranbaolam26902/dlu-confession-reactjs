import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './PostModal.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import CategoryTag from '../CategoryTag';
import Vote from '../Vote';
import { Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

function PostModal({ showPostModal, setShowPostModal, data }) {
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);
    const handleClose = () => setShowPostModal(false);
    return (
        <Modal show={showPostModal} size='lg' onHide={handleClose} centered>
            <div id={data.Id} className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Bài viết của {data.Name}</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='mb-3' />
                <div className='d-flex flex-column'>
                    <div className='d-flex mb-3'>
                        <img src={images.avatar} alt='avatar' />
                        <div className='mx-3 w-100'>
                            <h4 className='fw-bold'>Name</h4>
                            <h5>{data.CreatedTime}</h5>
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
                        <div className={cx('content')}>{data.Description}</div>
                        <img src={images.post} alt='post-img' className='w-100 rounded-3' />
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <Vote voted={{ up, down }} action={{ setUp, setDown }}>
                            {up ? data.Like + 1 : data.Like}
                        </Vote>
                        <button>
                            <img src={icons.comment} alt='icon-comment' />
                            <span className='ms-2'>Comments</span>
                        </button>
                        <button>
                            <img src={icons.share} alt='icon-share' />
                            <span className='ms-2'>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PostModal;
