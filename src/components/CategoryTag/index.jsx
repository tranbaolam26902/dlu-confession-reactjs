import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './CategoryTag.module.scss';

const cx = classNames.bind(styles);

function CategoryTag({ children, onClick }) {
    return (
        <Link to='/category' onClick={onClick} className={cx('wrapper')}>
            {children}
        </Link>
    );
}

export default CategoryTag;
