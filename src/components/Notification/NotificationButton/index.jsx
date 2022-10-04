import Tippy, { tippy } from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './NotificationButton.module.scss';
import icons from '../../../assets/icons';

import { Wrapper as PopoverWrapper } from '../../Popover';
import NotificationItem from '../NotificationItem';

const cx = classNames.bind(styles);

var ok = document.getElementsByClassName('header');
console.log(ok);

function NotificationButton(props) {
    const notificationList = props.data;
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement='bottom'
            render={(attrs) => (
                <PopoverWrapper>
                    <div className={cx('wrapper')} tabIndex={-1} {...attrs}>
                        <div className={cx('header fs-5 d-flex flex-row justify-content-between align-items-center')}>
                            <h3 className={cx('fw-bold')}>Notifications</h3>
                            <button className={cx('close-btn')}>
                                <img src={icons.close} alt='close-btn' />
                            </button>
                        </div>
                        <div className={cx('noti-list')}>
                            {notificationList.map((noti) => {
                                return <NotificationItem key={noti.id} {...noti} />;
                            })}
                        </div>
                    </div>
                </PopoverWrapper>
            )}
        >
            <button className='mx-3'>
                <div data={props.notification} className={cx({ notification: props.notification })}>
                    <img src={icons.noti} alt='icon-notification' />
                </div>
            </button>
        </Tippy>
    );
}

export default NotificationButton;
