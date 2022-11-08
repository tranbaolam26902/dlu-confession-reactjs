import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ avatar }) {
    const [isVertical, setIsVertical] = useState(false);

    // Event handlers
    const handleLoadAvatar = () => {
        const img = new Image();
        img.src = avatar;
        img.onload = () => {
            if (img.height > img.width) setIsVertical(true);
            else setIsVertical(false);
        };
    };

    return (
        <div className={cx('wrapper')}>
            {avatar && (
                <img
                    src={avatar}
                    className={cx('avatar', { isVertical: isVertical })}
                    alt='avatar'
                    loading='lazy'
                    onLoad={handleLoadAvatar}
                />
            )}
        </div>
    );
}

export default Avatar;
