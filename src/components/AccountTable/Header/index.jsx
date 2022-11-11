import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={1}>Ảnh</Col>
                <Col sm={3}>Tên</Col>
                <Col sm={2}>Ngày tham gia</Col>
                <Col sm={3}>Giới thiệu</Col>
                <Col sm={3}>
                    <Row>
                        <Col sm={6}>Quyền</Col>
                        <Col sm={6}>Thao tác</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Header;
