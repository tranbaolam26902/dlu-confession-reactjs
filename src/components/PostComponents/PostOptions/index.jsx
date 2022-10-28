import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { useStore, actions, useToken } from '../../../store';
import styles from './PostOptions.module.scss';
import icons from '../../../assets/icons';

import { Wrapper as PopoverWrapper } from '../../Popover';

const cx = classNames.bind(styles);

function PostOptions({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, roles, userId } = states;
    const { token } = useToken();

    // Functions
    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };

    // Event handlers
    const handleReport = () => {
        if (!token) dispatch(actions.setShowLoginModal(true));
    };
    const handleEdit = () => {
        dispatch(actions.setEditPostData(data));
        dispatch(actions.setShowCreatePostModal(true));
        dispatch(actions.setShowPostModal(false));
    };
    const handleDelete = () => {
        if (window.confirm('Xác nhận xóa bài viết?')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            if (roles.includes('Manager'))
                fetch(`${apiURL}/api/admpost/delete`, {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                    },
                    body: formData,
                }).then(() => {
                    dispatch(actions.setShowPostModal(false));
                    updatePosts();
                });
            else
                fetch(`${apiURL}/api/userpost/delete`, {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                    },
                    body: formData,
                }).then(() => {
                    dispatch(actions.setShowPostModal(false));
                    updatePosts();
                });
        }
    };

    return (
        <Tippy
            interactive
            delay={[0, 300]}
            placement='bottom-end'
            render={(attrs) => (
                <PopoverWrapper>
                    <div className='d-flex flex-column'>
                        {roles && !roles.includes('Manager') && (
                            <button className={cx('post-option')} onClick={handleReport}>
                                Báo cáo
                            </button>
                        )}
                        {userId === data.PostHistories[0].AccountId && (
                            <button className={cx('post-option')} onClick={handleEdit}>
                                Chỉnh sửa
                            </button>
                        )}
                        {roles && (roles.includes('Manager') || userId === data.PostHistories[0].AccountId) && (
                            <button className={cx('post-option', { isDelete: true })} onClick={handleDelete}>
                                Xóa
                            </button>
                        )}
                    </div>
                </PopoverWrapper>
            )}
        >
            <img src={icons.verticalOption} alt='icon-option' />
        </Tippy>
    );
}

export default PostOptions;
