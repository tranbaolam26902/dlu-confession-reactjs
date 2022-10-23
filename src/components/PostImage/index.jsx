import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './PostImage.module.scss';

const cx = classNames.bind(styles);

function PostImage({ images, setShowPostModal }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Variables
    const imageURL = `${apiURL}/image/post?id=`;

    switch (images.length) {
        case 0:
            return <></>;
        case 1:
            return (
                <img
                    role='button'
                    src={imageURL + images[0].Path}
                    alt='post'
                    loading='lazy'
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
                            src={imageURL + images[0].Path}
                            alt='post'
                            loading='lazy'
                            className='w-100 rounded-3'
                            onClick={() => setShowPostModal(true)}
                        />
                    </Col>
                    <Col xs={5}>
                        <div className='position-relative h-100 overflow-hidden rounded-3'>
                            <img
                                role='button'
                                src={imageURL + images[1].Path}
                                alt='post'
                                loading='lazy'
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
                        src={imageURL + images[0].Path}
                        alt='post'
                        loading='lazy'
                        className='mb-3 w-100 rounded-3'
                        onClick={() => setShowPostModal(true)}
                    />
                    <Col xs={7}>
                        <img
                            role='button'
                            src={imageURL + images[1].Path}
                            alt='post'
                            loading='lazy'
                            className='w-100 rounded-3'
                            onClick={() => setShowPostModal(true)}
                        />
                    </Col>
                    <Col xs={5}>
                        <div className='position-relative h-100 overflow-hidden rounded-3'>
                            <img
                                role='button'
                                src={imageURL + images[2].Path}
                                alt='post'
                                loading='lazy'
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
                                src={imageURL + images[0].Path}
                                alt='post'
                                loading='lazy'
                                className='w-100 rounded-3'
                                onClick={() => setShowPostModal(true)}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={imageURL + images[1].Path}
                                    alt='post'
                                    loading='lazy'
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
                                    src={imageURL + images[2].Path}
                                    alt='post'
                                    loading='lazy'
                                    className={cx('smaller')}
                                    onClick={() => setShowPostModal(true)}
                                />
                            </div>
                        </Col>
                        <Col xs={7}>
                            <img
                                role='button'
                                src={imageURL + images[3].Path}
                                alt='post'
                                loading='lazy'
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
                                src={imageURL + images[0].Path}
                                alt='post'
                                loading='lazy'
                                className='w-100 rounded-3'
                                onClick={() => setShowPostModal(true)}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={imageURL + images[1].Path}
                                    alt='post'
                                    loading='lazy'
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
                                    src={imageURL + images[2].Path}
                                    alt='post'
                                    loading='lazy'
                                    className={cx('smaller')}
                                    onClick={() => setShowPostModal(true)}
                                />
                            </div>
                        </Col>
                        <Col xs={7} className='position-relative'>
                            <img
                                role='button'
                                src={imageURL + images[3].Path}
                                alt='post'
                                loading='lazy'
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
