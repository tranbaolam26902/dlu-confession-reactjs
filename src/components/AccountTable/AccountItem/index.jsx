import classNames from 'classnames/bind';
import { Col, Row, Stack } from 'react-bootstrap';

import { useStore } from '../../../store';
import styles from './AccountItem.module.scss';
import icons from '../../../assets/icons';
import images from '../../../assets/img';

import Avatar from '../../Avatar';

const cx = classNames.bind(styles);

function AccountItem() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={1}>
                    <div className='d-flex'>
                        <Avatar avatar={images.avatar} alt='avatar' />
                    </div>
                </Col>
                <Col sm={3}>User 01</Col>
                <Col sm={2}>20 tháng 11, 2022</Col>
                <Col sm={3}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum qui neque explicabo cum quasi
                    quae, sapiente saepe aperiam! Dolores, facere.
                </Col>
                <Col sm={3}>
                    <Row>
                        <Col sm={6}>Quản trị viên</Col>
                        <Col sm={6}>
                            <Stack gap={2} direction='vertical'>
                                <button className='text-start' onClick={() => {}}>
                                    <img src={icons.trash} className='me-1' alt='icon-trash' />
                                    <span className={cx('delete')}>Xóa tài khoản</span>
                                </button>
                                <button className='text-start' onClick={() => {}}>
                                    <img src={icons.edit} className='me-1' alt='icon-edit' />
                                    <span>Chỉnh sửa</span>
                                </button>
                            </Stack>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AccountItem;
