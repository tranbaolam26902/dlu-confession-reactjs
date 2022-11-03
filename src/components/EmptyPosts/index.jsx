import classNames from 'classnames/bind';

import styles from './EmptyPosts.module.scss';
import images from '../../assets/img';

const cx = classNames.bind(styles);

function EmptyPosts() {
    return (
        <div className={cx('wrapper')}>
            <img src={images.emptyPosts} alt='empty-posts' />
            <h5>
                <i>Chưa có bài viết</i>
            </h5>
        </div>
    );
}

export default EmptyPosts;
