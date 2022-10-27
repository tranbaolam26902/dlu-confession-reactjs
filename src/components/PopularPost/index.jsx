import { Stack, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './PopularPost.module.scss';

import CategoryTag from '../CategoryTag';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function PopularPost({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    const handleOpenPostModal = () => {
        dispatch(actions.setPostData(data));
        dispatch(actions.setShowPostModal(true));
    };

    return (
        <>
            <Stack gap={2} className={cx('wrapper')}>
                <Row className='gx-0'>
                    <Col xs={2}>
                        <Avatar avatar={`${avatarURL}${data.Avatar}`} />
                    </Col>
                    <Col xs={10}>
                        <div className='ms-2'>
                            <h5 className='fw-bold'>{data.NickName}</h5>
                            <h6>{day + ' tháng ' + month}</h6>
                        </div>
                    </Col>
                </Row>
                {data.Categories.length != 0 && (
                    <div className={cx('categories')}>
                        {data.Categories.map((category) => {
                            return (
                                <CategoryTag key={category.Id} onClick={() => dispatch(actions.setFilter(category.Id))}>
                                    {category.Name}
                                </CategoryTag>
                            );
                        })}
                    </div>
                )}
                <div className={cx('body')} onClick={handleOpenPostModal}>
                    <h5 className={cx('title')}>{data.Title}</h5>
                </div>
                <div className={cx('footer')}>
                    <span className='me-1'>{data.Like}</span>
                    <span>lượt bình chọn</span>
                    <span className={cx('mx-1')}>/</span>
                    <span className='me-1'>{data.TotalCmt}</span>
                    <span>bình luận</span>
                </div>
            </Stack>
        </>
    );
}

export default PopularPost;
