import classNames from 'classnames/bind';

import { useStore, actions } from '../../../../store';
import styles from './Category.module.scss';
import icons from '../../../../assets/icons';
import CategoryTag from '../../../CategoryTag';
import Button from '../../../Button';

const cx = classNames.bind(styles);

function Category() {
    const [states, dispatch] = useStore();
    const categories = ['Học tập', 'Điểm số', 'Xin in tư', 'Tìm đồ', 'Tìm trọ', 'Mua bán đồ cũ', 'Hoạt động Đoàn'];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={icons.category} alt='category-icon' />
                <h5 className={cx('title')}>Danh mục</h5>
            </div>
            <hr className='mb-3' />
            <div className={cx('categories')}>
                {categories.map((category, index) => {
                    return <CategoryTag key={index}>{category}</CategoryTag>;
                })}
            </div>
            <hr className='mb-3' />
            <Button outline fluid onClick={() => dispatch(actions.setToken('cc'))}>
                Tạo danh mục
            </Button>
        </div>
    );
}

export default Category;
