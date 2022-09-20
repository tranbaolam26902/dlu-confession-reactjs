import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useViewPort } from '../../../../store';
import styles from './Header.module.scss';
import images from '../../../../assets/img';
import Search from '../../../Search';
import UserActions from '../../../UserActions';

const cx = classNames.bind(styles);

function Header() {
    const viewPort = useViewPort();
    const isMobile = viewPort.width <= 992;
    return (
        <div className={cx('wrapper')}>
            <Container fluid='md'>
                <Row className={cx('inner')}>
                    <Col>
                        <Link to='/'>
                            <img src={images.logoFull} alt='logo' />
                        </Link>
                    </Col>
                    {!isMobile && (
                        <Col>
                            <Search placeholder='Tìm kiếm...' />
                        </Col>
                    )}
                    <Col className='text-end'>
                        <UserActions />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;