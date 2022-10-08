import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './PostImage.module.scss';

import { useStore } from '../../store';

const cx = classNames.bind(styles);

function PostImage({ images, setShowPostModal }) {
    const [states, dispatch] = useStore();
    const { apiURL } = states;
    const url = `${apiURL}/image/post?id=`;
    switch (images.length) {
        case 0:
            return <></>;
        case 1:
            return (
                <img
                    role='button'
                    src={url + images[0].Path}
                    alt='post-image'
                    className='w-100 rounded-3'
                    onClick={() => setShowPostModal(true)}
                />
            );
        case 2:
            return (
                <Row>
                    <Col xs={7}>
                        <img
                            role='button'
                            src={url + images[0].Path}
                            alt='post-image'
                            className='w-100 rounded-3'
                            onClick={() => setShowPostModal(true)}
                        />
                    </Col>
                    <Col xs={5}>
                        <div className='position-relative h-100 overflow-hidden rounded-3'>
                            <img
                                role='button'
                                src={url + images[1].Path}
                                alt='post-image'
                                className={cx('smaller')}
                                onClick={() => setShowPostModal(true)}
                            />
                        </div>
                    </Col>
                </Row>
            );
        case 3:
            return (
                <Row>
                    <img
                        role='button'
                        src={url + images[0].Path}
                        alt='post-image'
                        className='mb-3 w-100 rounded-3'
                        onClick={() => setShowPostModal(true)}
                    />
                    <Col xs={7}>
                        <img
                            role='button'
                            src={url + images[1].Path}
                            alt='post-image'
                            className='w-100 rounded-3'
                            onClick={() => setShowPostModal(true)}
                        />
                    </Col>
                    <Col xs={5}>
                        <div className='position-relative h-100 overflow-hidden rounded-3'>
                            <img
                                role='button'
                                src={url + images[2].Path}
                                alt='post-image'
                                className={cx('smaller')}
                                onClick={() => setShowPostModal(true)}
                            />
                        </div>
                    </Col>
                </Row>
            );
        case 4:
            return (
                <>
                    <Row className='mb-3'>
                        <Col xs={7}>
                            <img
                                role='button'
                                src={url + images[0].Path}
                                alt='post-image'
                                className='w-100 rounded-3'
                                onClick={() => setShowPostModal(true)}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={url + images[1].Path}
                                    alt='post-image'
                                    className={cx('smaller')}
                                    onClick={() => setShowPostModal(true)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={url + images[2].Path}
                                    alt='post-image'
                                    className={cx('smaller')}
                                    onClick={() => setShowPostModal(true)}
                                />
                            </div>
                        </Col>
                        <Col xs={7}>
                            <img
                                role='button'
                                src={url + images[3].Path}
                                alt='post-image'
                                className='w-100 rounded-3'
                                onClick={() => setShowPostModal(true)}
                            />
                        </Col>
                    </Row>
                </>
            );
        default:
            return (
                <>
                    <Row className='mb-3'>
                        <Col xs={7}>
                            <img
                                role='button'
                                src={url + images[0].Path}
                                alt='post-image'
                                className='w-100 rounded-3'
                                onClick={() => setShowPostModal(true)}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={url + images[1].Path}
                                    alt='post-image'
                                    className={cx('smaller')}
                                    onClick={() => setShowPostModal(true)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={url + images[2].Path}
                                    alt='post-image'
                                    className={cx('smaller')}
                                    onClick={() => setShowPostModal(true)}
                                />
                            </div>
                        </Col>
                        <Col xs={7} className='position-relative'>
                            <img
                                role='button'
                                src={url + images[3].Path}
                                alt='post-image'
                                className='w-100 rounded-3'
                            />
                            <h1 className={cx('remaining')} onClick={() => setShowPostModal(true)}>
                                +{images.length - 4}
                            </h1>
                        </Col>
                    </Row>
                </>
            );
    }
}

export default PostImage;
