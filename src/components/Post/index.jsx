import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Post.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';

import { useStore, actions } from '../../store';
import CategoryTag from '../CategoryTag';
import Vote from '../Vote';
import PostModal from '../PostModal';
import PostImage from '../PostImage';

const cx = classNames.bind(styles);

function Post({ data }) {
    const [states, dispatch] = useStore();
    const { token } = states;

    const [up, setUp] = useState(false); // Vote icon states
    const [down, setDown] = useState(false); // Vote icon states
    const [showPostModal, setShowPostModal] = useState(false);
    const [scrollToComment, setScrollToComment] = useState(false);
    
    const handleOpenPostModal = () => setShowPostModal(true);
    const handleComment = () => {
        if (token != '') {
            setShowPostModal(true);
            setScrollToComment(true);
        } else dispatch(actions.setShowLoginModal(true));
    };
    
    // For test
    // const imgList = [images.post, images.post, images.post, images.post, images.post, images.post];
    const imgList = data.Pictures;

    
    return (
        <>
            <div id={data.Id} className={cx('wrapper')}>
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
                    <div className='overflow-hidden'>
                        <h3 className='mb-1 fw-bold' role='button' onClick={handleOpenPostModal}>
                            {data.Title}
                        </h3>
                        <div className={cx('content')} onClick={handleOpenPostModal}>
                            {data.Description}
                        </div>
                        <PostImage images={imgList} setShowPostModal={setShowPostModal} />
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <Vote voted={{ up, down }} action={{ setUp, setDown }}>
                            {up ? data.Like + 1 : data.Like}
                        </Vote>
                        <button onClick={handleComment}>
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
            <PostModal
                showPostModal={showPostModal}
                setShowPostModal={setShowPostModal}
                scrollToComment={scrollToComment}
                setScrollToComment={setScrollToComment}
                data={data}
            />
        </>
    );
}

export default Post;
