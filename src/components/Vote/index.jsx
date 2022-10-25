import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../store';
import styles from './Vote.module.scss';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function Vote({ data, like, setLike, isVoted, setIsVoted }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, userId } = states;
    const { token } = useToken();
    
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
                        // data.PostLikes.map((postLike) => {
                        //     console.log(isVoted + ' 3');
                        //     isVoted = false;
                        //     if (postLike.UserID == userId) {
                        //         isVoted = postLike.IsLiked;
                        //         console.log(isVoted + ' 2');
                        //         return;
                        //     } 

                        // });
                        for (let  i = 0; i < data.PostLikes.length; i++) {
                            if  (data.PostLikes[i].UserID == userId) {
                                setIsVoted(data.PostLikes[i].IsLiked);
                                break;
                            } else {
                                setIsVoted(false)
                            }
                        }

                    } else {
                        setIsVoted(false)
                    }
                });
                
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
        
    };

    return (
        <div className={cx('wrapper')}>
            <button onClick={handleVoteUp}>
                {isVoted && <img src={icons.voteUpTrue} alt='icon-vote-up' />}
                {!isVoted && <img src={icons.voteUp} alt='icon-vote-up' />}
            </button>
            <span className={cx('vote')}>{like}</span>
        </div>
    );
}

export default Vote;
