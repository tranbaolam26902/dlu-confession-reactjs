import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import useViewPort from '../../../../hooks';
import styles from './Header.module.scss';
import images from '../../../../assets/img';
import Search from '../../../Search';
import UserActions from '../../../UserActions';


//Temp
import { useState } from 'react';
import Notify from '../../../Notify';
// End Temp

const cx = classNames.bind(styles);

function Header() {
    const viewPort = useViewPort();
    const isMobile = viewPort.width <= 992;


    // Temp
    const [notify, setNotify] = useState(true);

    const DisplayNotify = () => {
        if (notify === false) {
            setNotify(true);
        } else if (notify === true) {
            setNotify(false);
        }
    };
    // End Temp


    return (
        <div className={cx('wrapper')}>
            <Container fluid='md'>
                <Row className={cx('inner')}>
                    <Col>
                        <Link to='/'>
                            <img src={images.logoFull} alt='logo' />
                        </Link>
                    </Col>
                    {!isMobile && (
                        <Col>
                            <Search placeholder='Tìm kiếm...' />
                        </Col>
                    )}
                    <Col className='text-end'>
                        <UserActions />
            <div style={{position: "relative"}}>
                <button className='' onClick={() => DisplayNotify()}>
                    Click To Display
                </button>
                {notify && <Notify />}
            </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
