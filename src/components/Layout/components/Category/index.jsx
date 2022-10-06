import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Category.module.scss';
import icons from '../../../../assets/icons';

import {useStore} from '../../../../store';
import CategoryTag from '../../../CategoryTag';
import Button from '../../../Button';

const cx = classNames.bind(styles);

function Category() {
    const [categories, setCategories] = useState([]);
    const [states, dispatch] = useStore();
    const {apiURL} = states;
    
    useEffect(() => {
        fetch(`${apiURL}api/category/index`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={icons.category} alt='category-icon' />
                <h5 className={cx('title')}>Danh mục</h5>
            </div>
            <hr className='mb-3' />
            <div className={cx('categories')}>
                {categories.map((category) => {
                    return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                })}
            </div>
            <hr className='mb-3' />
            <Button outline fluid>
                Tạo danh mục
            </Button>
        </div>
    );
}

export default Category;
