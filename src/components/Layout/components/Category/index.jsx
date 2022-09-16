import classNames from 'classnames/bind';
import icons from '../../../../assets/icons';
import CategoryTag from '../../../CategoryTag';
import Search from '../../../Search';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

function Category() {
    const categories = ['Học tập', 'Điểm số', 'Xin in tư', 'Tìm đồ', 'Tìm trọ', 'Mua bán đồ cũ', 'Hoạt động Đoàn'];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={icons.category} alt="category-icon" />
                <h5 className={cx('title')}>Danh mục</h5>
            </div>
            <Search placeholder="Tìm danh mục..." />
            <div className={cx('categories')}>
                {categories.map((category, index) => {
                    return <CategoryTag key={index}>{category}</CategoryTag>;
                })}
            </div>
        </div>
    );
}

export default Category;
