import classNames from "classnames/bind";

import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment() {
    return (
    <div className={cx('wrapper')}>
        <div className={cx('header')}>
            
        </div>
        <div className={cx('body')}>

        </div>
    </div>);
}

export default Comment;