import { Stack, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../../../store';
import styles from './PopularPost.module.scss';
import images from '../../../../../assets/img';

import CategoryTag from '../../../../CategoryTag';
import Avatar from '../../../../Avatar';
import { ButtonToProfile } from '../../../../Buttons';

const cx = classNames.bind(styles);

function PopularPost({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Event handlers
    const handleOpenPostModal = () => {
        dispatch(actions.setPostData(data));
        dispatch(actions.setShowPostModal(true));
    };

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    return (
        <>
            <Stack gap={2} className={cx('wrapper')}>
                <Row className='gx-0'>
                    <Col xs={2}>
                        {data.PrivateMode ? <Avatar avatar={images.avatar} /> : null}
                        {!data.PrivateMode ? (
                            <ButtonToProfile id={data.PostHistories[0].AccountId}>
                                <Avatar avatar={`${avatarURL}${data.Avatar}`} />
                            </ButtonToProfile>
                        ) : null}
                    </Col>
                    <Col xs={10}>
                        <div className='ms-2'>
                            {data.PrivateMode ? <h5 className='fw-bold'>Ẩn danh</h5> : null}
                            {!data.PrivateMode ? (
                                <h5 className='fw-bold'>
                                    <ButtonToProfile id={data.PostHistories[0].AccountId}>
                                        {data.NickName}
                                    </ButtonToProfile>
                                </h5>
                            ) : null}
                            <h6>{day + ' tháng ' + month}</h6>
                        </div>
                    </Col>
                </Row>
                {data.Categories.length !== 0 ? (
                    <div className={cx('categories')}>
                        {data.Categories.map((category) => {
                            return (
                                <CategoryTag id={category.Id} key={category.Id}>
                                    {category.Name}
                                </CategoryTag>
                            );
                        })}
                    </div>
                ) : null}
                <div className={cx('body')} onClick={handleOpenPostModal}>
                    <h5 className={cx('title')}>{data.Title}</h5>
                </div>
                <h6>
                    <i>
                        {data.TotalCmt} bình luận / {data.Like} Lượt thích
                    </i>
                </h6>
            </Stack>
        </>
    );
}

export default PopularPost;
