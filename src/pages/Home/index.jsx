import { useEffect } from 'react';

import { useStore, actions } from '../../store';

import Post from '../../components/Post';

function Home() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, posts, userId } = states;

    // Variables
    const imageURL = `${apiURL}/image/user?id=`;

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
                        .then((data) => {
                            if (mounted) {
                                dispatch(actions.setUserId(data.Id));
                                dispatch(actions.setRoles(data.RoleTemps));
                                if (data.UserProfile.Avatar)
                                    dispatch(actions.setUserAvatar(`${imageURL}${data.UserProfile.Avatar}`));
                            }
                        });
                }
            });
        return () => (mounted = false);
    }, []);
    return (
        <div>
            {posts.map((post) => {
                if (post.Active) return <Post data={post} userId={userId} key={post.Id} />;
            })}
        </div>
    );
}

export default Home;
