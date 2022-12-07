import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './ButtonToProfile.module.scss';

const cx = classNames.bind(styles);

function ButtonToProfile({ id, children }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();

    // Event handlers
    const handleClick = () => {
        dispatch(actions.setShowPostModal(false));
    };

    return (
        <Link to={`/profile/${id}`} onClick={handleClick} className={cx('wrapper')}>
            {children}
        </Link>
    );
}

export default ButtonToProfile;
