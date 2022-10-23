import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, useViewPort, actions } from '../../../store';
import styles from './DefaultLayout.module.scss';

import Header from '../components/Header';
import Category from '../components/Category';
import Popular from '../components/Popular';
import PopularPost from '../../PopularPost';
import Login from '../../Login';
import CreatePost from '../../CreatePost';
import ButtonScrollToTop from '../../ButtonScrollToTop';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;

    // Component's states
    const stickyTop = { top: 'calc(var(--header-height) + 32px)' };
    const viewPort = useViewPort();
    const isMobile = viewPort.width < 992;

    useEffect(() => {
        let mounted = true;

        fetch(`${apiURL}/api/post/index`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) dispatch(actions.setPosts(data));
            });

        return () => (mounted = false);
    }, [posts]);

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
                                <Popular>
                                    {posts.map((post) => {
                                        return <PopularPost key={post.Id} data={post} />;
                                    })}
                                </Popular>
                                <ButtonScrollToTop />
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
            <Login />
            <CreatePost />
        </>
    );
}

export default DefaultLayout;
