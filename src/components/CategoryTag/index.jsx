import { useStore, actions } from '../../store';
import classNames from "classnames/bind";
import styles from "./CategoryTag.module.scss";

const cx = classNames.bind(styles);

function CategoryTag({ children }) {
    const [states, dispatch] = useStore();
    return (
        <span className={cx('wrapper')} onClick={() => dispatch(actions.setToken(''))}>{children}</span>
    );
}

export default CategoryTag;