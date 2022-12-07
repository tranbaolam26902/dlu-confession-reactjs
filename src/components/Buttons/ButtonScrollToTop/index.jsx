import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ButtonScrollToTop.module.scss';
import icons from '../../../assets/icons';

const cx = classNames.bind(styles);

function ButtonScrollToTop() {
    // Component's states
    const [showButton, setShowButton] = useState(false);

    // Event handlers
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
            {showButton === true ? (
                <button className={cx('wrapper')} onClick={handleScroll}>
                    <img src={icons.arrowUp} alt='icon-arrow-up' />
                </button>
            ) : null}
        </>
    );
}

export default ButtonScrollToTop;
