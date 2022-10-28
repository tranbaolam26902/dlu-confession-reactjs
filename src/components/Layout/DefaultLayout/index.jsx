import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, useViewPort } from '../../../store';
import styles from './DefaultLayout.module.scss';

import Header from '../components/Header';
import Category from '../components/Category';
import Popular from '../components/Popular';
import Login from '../../Login';
import CreatePost from '../../CreatePost';
import { PostModal } from '../../PostComponents';
import { ButtonScrollToTop } from '../../Buttons';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { postData } = states;
    const viewPort = useViewPort();

    // Variables
    const stickyTop = { top: 'calc(var(--header-height) + 32px)' };
    const isMobile = viewPort.width < 992;

    return (
        <>
            <Header></Header>
            <Container fluid='md'>
                <Row className='position-relative gx-lg-4 mt-lg-4 mt-3'>
                    {!isMobile && (
                        <Col lg={3} className={cx('reset-z-index')}>
                            <div className='sticky-top' style={stickyTop}>
                                <Category />
                            </div>
                        </Col>
                    )}
                    <Col lg={6} className='mx-auto'>
                        {children}
                    </Col>
                    {!isMobile && (
                        <Col lg={3} className={cx('reset-z-index')}>
                            <div className='sticky-top' style={stickyTop}>
                                <Popular />
                                <ButtonScrollToTop />
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
            <Login />
            <CreatePost />
            {postData.Id && <PostModal />}
        </>
    );
}

export default DefaultLayout;
