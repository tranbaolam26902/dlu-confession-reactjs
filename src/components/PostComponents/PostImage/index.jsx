import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore } from '../../../store';
import styles from './PostImage.module.scss';

const cx = classNames.bind(styles);

function PostImage({ images, onClick }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { imageURL } = states;

    const isVertical = (source) => {
        const img = new Image();
        img.src = `${imageURL}${source}`;
        if (img.height > img.width) return true;
        return false;
    };

    switch (images.length) {
        case 0:
            return <></>;
        case 1:
            return (
                <div>
                    <img
                        role='button'
                        src={imageURL + images[0].Path}
                        alt='post'
                        loading='lazy'
                        className={cx('normal')}
                        onClick={onClick}
                    />
                </div>
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
                            className={cx('normal')}
                            onClick={onClick}
                        />
                    </Col>
                    <Col xs={5}>
                        <div className='position-relative h-100 overflow-hidden rounded-3'>
                            <img
                                role='button'
                                src={imageURL + images[1].Path}
                                alt='post'
                                loading='lazy'
                                className={cx('smaller', { isVertical: isVertical(images[1].Path) })}
                                onClick={onClick}
                            />
                        </div>
                    </Col>
                </Row>
            );
        case 3:
            return (
                <>
                    <Row className='mb-3'>
                        <Col cx={12}>
                            <img
                                role='button'
                                src={imageURL + images[0].Path}
                                alt='post'
                                loading='lazy'
                                className={cx('normal')}
                                onClick={onClick}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <img
                                role='button'
                                src={imageURL + images[1].Path}
                                alt='post'
                                loading='lazy'
                                className={cx('normal')}
                                onClick={onClick}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={imageURL + images[2].Path}
                                    alt='post'
                                    loading='lazy'
                                    className={cx('smaller', { isVertical: isVertical(images[2].Path) })}
                                    onClick={onClick}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
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
                                className={cx('normal')}
                                onClick={onClick}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={imageURL + images[1].Path}
                                    alt='post'
                                    loading='lazy'
                                    className={cx('smaller', { isVertical: isVertical(images[1].Path) })}
                                    onClick={onClick}
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
                                    className={cx('smaller', { isVertical: isVertical(images[2].Path) })}
                                    onClick={onClick}
                                />
                            </div>
                        </Col>
                        <Col xs={7}>
                            <img
                                role='button'
                                src={imageURL + images[3].Path}
                                alt='post'
                                loading='lazy'
                                className={cx('normal')}
                                onClick={onClick}
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
                                onClick={onClick}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className='position-relative h-100 overflow-hidden rounded-3'>
                                <img
                                    role='button'
                                    src={imageURL + images[1].Path}
                                    alt='post'
                                    loading='lazy'
                                    className={cx('smaller', { isVertical: isVertical(images[1].Path) })}
                                    onClick={onClick}
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
                                    className={cx('smaller', { isVertical: isVertical(images[2].Path) })}
                                    onClick={onClick}
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
                            <h1 className={cx('remaining')} onClick={onClick}>
                                +{images.length - 4}
                            </h1>
                        </Col>
                    </Row>
                </>
            );
    }
}

export default PostImage;
