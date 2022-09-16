import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '../../../../assets/img';
import Button from '../../../Button';
import Search from '../../../Search';
import icons from '../../../../assets/icons';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')}>
                    <img src={images.logoFull} alt="Logo" />
                </Link>
                <div className={cx('search')}>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    <div className={cx('buttons')}>
                        <Button text>
                            Đăng ký
                        </Button>
                        <Button secondary to="/profile">
                            Đăng nhập
                        </Button>
                    </div>
                    <img className={cx('user')} src={icons.user} alt="user-icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;
