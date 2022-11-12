import classNames from 'classnames/bind';

import styles from './SearchAccount.module.scss';
import icons from '../../../assets/icons';

const cx = classNames.bind(styles);

function SearchAccount() {
    return (
        <div className={cx('wrapper')}>
            <input
                type='text'
                placeholder='Tìm kiếm tài khoản ...'
                // value={keyword}
                // onChange={(e) => setKeyword(e.target.value)}
                className={cx('search-input')}
                // onKeyPress={(e) => {
                //     e.key === 'Enter' && handleSearch(keyword);
                // }}
            />
            <button
                className='d-flex align-items-center me-2 px-3 py-1 h-100'
                // onClick={() => handleSearch(keyword)}
            >
                <img src={icons.search} alt='search-icon' />
            </button>
        </div>
    );
}

export default SearchAccount;
