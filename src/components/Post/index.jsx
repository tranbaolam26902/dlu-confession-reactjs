import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './Post.module.scss';
import images from '../../assets/img';
import CategoryTag from '../CategoryTag';

const cx = classNames.bind(styles);

function Post({ data }) {
    return (
        <div id={data.Id} className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={images.logo} alt="Avatar" />
                <div className={cx('info')}>
                    <h3 className={cx('name')}>Name</h3>
                    <h5 className={cx('time')}>{data.CreatedTime}</h5>
                </div>
                <button>More</button>
            </div>
            <div className={cx('body')}>
                <div className={cx('categories')}>
                    {data.Categories.map((category) => {
                        return <CategoryTag key={category.Id}>{category.Name}</CategoryTag>;
                    })}
                </div>
                <h3 className={cx('title')}>{data.Title}</h3>
                <h4 className={cx('content')}>{data.Description}</h4>
            </div>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default Post;
