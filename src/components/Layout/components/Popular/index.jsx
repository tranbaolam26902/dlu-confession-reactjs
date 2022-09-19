import classNames from "classnames/bind";

import styles from './Popular.module.scss';
import icons from '../../../../assets/icons';

const cx = classNames.bind(styles);

function Popular({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={icons.popular} alt="icon-popular" />
                <h5 className={cx('title')}>Bài viết nổi bật</h5>
            </div>
            <hr className='mt-2 mb-0' />
            <div className={cx('body')}>{children}</div>
        </div>
    );
}

export default Popular;