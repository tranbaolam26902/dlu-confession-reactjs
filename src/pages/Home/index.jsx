import { useEffect } from 'react';

import { useStore, actions } from '../../store';

import { Post } from '../../components/PostComponents';

function Home() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;

    useEffect(() => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {posts.map((post) => {
                return <Post data={post} key={post.Id} />;
            })}
        </div>
    );
}

export default Home;
