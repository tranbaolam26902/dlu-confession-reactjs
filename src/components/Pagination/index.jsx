import classNames from 'classnames/bind';
import icons from '../../assets/icons';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={cx('wrapper')}>
            {currentPage !== 1 ? (
                <button className={cx('controller')} onClick={() => paginate(currentPage - 1)}>
                    <img src={icons.arrowLeft} alt='icon-left' />
                </button>
            ) : null}
            <div className='mx-2'>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={cx('page', { active: currentPage === number })}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
            {currentPage !== pageNumbers.length ? (
                <button className={cx('controller')} onClick={() => paginate(currentPage + 1)}>
                    <img src={icons.arrowRight} alt='icon-right' />
                </button>
            ) : null}
        </div>
    );
}

export default Pagination;
