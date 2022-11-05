import classNames from 'classnames/bind';
import { Col, Row, Stack } from 'react-bootstrap';

import { useStore } from '../../../store';
import styles from './ReportedPost.module.scss';
import images from '../../../assets/img';

import Avatar from '../../Avatar';
import CategoryTag from '../../CategoryTag';
import { ButtonToProfile } from '../../Buttons';

const cx = classNames.bind(styles);

function ReportedPost() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;
    const data = {
        PrivateMode: true,
    };
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={2}>
                    <div className='d-flex mt-1 mb-2'>
                        {data.PrivateMode && <Avatar avatar={images.avatar} />}
                        {!data.PrivateMode && <Avatar avatar={`${avatarURL}${data.Avatar}`} />}
                        <div className='ms-2'>
                            {data.PrivateMode && <h5 className='fw-bold'>Ẩn danh</h5>}
                            {!data.PrivateMode && (
                                <h5 className='fw-bold'>
                                    <ButtonToProfile>hello</ButtonToProfile>
                                </h5>
                            )}
                            <h6>1 tháng 11</h6>
                        </div>
                    </div>
                    <div>
                        <CategoryTag>Hello</CategoryTag>
                        <CategoryTag>I'll be there</CategoryTag>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className='fw-bold'>Title goes here</div>
                    <div className={cx('content')}>
                        {'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore aperiam accusantium aliquid quisquam earum obcaecati temporibus, nesciunt sed cumque provident fugiat dolorum, doloremque sunt qui, nam deleniti perspiciatis neque. Modi cupiditate perferendis quia. Tenetur facilis quod quo exercitationem, ullam dignissimos nam esse dicta incidunt tempora eaque fugit, modi, similique beatae!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore aperiam accusantium aliquid quisquam earum obcaecati temporibus, nesciunt sed cumque provident fugiat dolorum, doloremque sunt qui, nam deleniti perspiciatis neque. Modi cupiditate perferendis quia. Tenetur facilis quod quo exercitationem, ullam dignissimos nam esse dicta incidunt tempora eaque fugit, modi, similique beatae!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore aperiam accusantium aliquid quisquam earum obcaecati temporibus, nesciunt sed cumque provident fugiat dolorum, doloremque sunt qui, nam deleniti perspiciatis neque. Modi cupiditate perferendis quia. Tenetur facilis quod quo exercitationem, ullam dignissimos nam esse dicta incidunt tempora eaque fugit, modi, similique beatae!'.replace(
                            /\n+/g,
                            '\n',
                        )}
                    </div>
                </Col>
                <Col sm={3}>
                    <div>- Nội dung không phù hợp: 5 lần</div>
                    <div>- Sử dụng hình ảnh cá nhân của tôi: 1 lần</div>
                </Col>
                <Col sm={1}>
                    <Stack gap={1} className='d-flex flex-column'>
                        <button className='text-start text-decoration-underline'>Xóa</button>
                        <button className='text-start text-decoration-underline'>Bỏ qua</button>
                        <button className='text-start text-decoration-underline'>Xem chi tiết</button>
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}

export default ReportedPost;
