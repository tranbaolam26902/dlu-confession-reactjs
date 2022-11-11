import classNames from 'classnames/bind';
import { Col, Row, Stack } from 'react-bootstrap';

import { useStore, actions } from '../../../store';
import styles from './ReportedPost.module.scss';

import Avatar from '../../Avatar';
import CategoryTag from '../../CategoryTag';
import { ButtonToProfile } from '../../Buttons';
import icons from '../../../assets/icons';

const cx = classNames.bind(styles);

function ReportedPost({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    // Variables
    const reasons = [...new Set(data.PostReports.map((postReport) => postReport.Description))];

    // Convert created time
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Functions
    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };
    const countReason = (reason) => {
        let count = 0;
        data.PostReports.map((report) => {
            if (report.Description === reason) count++;
            return null;
        });
        return count;
    };

    // Event handlers
    const handleDelete = () => {
        if (window.confirm('Xác nhận xóa bài viết?')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/admpost/delete`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            }).then(() => {
                updatePosts();
            });
        }
    };
    const handleIgnore = () => {
        if (window.confirm('Xác nhận bỏ qua bài viết này?')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/admpost/IgnorePost`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            }).then(() => {
                updatePosts();
            });
        }
    };
    const handleViewDetail = () => {
        dispatch(actions.setPostData(data));
        dispatch(actions.setShowPostModal(true));
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={2}>
                    <div className='d-flex mt-1 mb-2'>
                        <ButtonToProfile id={data.PostHistories[0].AccountId}>
                            <Avatar avatar={`${avatarURL}${data.Avatar}`} />
                        </ButtonToProfile>
                        <div className='ms-2'>
                            <h5 className='fw-bold'>
                                <ButtonToProfile id={data.PostHistories[0].AccountId}>{data.NickName}</ButtonToProfile>
                            </h5>
                            <h6>{day + ' tháng ' + month}</h6>
                        </div>
                    </div>
                    <div>
                        {data.Categories.map((category) => {
                            return (
                                <CategoryTag id={category.Id} key={category.Id}>
                                    {category.Name}
                                </CategoryTag>
                            );
                        })}
                    </div>
                </Col>
                <Col sm={10}>
                    <Row>
                        <Col sm={4} onClick={handleViewDetail} role='button'>
                            <div className='fw-bold'>{data.Title}</div>
                            <div className={cx('content')}>{data.Content}</div>
                        </Col>
                        <Col sm={4}>
                            <div className='fw-bold'>Tổng số báo cáo: {data.Report}</div>
                            {reasons.map((reason, index) => (
                                <div key={index}>
                                    - {reason}: {countReason(reason)}
                                </div>
                            ))}
                        </Col>
                        <Col sm={2}>
                            {data.Active ? (
                                <div>
                                    <img src={icons.infoCircle} className={cx('warning')} alt='icon-status' />
                                    <span className='ms-1'>Xem xét</span>
                                </div>
                            ) : (
                                <div>
                                    <img src={icons.closeCircle} className={cx('danger')} alt='icon-status' />
                                    <span className='ms-1'>Tạm ẩn</span>
                                </div>
                            )}
                        </Col>
                        <Col sm={2}>
                            <Stack gap={2} direction='vertical'>
                                <button className='text-start' onClick={handleDelete}>
                                    <img src={icons.trash} className='me-1' alt='icon-trash' />
                                    <span className={cx('delete')}>Xóa bài viết</span>
                                </button>
                                <button className='text-start' onClick={handleIgnore}>
                                    <img src={icons.tick} className='me-1' alt='icon-trash' />
                                    <span className={cx('ignore')}>Bỏ qua</span>
                                </button>
                                <button className='text-start' onClick={handleViewDetail}>
                                    <img src={icons.eye} className='me-1' alt='icon-trash' />
                                    <span>Xem chi tiết</span>
                                </button>
                            </Stack>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ReportedPost;
