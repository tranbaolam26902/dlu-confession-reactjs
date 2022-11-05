import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore } from '../../../../store';
import styles from './Popular.module.scss';
import icons from '../../../../assets/icons';

import PopularPost from './PopularPost';

const cx = classNames.bind(styles);

function Popular({ children }) {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${apiURL}/api/post/hotpost`)
            .then((response) => response.json())
            .then((responsePosts) => {
                setPosts(responsePosts);
            });
        // eslint-disable-next-line
    }, [states.posts]);

    return (
        <div className={cx('wrapper')}>
            <div className='d-flex align-items-center'>
                <img src={icons.popular} alt='icon-popular' />
                <h5 className={cx('title')}>Bài viết nổi bật</h5>
            </div>
            <hr className='mt-2 mb-0' />
            <div className={cx('body')}>
                {posts.map((post) => {
                    return <PopularPost data={post} key={post.Id} />;
                })}
            </div>
        </div>
    );
}

export default Popular;
