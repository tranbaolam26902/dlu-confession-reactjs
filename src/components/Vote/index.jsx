import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Vote.module.scss';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function Vote({ voted, action, children }) {
    const [voteUpIcon, setVoteUpIcon] = useState(icons.voteUp);
    const [voteDownIcon, setVoteDownIcon] = useState(icons.voteDown);
    
    const handleVoteUp = () => {
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
    }
    const handleVoteDown = () => {
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
    }

    return (
        <div className={cx('wrapper')}>
            <button>
                <img src={voteUpIcon} alt='icon-vote-up' onClick={handleVoteUp} />
            </button>
            <span className={cx('vote', {'vote-up': voted.up, 'vote-down': voted.down})}>{children}</span>
            <button>
                <img src={voteDownIcon} alt='icon-vote-down' onClick={handleVoteDown} />
            </button>
        </div>
    );
}

export default Vote;
