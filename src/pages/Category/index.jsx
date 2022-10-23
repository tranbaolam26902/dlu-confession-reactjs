import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './Category.module.scss';

import Post from '../../components/Post';

const cx = classNames.bind(styles);

function Category() {
    const [states, dispatch] = useStore();
    const { apiURL, posts, categories, filter } = states;
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        let mounted = true;

        if (filter !== '') {
            const formData = new FormData();
            formData.append('id', filter);
            fetch(`${apiURL}/api/post/FindPostCategory`, {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (mounted) {
                        dispatch(actions.setPosts(data));
                        categories.map((category) => {
                            if (category.Id == filter) setCurrentCategory(category.Name);
                        });
                    }
                });
        }

        return () => (mounted = false);
    }, [filter]);

    return (
        <>
            <div className={cx('header')}>
                Bài viết thuộc danh mục: <span className={cx('category')}>{currentCategory}</span>
            </div>
            <div>
                {posts.map((post) => {
                    if (post.Active) return <Post data={post} key={post.Id} />;
                })}
            </div>
        </>
    );
}

export default Category;
