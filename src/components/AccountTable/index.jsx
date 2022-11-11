import classNames from 'classnames/bind';

import styles from './AccountTable.module.scss';

import Header from './Header';
import ReportedPost from './AccountItem';
import SearchReportedPosts from './SearchAccount';

const cx = classNames.bind(styles);

function AccountTable() {
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h4 className={cx('title')}>Danh sách tài khoản</h4>
                <SearchReportedPosts />
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
