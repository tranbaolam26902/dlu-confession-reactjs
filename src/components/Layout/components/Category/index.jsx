import { useState, useEffect } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../../store';
import styles from './Category.module.scss';
import icons from '../../../../assets/icons';

import CategoryTag from '../../../CategoryTag';
import Button from '../../../Button';

const cx = classNames.bind(styles);

function Category() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, categories, roles } = states;

    // Component's states
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let mounted = true;

        fetch(`${apiURL}/api/category/index`)
            .then((res) => res.json())
            .then((data) => {
                if (mounted) dispatch(actions.setCategories(data));
            });

        return () => (mounted = false);
    }, [categories]);

    // Remove accents for alias
    const removeAccents = (str) =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    const getAlias = (name) => removeAccents(name).split(' ').join('-');

    const handleCreate = (e) => {
        e.preventDefault();
        if (categoryName === '') {
            setErrorMessage('Nhập tên danh mục!');
            return;
        }
        const data = {
            Name: categoryName,
            Alias: getAlias(categoryName),
            Description: categoryDescription,
            Active: true,
        };
        fetch(`${apiURL}/api/admcategory/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
            },
            body: JSON.stringify(data),
        }).then((res) => {
            handleClose();
        });
    };

    const handleClose = () => {
        setErrorMessage('');
        setCategoryName('');
        setCategoryDescription('');
        setShowCreateCategoryModal(false);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <img src={icons.category} alt='category-icon' />
                    <h5 className={cx('title')}>Danh mục</h5>
                </div>
                <hr className='mb-3' />
                <div className={cx('categories')}>
                    {categories.map((category) => {
                        return (
                            <CategoryTag key={category.Id} onClick={() => dispatch(actions.setFilter(category.Id))}>
                                {category.Name}
                            </CategoryTag>
                        );
                    })}
                </div>
                <hr className='mb-3' />
                {roles.includes('Manager') && (
                    <Button outline fluid onClick={() => setShowCreateCategoryModal(true)}>
                        Tạo danh mục
                    </Button>
                )}
            </div>

            <Modal show={showCreateCategoryModal} onHide={handleClose} centered>
                <div className={cx('create-category')}>
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>Tạo danh mục</h3>
                        <button className={cx('close')} onClick={handleClose}>
                            <img src={icons.close} alt='icon-close' />
                        </button>
                    </div>
                    <hr className='my-0' />
                    <form onSubmit={handleCreate}>
                        <Stack gap={3} className='pt-3'>
                            <div className='text-danger text-center'>{errorMessage}</div>
                            <input
                                className={cx('text-box')}
                                placeholder='Tên danh mục *'
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <textarea
                                className={cx('text-area')}
                                placeholder='Mô tả'
                                onChange={(e) => setCategoryDescription(e.target.value)}
                            />
                            <div className='text-end'>
                                <Button text onClick={handleClose}>
                                    Hủy
                                </Button>
                                <Button secondary>Tạo</Button>
                            </div>
                        </Stack>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default Category;
