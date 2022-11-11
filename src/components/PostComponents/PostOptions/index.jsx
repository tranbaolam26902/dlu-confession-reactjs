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
        if (!token) {
            dispatch(actions.setShowPostModal(false));
            dispatch(actions.setShowSignInModal(true));
        } else {
            dispatch(actions.setPostData(data));
            dispatch(actions.setShowPostModal(false));
            dispatch(actions.setShowReportModal(true));
        }
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
            trigger='click'
            placement='bottom-end'
            render={(attrs) => (
                <PopoverWrapper>
                    <div className='d-flex flex-column'>
                        {(roles && roles.includes('Manager')) || data.PostHistories[0].AccountId === userId ? null : (
                            <button className={cx('post-option')} onClick={handleReport}>
                                Báo cáo
                            </button>
                        )}
                        {userId === data.PostHistories[0].AccountId ? (
                            <button className={cx('post-option')} onClick={handleEdit}>
                                Chỉnh sửa
                            </button>
                        ) : null}
                        {roles && (roles.includes('Manager') || userId === data.PostHistories[0].AccountId) ? (
                            <button className={cx('post-option', 'isDelete')} onClick={handleDelete}>
                                Xóa
                            </button>
                        ) : null}
                    </div>
                </PopoverWrapper>
            )}
        >
            <img src={icons.verticalOption} alt='icon-option' className={cx('button')} />
        </Tippy>
    );
}

export default PostOptions;
