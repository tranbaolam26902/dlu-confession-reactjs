import { useState } from 'react';
import classNames from 'classnames/bind';
import { Stack, Row, Col } from 'react-bootstrap';

import styles from './PopularPost.module.scss';
import images from '../../assets/img';
import CategoryTag from '../CategoryTag';
import Vote from '../Vote';
import PostModal from '../PostModal';

const cx = classNames.bind(styles);

function PopularPost({ data }) {
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    return (
        <>
            <Stack gap={2} className={cx('wrapper')}>
                <Row className='gx-0'>
                    <Col xs={2}>
                        <img src={images.avatar} alt='avatar' className='w-100' />
                    </Col>
                    <Col xs={10}>
                        <div className='ms-2'>
                            <h5 className='fw-bold'>Tên dài ơi là dài thì nó sẽ như này</h5>
                            <h6>{data.CreatedTime}</h6>
                        </div>
                    </Col>
                </Row>
                {data.Categories.length != 0 && (
                    <div className={cx('categories')}>
                        {data.Categories.map((category) => {
                            return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                        })}
                    </div>
                )}
                <div className={cx('body')} onClick={() => setShowPostModal(true)}>
                    <h5 className={cx('title')}>{data.Title}</h5>
                </div>
                <div className={cx('footer')}>
                    <Vote voted={{ up, down }} action={{ setUp, setDown }}>
                        {up ? data.Like + 1 : data.Like}
                    </Vote>
                </div>
            </Stack>
            <PostModal
                showPostModal={showPostModal}
                setShowPostModal={setShowPostModal}
                data={data}
            />
        </>
    );
}

export default PopularPost;
