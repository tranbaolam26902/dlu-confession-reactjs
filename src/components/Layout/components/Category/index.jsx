import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../../store';
import styles from './Category.module.scss';
import icons from '../../../../assets/icons';

import CategoryTag from '../../../CategoryTag';
import Button from '../../../Buttons/Button';
import CreateCategoryModal from './CreateCategoryModal';

const cx = classNames.bind(styles);

function Category() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, categories, roles } = states;

    // Component's states
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState('Chỉnh sửa');

    // Event handlers
    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) setEditingText('Xong');
        else setEditingText('Chỉnh sửa');
    };

    useEffect(() => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((responseCategories) => {
                dispatch(actions.setCategories(responseCategories));
            });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <img src={icons.category} alt='category-icon' />
                        <h5 className={cx('title')}>Danh mục</h5>
                    </div>
                    {roles && roles.includes('Manager') ? (
                        <h6 className='fw-bold' role='button' onClick={handleEdit}>
                            {editingText}
                        </h6>
                    ) : null}
                </div>
                <hr className='mb-3' />
                <div className={cx('categories')}>
                    {categories.map((category) => {
                        return (
                            <CategoryTag id={category.Id} key={category.Id} isEditing={isEditing}>
                                {category.Name}
                            </CategoryTag>
                        );
                    })}
                </div>
                <hr className='mb-3' />
                {roles && roles.includes('Manager') ? (
                    <Button outline fluid onClick={() => setShowCreateCategoryModal(true)}>
                        Tạo danh mục
                    </Button>
                ) : null}
            </div>
            <CreateCategoryModal
                showCreateCategoryModal={showCreateCategoryModal}
                setShowCreateCategoryModal={setShowCreateCategoryModal}
            />
        </>
    );
}

export default Category;
