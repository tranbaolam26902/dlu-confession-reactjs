import { Modal, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../store';
import styles from './CreatePost.module.scss';
import icons from '../../assets/icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function CreatePost() {
    const [states, dispatch] = useStore();
    const { showCreatePostModal } = states;
    const handleClose = () => {
        dispatch(actions.setShowCreatePostModal(false));
    };
    return (
        <>
            <Modal size='lg' show={showCreatePostModal} onHide={handleClose} centered>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>Tạo bài viết</h3>
                        <button className={cx('close')} onClick={handleClose}>
                            <img src={icons.close} alt='icon-close' />
                        </button>
                    </div>
                    <hr className='my-0' />
                    <form>
                        <Stack gap={3} className='mt-3'>
                            <div className='d-flex align-items-center'>
                                <div className='me-2'>Chọn danh mục:</div>
                                <select className={cx('select-category')}>
                                    <option>Học tập</option>
                                    <option>Tìm trọ</option>
                                    <option>Hoạt động đoàn</option>
                                </select>
                                <button>
                                    <img src={icons.add} alt='icon-add' />
                                </button>
                            </div>
                            <input className={cx('text-box')} placeholder='Tiêu đề bài viết...' />
                            <textarea className={cx('text-area')} placeholder='Nội dung...' />
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center'>
                                    <input id='private' type='checkbox' className='me-2' />
                                    <label htmlFor='private' className={cx('private')}>Đăng ở chế độ ẩn danh</label>
                                </div>
                                <div>
                                    <Button text onClick={handleClose}>Hủy</Button>
                                    <Button secondary>Đăng</Button>
                                </div>
                            </div>
                        </Stack>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default CreatePost;
