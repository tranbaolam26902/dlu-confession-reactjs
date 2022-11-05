import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './CommentOptions.module.scss';
import icons from '../../../assets/icons';

import { Wrapper as PopoverWrapper } from '../../Popover';

const cx = classNames.bind(styles);

function CommentOptions({ data, setIsEditing }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, userId } = states;

    // Functions
    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };

    // Event handlers
    const handleDelete = () => {
        if (window.confirm('Xác nhận xóa bình luận?')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/usercomment/delete`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((responsePostData) => {
                    updatePosts();
                    dispatch(actions.setPostData(responsePostData));
                });
        }
    };

    return (
        <Tippy
            interactive
            trigger='click'
            placement='right-start'
            render={(attrs) => (
                <PopoverWrapper>
                    <div className='d-flex flex-column'>
                        {data.AccountId === userId ? (
                            <button className={cx('option')} onClick={() => setIsEditing(true)}>
                                Chỉnh sửa
                            </button>
                        ) : null}
                        <button className={cx('option', 'isDelete')} onClick={handleDelete}>
                            Xóa
                        </button>
                    </div>
                </PopoverWrapper>
            )}
        >
            <img src={icons.horizontalOption} alt='icon-option' className={cx('button')} />
        </Tippy>
    );
}

export default CommentOptions;
