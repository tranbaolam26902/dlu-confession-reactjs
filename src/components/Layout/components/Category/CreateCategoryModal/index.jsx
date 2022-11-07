import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../../../store';
import styles from './CreateCategoryModal.module.scss';
import icons from '../../../../../assets/icons';

import { Button } from '../../../../Buttons';

const cx = classNames.bind(styles);

function CreateCategoryModal({ showCreateCategoryModal, setShowCreateCategoryModal }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    // Functions
    const removeAccents = (str) =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    const getAlias = (name) => removeAccents(name).split(' ').join('-');
    const validateCategoryData = () => {
        if (categoryName === '') {
            setErrorMessage('Nhập tên danh mục!');
            return false;
        }
        return true;
    };
    const updateCategories = () => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((responseCategories) => {
                dispatch(actions.setCategories(responseCategories));
            });
    };
    const createCategory = () => {
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
        }).then(() => {
            updateCategories();
            handleClose();
        });
    };

    // Event handlers
    const handleCreate = (e) => {
        e.preventDefault();
        if (validateCategoryData) createCategory();
    };
    const handleClose = () => {
        setErrorMessage('');
        setCategoryName('');
        setCategoryDescription('');
        setShowCreateCategoryModal(false);
    };

    return (
        <Modal show={showCreateCategoryModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
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
                            autoFocus
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
    );
}

export default CreateCategoryModal;
