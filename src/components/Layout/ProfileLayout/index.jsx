import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './ProfileLayout.module.scss';

import Header from '../components/Header';
import { ButtonScrollToTop } from '../../Buttons';
import UserInformation from '../../UserInformation';

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
    // Variables
    const stickyTop = { top: 'calc(var(--header-height) + 32px)' };

    return (
        <>
            <Header />
            <Container fluid='md'>
                <Row className='position-relative gx-lg-4 mt-lg-4 mt-3'>
                    <Col lg={8} className='mx-auto'>
                        {children}
                    </Col>
                    <Col lg={4} className={cx('reset-z-index')}>
                        <div className='sticky-top' style={stickyTop}>
                            <UserInformation />
                            <ButtonScrollToTop />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProfileLayout;
