import classNames from 'classnames/bind';
import Header from '../components/Header';
import Category from '../components/Category';
import styles from './DefaultLayout.module.scss';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import useViewPort from '../../../hooks';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const stickyTop = { top: 'calc(var(--header-height) + 32px)' };
    const viewPort = useViewPort();
    const isMobile = viewPort.width < 992;
    return (
        <>
            <Header></Header>
            <Container fluid='md'>
                <Row className='position-relative gx-lg-4 mt-lg-4 mt-3'>
                    {!isMobile && (
                        <Col lg={3}>
                            <div className='sticky-top' style={stickyTop}>
                                <Category />
                            </div>
                        </Col>
                    )}
                    <Col lg={6} className='mx-auto'>
                        {children}
                    </Col>
                    {!isMobile && (
                        <Col lg={3}>
                            <div className='sticky-top' style={stickyTop}>
                                {/* <Category /> */}
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
            {/* <div className={cx('inner')}>
                <div className={cx('row')}>
                    <div className={cx('col-3')}>
                        <Category></Category>
                    </div>
                    <div className={cx('col-6')}>{children}</div>
                    <div className={cx('col-3')}>
                        <Category></Category>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default DefaultLayout;
