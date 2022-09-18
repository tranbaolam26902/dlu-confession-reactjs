import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './Post.module.scss';
import images from '../../assets/img';
import CategoryTag from '../CategoryTag';
import icons from '../../assets/icons';

const cx = classNames.bind(styles);

function Post({ data }) {
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
                        <img src={icons.verticalOption} alt='option-icon' />
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
                <div className={cx('footer')}>Like</div>
            </div>
        </div>
    );
}

export default Post;
