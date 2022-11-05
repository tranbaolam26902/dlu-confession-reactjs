import { Col, Container, Row } from 'react-bootstrap';

import Header from '../components/Header';

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <Container fluid='md'>
                <Row className='position-relative gx-lg-4 mt-lg-4 mt-3'>
                    <Col sm={12} className='mx-auto'>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HeaderOnly;
