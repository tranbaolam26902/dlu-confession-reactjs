import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../../store';
import styles from './SearchAccount.module.scss';
import icons from '../../../assets/icons';

const cx = classNames.bind(styles);

function SearchAccount({ setAccounts }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [keyword, setKeyword] = useState('');

    // Functions
    const updateAccounts = () => {
        fetch(`${apiURL}/api/AdmUser/GetUserInfo`, {
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
        })
            .then((response) => response.json())
            .then((responseAccounts) => {
                setAccounts(responseAccounts);
            });
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (keyword !== '') {
                const formData = new FormData();
                formData.append('keyword', keyword);
                fetch(`${apiURL}/api/AdmUser/FindUser`, {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((responseSearchResults) => {
                        if (responseSearchResults.length !== 0) setAccounts(responseSearchResults);
                        else setAccounts([]);
                    });
            } else updateAccounts();
        }, 1000);
        return () => clearTimeout(debounce);
        // eslint-disable-next-line
    }, [keyword]);

    return (
        <div className={cx('wrapper')}>
            <input
                type='text'
                placeholder='Tìm kiếm tài khoản ...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={cx('search-input')}
            />
            <span className='d-flex align-items-center me-2 px-3 py-1 h-100'>
                <img src={icons.search} alt='search-icon' />
            </span>
        </div>
    );
}

export default SearchAccount;
