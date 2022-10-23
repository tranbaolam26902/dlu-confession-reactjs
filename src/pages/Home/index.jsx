import { useEffect, useState } from 'react';

import { useStore, actions } from '../../store';

import Post from '../../components/Post';

function Home() {
    const [states, dispatch] = useStore();
    const { apiURL, posts } = states;

    const [userId, setUserId] = useState();

    useEffect(() => {
        let mounted = true;

        fetch(`${apiURL}/api/post/index`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(actions.setPosts(data));
                if (localStorage.getItem('token')) {
                    fetch(`${apiURL}/api/useraccount/getinfo`, {
                        method: 'GET',
                        headers: {
                            Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                        },
                    })
                        .then((res) => res.json())
                        .then((responseData) => {
                            if (mounted) setUserId(responseData.Id);
                        });
                }
            });

        return () => (mounted = false);
    }, [posts]);

    return (
        <div>
            {posts.map((post) => {
                if (post.Active) return <Post data={post} userId={userId} key={post.Id} />;
            })}
        </div>
    );
}

export default Home;
