import { useState } from 'react';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../store';
import styles from './Vote.module.scss';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function Vote({ voted, action, children }) {
    const [states, dispatch] = useStore();
    const { token } = useToken();
    const [voteUpIcon, setVoteUpIcon] = useState(icons.voteUp);
    const [voteDownIcon, setVoteDownIcon] = useState(icons.voteDown);
    const handleVoteUp = () => {
        if (token) {
            if (!voted.up) {
                setVoteUpIcon(icons.voteUpTrue);
                if (voted.down) {
                    action.setDown(!voted.down);
                    setVoteDownIcon(icons.voteDown);
                }
            } else {
                setVoteUpIcon(icons.voteUp);
            }
            action.setUp(!voted.up);
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
    };
    const handleVoteDown = () => {
        if (token) {
            if (!voted.down) {
                setVoteDownIcon(icons.voteDownTrue);
                if (voted.up) {
                    action.setUp(!voted.up);
                    setVoteUpIcon(icons.voteUp);
                }
            } else {
                setVoteDownIcon(icons.voteDown);
            }
            action.setDown(!voted.down);
        } else {
            dispatch(actions.setShowLoginModal(true));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <button onClick={handleVoteUp}>
                <img src={voteUpIcon} alt='icon-vote-up' />
            </button>
            <span className={cx('vote', { 'vote-up': voted.up, 'vote-down': voted.down })}>{children}</span>
            <button onClick={handleVoteDown}>
                <img src={voteDownIcon} alt='icon-vote-down' />
            </button>
        </div>
    );
}

export default Vote;
