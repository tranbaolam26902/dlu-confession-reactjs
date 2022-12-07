import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './Category.module.scss';
import icons from '../../assets/icons';

import EmptyPosts from '../../components/EmptyPosts';
import { Post } from '../../components/PostComponents';

const cx = classNames.bind(styles);

function Category() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, categories } = states;

    // Component's states
    const [posts, setPosts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');

    // Variables
    const categoryId = window.location.pathname.split('/').pop();

    useEffect(() => {
        if (categoryId !== '') {
            const formData = new FormData();
            formData.append('id', categoryId);
            fetch(`${apiURL}/api/post/FindPostCategory`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((responsePosts) => {
                    setPosts(responsePosts);
                });
        }
        // eslint-disable-next-line
    }, [navigate, states.posts]);

    useEffect(() => {
        categories.map((category) => {
            if (category.Id === categoryId) setCurrentCategory(category.Name);
            return null;
        });
        // eslint-disable-next-line
    }, [posts]);

    return (
        <>
            <div className={cx('header')}>
                <div>
                    <span>Bài viết thuộc danh mục: </span>
                    <span className={cx('category')}>{currentCategory}</span>
                </div>
                <Link to='/'>
                    <img src={icons.closeSmall} alt='btn-delete-filter' />
                </Link>
            </div>
            <div>
                {posts.map((post) => {
                    return <Post data={post} key={post.Id} />;
                })}
                {posts.length === 0 ? <EmptyPosts message='Chưa có bài viết nào thuộc danh mục này' /> : null}
            </div>
        </>
    );
}

export default Category;
