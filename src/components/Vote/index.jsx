import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../store';
import styles from './Vote.module.scss';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function Vote({ data, like, setLike, isVoted, setIsVoted }) {
    const [states, dispatch] = useStore();
    const { apiURL } = states;
    const { token } = useToken();

    const [voted, setVoted] = useState(isVoted);
    const [userId, setUserId] = useState('');

    const handleVoteUp = () => {
        if (token) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/userpost/like`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    setLike(data.Like);
                    setVoted(data.PostLikes.IsLike);
                });
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
    };

    const handleVoteDown = () => {
        if (token) {
            if (voted) {
                const formData = new FormData();
                formData.append('id', data.Id);
                fetch(`${apiURL}/api/userpost/like`, {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                    },
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setLike(data.Like);
                        setVoted(data.PostLikes.IsLike);
                    });
            }
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
    };

    useEffect(() => {
        console.log(isVoted);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <button onClick={handleVoteUp}>
                <img src={icons.voteUp} alt='icon-vote-up' />
            </button>
            <span className={cx('vote', { 'vote-up': isVoted })}>{like}</span>
            <button onClick={handleVoteDown}>
                <img src={icons.voteDown} alt='icon-vote-down' />
            </button>
        </div>
    );
}

export default Vote;
