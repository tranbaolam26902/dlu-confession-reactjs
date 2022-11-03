import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './Search.module.scss';
import icons from '../../assets/icons';

import { Wrapper as PopoverWrapper } from '../Popover';
import Avatar from '../../components/Avatar';

const cx = classNames.bind(styles);

function Search() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    // Component's states
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLabel, setSearchLabel] = useState('');

    // Event handlers
    const handleSearch = (keyword) => {
        if (keyword !== '') {
            navigate(
                `/search/${keyword
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/Đ/g, 'D')}`,
            );
            setKeyword('');
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            const formData = new FormData();
            formData.append('keyword', keyword);
            fetch(`${apiURL}/api/post/FindPost`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((responseSearchResults) => {
                    setSearchResults(responseSearchResults);
                });
            keyword === '' ? setSearchLabel('Lịch sử tìm kiếm:') : setSearchLabel('Bài viết liên quan:');
        }, 1000);
        return () => clearTimeout(debounce);
        // eslint-disable-next-line
    }, [keyword]);

    return (
        <Tippy
            interactive
            trigger='click'
            render={(attrs) => (
                <PopoverWrapper>
                    <div className={cx('search-result')} tabIndex='-1' {...attrs}>
                        {searchResults.length !== 0 ? <h5 className='ms-3 mb-2'>{searchLabel}</h5> : null}
                        {searchResults.length === 0 ? (
                            <h5 className='text-center'>Không tìm thấy nội dung liên quan đến từ khóa tìm kiếm</h5>
                        ) : null}
                        {searchResults.map((result, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx('search-result-item')}
                                    onClick={() => handleSearch(result.Title)}
                                >
                                    <Avatar avatar={avatarURL + result.Avatar} />
                                    <div className='ms-3 fw-bold'>{result.Title}</div>
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
                    placeholder='Tìm kiếm...'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={cx('search-input')}
                    onKeyPress={(e) => {
                        e.key === 'Enter' && handleSearch(keyword);
                    }}
                />
                <button
                    className='d-flex align-items-center me-2 px-3 py-1 h-100'
                    onClick={() => handleSearch(keyword)}
                >
                    <img src={icons.search} alt='search-icon' />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
