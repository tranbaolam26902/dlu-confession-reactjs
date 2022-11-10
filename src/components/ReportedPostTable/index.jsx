import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './ReportedPostTable.module.scss';

import Header from './Header';
import ReportedPost from './ReportedPost';
import SearchReportedPosts from './SearchReportedPosts';
import EmptyPosts from '../EmptyPosts';

const cx = classNames.bind(styles);

function ReportedPostTable() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;

    // Component's states
    const [reportedPosts, setReportedPosts] = useState([]);

    // Functions
    const getReportedPosts = () => {
        fetch(`${apiURL}/api/admpost/PostViolate`, {
            headers: {
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
        })
            .then((response) => response.json())
            .then((responseReportedPosts) => setReportedPosts(responseReportedPosts));
    };

    // Event handlers
    const handleDeleteAll = () => {
        if (window.confirm('Xác nhận xóa tất cả bài viết đã ẩn?')) {
            fetch(`${apiURL}/api/admpost/DeleteViolate`, {
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            }).then(() => getReportedPosts());
        }
    };

    useEffect(() => {
        getReportedPosts();
    }, [posts]);

    return (
        <>
            {reportedPosts.length === 0 ? (
                <EmptyPosts message='Chưa có bài viết nào bị báo cáo' />
            ) : (
                <>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4 className={cx('title')}>Danh sách bài viết bị báo cáo</h4>
                        <Stack gap={3} direction='horizontal' className='justify-content-end mb-2'>
                            <button className={cx('action')} onClick={handleDeleteAll}>
                                Xóa bài viết đã ẩn
                            </button>
                            <SearchReportedPosts />
                        </Stack>
                    </div>
                    <Header />
                    <div className={cx('wrapper')}>
                        {reportedPosts.map((post) => (
                            <ReportedPost data={post} key={post.Id} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default ReportedPostTable;
