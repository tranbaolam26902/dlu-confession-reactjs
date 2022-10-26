import classNames from 'classnames/bind';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ avatar }) {
    return <div className={cx('avatar')}>{avatar && <img src={avatar} alt='avatar' loading='lazy' />}</div>;
}

export default Avatar;
