import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';

import { useStore, actions } from '../../store';
import styles from './MessageModal.module.scss';
import icons from '../../assets/icons';

import { Button } from '../Buttons';

const cx = classNames.bind(styles);

function MessageModal() {
    // Global states
    const [states, dispatch] = useStore();
    const { message, showMessageModal } = states;

    // Event handlers
    const handleClose = () => {
        dispatch(actions.setMessage(''));
        dispatch(actions.setShowMessageModal(false));
    };

    return (
        <Modal show={showMessageModal} onHide={handleClose} centered>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Thông báo</h3>
                    <button className={cx('close')} onClick={handleClose}>
                        <img src={icons.close} alt='icon-close' />
                    </button>
                </div>
                <hr className='mb-3' />
                <div className='mb-3'>{message}</div>
                <div className='text-end'>
                    <Button secondary onClick={handleClose}>
                        Đóng
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default MessageModal;
