import { useEffect } from 'react';
import { useState } from 'react';
import Post from '../../components/Post';

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://localhost:44332/api/post/index')
            .then((res) => res.json())
            .then(
                (result) => {
                    setPosts(result);
                }
            );
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
