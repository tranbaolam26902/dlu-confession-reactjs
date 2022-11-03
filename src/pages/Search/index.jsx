import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './Search.module.scss';

import { Post } from '../../components/PostComponents';
import EmptyPosts from '../../components/EmptyPosts';

const cx = classNames.bind(styles);

function Search() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [searchResults, setSearchResults] = useState([]);

    // Variables
    const keyword = window.location.pathname.split('/').pop().replace(/%20/g, ' ');

    useEffect(() => {
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
        // eslint-disable-next-line
    }, [navigate]);

    return (
        <>
            {searchResults.length === 0 ? (
                <EmptyPosts message='Không tìm thấy nội dung liên quan đến từ khóa tìm kiếm' />
            ) : null}
            {searchResults.length !== 0 ? (
                <div className={cx('header')}>
                    <span>Tìm thấy </span>
                    <span className={cx('highlight')}>{searchResults.length}</span>
                    <span> nội dung liên quan:</span>
                </div>
            ) : null}
            {searchResults.map((result) => {
                return <Post data={result} key={result.Id} />;
            })}
        </>
    );
}

export default Search;
