import { useEffect } from 'react';
import { useState } from 'react';
import Post from '../../components/Post';
import { useStore } from '../../store';

function Home() {
    const [states, dispatch] = useStore();
    const [posts, setPosts] = useState([]);
    const { apiURL } = states;
    useEffect(() => {
        fetch(`${apiURL}api/post/index`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    return (
        <div>
            {posts.map((post) => {
                if (post.Active) return <Post data={post} key={post.Id} />;
            })}
        </div>
    );
}

export default Home;
