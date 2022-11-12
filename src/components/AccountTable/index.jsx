import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './AccountTable.module.scss';

import Header from './Header';
import AccountItem from './AccountItem';
import SearchAccount from './SearchAccount';
import Pagination from '../Pagination';
import EditRolesModal from '../EditRolesModal';

const cx = classNames.bind(styles);

function AccountTable() {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [accounts, setAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // variables
    const accountsPerPage = 10;

    // Get current posts
    const indexOfLastPost = currentPage * accountsPerPage;
    const indexOfFirstPost = indexOfLastPost - accountsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        updateAccounts();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h4 className={cx('title')}>Danh sách tài khoản</h4>
                <SearchAccount />
            </div>
            <Header />
            <div className={cx('wrapper')}>
                {currentAccounts.map((account) => {
                    return <AccountItem data={account} key={account.Id} />;
                })}
            </div>
            {accounts.length > accountsPerPage ? (
                <Pagination
                    itemsPerPage={accountsPerPage}
                    totalItems={accounts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            ) : null}
            <EditRolesModal />
        </>
    );
}

export default AccountTable;
