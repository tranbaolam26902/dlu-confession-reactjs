import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={1}>Ảnh</Col>
                <Col sm={2}>Tên tài khoản</Col>
                <Col sm={3}>Thông tin chi tiết</Col>
                <Col sm={2}>Ngày tham gia</Col>
                <Col sm={2}>Loại tài khoản</Col>
                <Col sm={2}>Thao tác</Col>
            </Row>
        </div>
    );
}

export default Header;
