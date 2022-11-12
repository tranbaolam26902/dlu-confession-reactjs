import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './ReportedPostTable.module.scss';

import Header from './Header';
import ReportedPost from './ReportedPost';
import SearchReportedPosts from './SearchReportedPosts';
import Pagination from '../Pagination';

const cx = classNames.bind(styles);

function ReportedPostTable() {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;

    // Component's states
    const [reportedPosts, setReportedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // variables
    const postsPerPage = 10;

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = reportedPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    // Event handlers
    const handleDeleteAll = () => {
        if (window.confirm('Xác nhận xóa tất cả bài viết đã ẩn?')) {
            fetch(`${apiURL}/api/admpost/DeleteViolate`, {
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            }).then(() => updateReportedPosts());
        }
    };

    useEffect(() => {
        updateReportedPosts();
        // eslint-disable-next-line
    }, [posts]);

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className={cx('title')}>Danh sách bài viết bị báo cáo</h4>
                <Stack gap={3} direction='horizontal' className='justify-content-end mb-2'>
                    <button className={cx('action')} onClick={handleDeleteAll}>
                        Xóa bài viết đã ẩn
                    </button>
                    <SearchReportedPosts setReportedPosts={setReportedPosts} />
                </Stack>
            </div>
            <Header />
            <div className={cx('wrapper')}>
                {currentPosts.map((post) => (
                    <ReportedPost data={post} key={post.Id} />
                ))}
            </div>
            {currentPosts.length === 0 ? <div className='text-center'>Không tìm thấy bài viết</div> : null}
            {reportedPosts.length > postsPerPage ? (
                <Pagination
                    itemsPerPage={postsPerPage}
                    totalItems={reportedPosts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            ) : null}
        </>
    );
}

export default ReportedPostTable;
