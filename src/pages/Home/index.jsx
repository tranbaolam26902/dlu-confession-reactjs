import { useEffect } from 'react';

import { useStore, actions } from '../../store';

import { Post } from '../../components/PostComponents';

function Home() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, posts, avatarURL } = states;

    useEffect(() => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
                if (localStorage.getItem('token')) {
                    fetch(`${apiURL}/api/useraccount/getinfo`, {
                        method: 'GET',
                        headers: {
                            Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                        },
                    })
                        .then((response) => response.json())
                        .then((responseAccountInformation) => {
                            dispatch(actions.setUserId(responseAccountInformation.Id));
                            dispatch(actions.setRoles(responseAccountInformation.RoleTemps));
                            dispatch(
                                actions.setUserAvatar(`${avatarURL}${responseAccountInformation.UserProfile.Avatar}`),
                            );
                        });
                }
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
