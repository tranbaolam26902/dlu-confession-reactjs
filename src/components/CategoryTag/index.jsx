import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './CategoryTag.module.scss';

const cx = classNames.bind(styles);

function CategoryTag({ id, isEditing, children, onClick }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Event handlers
    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Xác nhận xóa danh mục?\nCác bài viết thuộc danh mục này sẽ không bị xóa')) {
            const formData = new FormData();
            formData.append('id', id);
            fetch(`${apiURL}/api/admcategory/delete`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            });
        }
    };

    return (
        <Link to='/category' onClick={onClick} className={cx('wrapper')}>
            {children}
            <span className={cx('btn-delete', { isEditing })} onClick={handleDelete}>
                &#10005;
            </span>
        </Link>
    );
}

export default CategoryTag;
