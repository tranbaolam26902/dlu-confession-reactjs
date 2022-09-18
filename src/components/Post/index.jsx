import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Post.module.scss';
import icons from '../../assets/icons';
import images from '../../assets/img';
import CategoryTag from '../CategoryTag';
import Vote from '../Vote';

const cx = classNames.bind(styles);

function Post({ data }) {
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);
    
    return (
        <div id={data.Id} className={cx('wrapper')}>
            <div className='d-flex flex-column'>
                <div className={cx('header')}>
                    <img src={images.logo} alt='Avatar' />
                    <div className={cx('info')}>
                        <h3 className={cx('name')}>Name</h3>
                        <h5 className={cx('time')}>{data.CreatedTime}</h5>
                    </div>
                    <button>
                        <img src={icons.verticalOption} alt="icon-option" />
                    </button>
                </div>
                <div className={cx('categories')}>
                    {data.Categories.map((category) => {
                        return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                    })}
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>{data.Title}</h3>
                    <div className={cx('content')}>{data.Description}</div>
                    <img src={images.post} alt='post-img' className='w-100 rounded-3' />
                </div>
                <div className={cx('footer')}>
                    <Vote voted={{up, down}} action={{setUp, setDown}}>{up ? data.Like + 1 : data.Like}</Vote>
                </div>
            </div>
        </div>
    );
}

export default Post;
