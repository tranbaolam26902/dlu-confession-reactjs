import { useEffect } from 'react';

import { useStore, actions } from '../../store';

import Post from '../../components/Post';

function Home() {
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;
    useEffect(() => {
        fetch(`${apiURL}/api/post/index`)
            .then((res) => res.json())
            .then((data) => dispatch(actions.setPosts(data)));
    }, [posts]);

    return (
        <div>
            {posts.map((post) => {
                if (post.Active) return <Post data={post} key={post.Id} />;
            })}
        </div>
    );
}

export default Home;
