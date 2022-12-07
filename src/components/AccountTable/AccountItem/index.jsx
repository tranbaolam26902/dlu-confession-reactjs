import { Col, Row, Stack } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { useStore, actions } from '../../../store';
import styles from './AccountItem.module.scss';
import icons from '../../../assets/icons';

import Avatar from '../../Avatar';
import { ButtonToProfile } from '../../Buttons';

const cx = classNames.bind(styles);

function AccountItem({ data, setReRender }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    // Convert join date
    const date = data.UserProfile.Birthday.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];

    // Functions
    const getAccountRole = (roles) => {
        switch (roles.length) {
            case 3:
                return 'Quản trị viên';
            case 2:
                return 'Quản lý';
            case 1:
                return 'Người dùng';
            default:
                return 'Không xác định';
        }
    };

    // Event handlers
    const handleDelete = () => {
        if (window.confirm('Xác nhận xóa tài khoản?')) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/AdmUser/delete`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
                body: formData,
            }).then((response) => setReRender({ response }));
        }
    };
    const handleEdit = () => {
        dispatch(
            actions.setAccountData({
                Id: data.Id,
                Role: getAccountRole(data.Roles),
            }),
        );
        dispatch(actions.setShowEditRolesModal(true));
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col sm={1}>
                    <div className='d-flex'>
                        <ButtonToProfile id={data.Id}>
                            <Avatar avatar={avatarURL + data.UserProfile.Avatar} alt='avatar' />
                        </ButtonToProfile>
                    </div>
                </Col>
                <Col sm={2}>{data.UserName}</Col>
                <Col sm={3}>
                    <div>Tên hiển thị: {data.UserProfile.NickName}</div>
                    <div>Email: {data.Email}</div>
                </Col>
                <Col sm={2}>{day + ' tháng ' + month}</Col>
                <Col sm={2}>{getAccountRole(data.Roles)}</Col>
                <Col sm={2}>
                    <Stack gap={2} direction='vertical'>
                        <button className='text-start' onClick={handleDelete}>
                            <img src={icons.trash} className='me-1' alt='icon-trash' />
                            <span className={cx('delete')}>Xóa tài khoản</span>
                        </button>
                        <button className='text-start' onClick={handleEdit}>
                            <img src={icons.edit} className='me-1' alt='icon-edit' />
                            <span>Chỉnh sửa</span>
                        </button>
                        <button className='text-start'>
                            <img src={icons.eye} className='me-1' alt='icon-edit' />
                            <ButtonToProfile id={data.Id}>Xem trang cá nhân</ButtonToProfile>
                        </button>
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}

export default AccountItem;
