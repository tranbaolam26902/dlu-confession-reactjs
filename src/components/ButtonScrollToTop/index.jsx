import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ButtonScrollToTop.module.scss';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function ButtonScrollToTop() {
    const [showButton, setShowButton] = useState(false);

    const handleShowButton = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) setShowButton(true);
        else setShowButton(false);
    };

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleShowButton);
    }, []);

    return (
        <>
            {showButton && (
                <button className={cx('wrapper')} onClick={handleScroll}>
                    <img src={icons.arrowUp} alt='icon-arrow-up' />
                </button>
            )}
        </>
    );
}

export default ButtonScrollToTop;
