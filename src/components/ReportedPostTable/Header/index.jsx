import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={2}>Thông tin bài viết</Col>
                <Col sm={10}>
                    <Row>
                        <Col sm={4}>Nội dung bài viết</Col>
                        <Col sm={4}>Lý do bị báo cáo</Col>
                        <Col sm={2}>Trạng thái</Col>
                        <Col sm={2}>Thao tác</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Header;
