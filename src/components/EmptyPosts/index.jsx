import classNames from 'classnames/bind';

import styles from './EmptyPosts.module.scss';
import images from '../../assets/img';

const cx = classNames.bind(styles);

function EmptyPosts({ message }) {
    return (
        <div className={cx('wrapper')}>
            <img src={images.emptyPosts} alt='empty-posts' />
            <h5>
                <i>{message}</i>
            </h5>
        </div>
    );
}

export default EmptyPosts;
