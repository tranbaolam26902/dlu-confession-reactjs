import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';

const cx = classNames.bind(styles);

function Search({ placeholder }) {
    const searchResult = [
        'Sumeru',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
        'Dehya c0 r1',
    ];
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
            <div className={cx('wrapper')}>
                <input
                    type='text'
                    placeholder={placeholder ? placeholder : 'Tìm kiếm...'}
                    className={cx('search-input')}
                />
                <button className='d-flex align-items-center me-2 px-3 py-1 h-100'>
                    <img src={icons.search} alt='search-icon' />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
