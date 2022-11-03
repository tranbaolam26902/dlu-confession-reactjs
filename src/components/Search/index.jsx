import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';

const cx = classNames.bind(styles);

function Search() {
    const searchResult = ['Sumeru', 'Dehya c0 r1'];
    // React's hooks
    const navigate = useNavigate();

    // Functions

    // Event handlers
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/genshin`);
    };

    return (
        <Tippy
            interactive
            trigger='click'
            render={(attrs) => (
                <PopoverWrapper>
                    <div className={cx('search-result')} tabIndex='-1' {...attrs}>
                        {searchResult.map((result, index) => {
                            return (
                                <div key={index} className={cx('search-result-item')}>
                                    {result}
                                </div>
                            );
                        })}
                    </div>
                </PopoverWrapper>
            )}
        >
            <form className={cx('wrapper')} onSubmit={handleSearch}>
                <input type='text' placeholder='Tìm kiếm...' className={cx('search-input')} />
                <button className='d-flex align-items-center me-2 px-3 py-1 h-100'>
                    <img src={icons.search} alt='search-icon' />
                </button>
            </form>
        </Tippy>
    );
}

export default Search;
