import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './Category.module.scss';
import icons from '../../assets/icons';

import { Post } from '../../components/PostComponents';

const cx = classNames.bind(styles);

function Category() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, categories, filter } = states;

    // Component's states
    const [posts, setPosts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        if (filter !== '') {
            const formData = new FormData();
            formData.append('id', filter);
            fetch(`${apiURL}/api/post/FindPostCategory`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((responsePosts) => {
                    setPosts(responsePosts);
                    categories.map((category) => {
                        if (category.Id === filter) setCurrentCategory(category.Name);
                        return null;
                    });
                });
        }
        // eslint-disable-next-line
    }, [posts]);

    return (
        <>
            <div className={cx('header')}>
                <div>
                    <span>Bài viết thuộc danh mục: </span>
                    <span className={cx('category')}>{currentCategory}</span>
                </div>
                <Link to='/' onClick={() => dispatch(actions.setFilter(''))}>
                    <img src={icons.closeSmall} alt='btn-delete-filter' />
                </Link>
            </div>
            <div>
                {posts.map((post) => {
                    return <Post data={post} key={post.Id} />;
                })}
                {posts.length === 0 && (
                    <h5 className='text-center'>
                        <i>Chưa có bài viết nào thuộc danh mục này</i>
                    </h5>
                )}
            </div>
        </>
    );
}

export default Category;
