import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import icons from "../../assets/icons";

const cx = classNames.bind(styles);

function Search({ placeholder }) {
    return (
        <div className={cx('wrapper')}>
            <input type="text" placeholder={placeholder ? placeholder : "Tìm kiếm..."} className={cx('search-input')} />
            <img src={icons.search} alt="search-icon" />
        </div>
    );
}

export default Search;