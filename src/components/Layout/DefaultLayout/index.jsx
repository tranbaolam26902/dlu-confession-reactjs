import classNames from 'classnames/bind';
import Header from '../components/Header';
import Category from '../components/Category';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className={cx('inner')}>
                <div className={cx('row')}>
                    <div className={cx('col-3')}>
                        <Category></Category>
                    </div>
                    <div className={cx('col-6')}>{children}</div>
                    <div className={cx('col-3')}>
                        <Category></Category>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
