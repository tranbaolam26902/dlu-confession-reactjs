import classNames from 'classnames/bind';

import styles from './SearchReportedPosts.module.scss';
import icons from '../../../assets/icons';

const cx = classNames.bind(styles);

function SearchReportedPosts() {
    return (
        <div className={cx('wrapper')}>
            <input
                type='text'
                placeholder='Tìm kiếm bài viết bị báo cáo ...'
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

export default SearchReportedPosts;
