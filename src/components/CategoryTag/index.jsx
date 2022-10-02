import classNames from "classnames/bind";

import styles from "./CategoryTag.module.scss";

const cx = classNames.bind(styles);

function CategoryTag({ children }) {
    return (
        <span className={cx('wrapper')}>{children}</span>
    );
}

export default CategoryTag;