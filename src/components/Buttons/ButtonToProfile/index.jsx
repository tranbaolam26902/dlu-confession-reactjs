import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ButtonToProfile.module.scss';

const cx = classNames.bind(styles);

function ButtonToProfile({ id, children }) {
    return (
        <Link to={`/profile/${id}`} className={cx('wrapper')}>
            {children}
        </Link>
    );
}

export default ButtonToProfile;
