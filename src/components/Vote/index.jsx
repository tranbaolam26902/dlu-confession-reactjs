import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../store';
import styles from './Vote.module.scss';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function Vote({ data, like, setLike, isVoted, setIsVoted }) {
    // Global states
    const [states, dispatch] = useStore();
    const { token } = useToken();
    const { apiURL, userId } = states;

    // useEffect(() => {}, [isVoted, like]);
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
                    if (data.PostLikes.length > 0) {
                        data.PostLikes.map((postLike) => {
                            if (postLike.UserID == userId) {
                                setIsVoted(postLike.IsLiked);
                            }
                            else {
                                setIsVoted(false);
                            }
                        });
                    }
                    else {
                        setIsVoted(false);
                    }
                    
                    
                });
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
    };

    const handleVoteDown = () => {
        if (token) {
            if (isVoted) {
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
                        setIsVoted(data.PostLikes.IsLiked);
                    });
            }
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
    };
    
    // useEffect(() => {
    //     console.log(isVoted + " 4");

    // }, [isVoted, post]);
    return (
        <div className={cx('wrapper')}>
            <button onClick={handleVoteUp}>
                
                {isVoted && <img src={icons.voteUpTrue} alt='icon-vote-up' />}
                {!isVoted && <img src={icons.voteUp} alt='icon-vote-up' />}
            </button>
            <span className={cx('vote')}>{like}</span>
            {/* <button onClick={handleVoteDown}>
                <img src={icons.voteDown} alt='icon-vote-down' />
            </button> */}
        </div>
    );
    
}

export default Vote;
