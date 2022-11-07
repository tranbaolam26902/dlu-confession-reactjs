import { Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './AccountTable.module.scss';

import Header from './Header';
import ReportedPost from './AccountItem';
import SearchReportedPosts from './SearchAccount';

const cx = classNames.bind(styles);

function AccountTable() {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className={cx('title')}>Danh sách bài viết bị báo cáo</h4>
                <Stack gap={3} direction='horizontal' className='justify-content-end mb-2'>
                    <button className={cx('action')}>Xóa tất cả</button>
                    <button className={cx('action')}>Bỏ qua tất cả</button>
                    <SearchReportedPosts />
                </Stack>
            </div>
            <Header />
            <div className={cx('wrapper')}>
                <ReportedPost />
                <ReportedPost />
                <ReportedPost />
                <ReportedPost />
                <ReportedPost />
                <ReportedPost />
            </div>
        </>
    );
}

export default AccountTable;
