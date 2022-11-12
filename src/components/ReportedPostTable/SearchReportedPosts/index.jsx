import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../../store';
import styles from './SearchReportedPosts.module.scss';
import icons from '../../../assets/icons';

const cx = classNames.bind(styles);

function SearchReportedPosts({ setReportedPosts }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [keyword, setKeyword] = useState('');

    // Functions
    const updateReportedPosts = () => {
        fetch(`${apiURL}/api/admpost/PostViolate`, {
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
        })
            .then((response) => response.json())
            .then((responseReportedPosts) => setReportedPosts(responseReportedPosts));
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (keyword !== '') {
                const formData = new FormData();
                formData.append('keyword', keyword);
                fetch(`${apiURL}/api/admpost/FindPostViolate`, {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((responseSearchResults) => {
                        if (responseSearchResults.length !== 0) setReportedPosts(responseSearchResults);
                        else setReportedPosts([]);
                    });
            } else updateReportedPosts();
        }, 1000);
        return () => clearTimeout(debounce);
        // eslint-disable-next-line
    }, [keyword]);

    return (
        <div className={cx('wrapper')}>
            <input
                type='text'
                placeholder='Tìm kiếm bài viết bị báo cáo ...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={cx('search-input')}
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
