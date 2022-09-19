import classNames from 'classnames/bind';
import Header from '../components/Header';
import Category from '../components/Category';
import styles from './DefaultLayout.module.scss';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import useViewPort from '../../../hooks';
import Popular from '../components/Popular';
import PopularPost from '../../PopularPost';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const posts = [
        {
            Id: '390c2287-ac33-4ae5-bdc6-9428d4bc1867',
            Title: 'Sửa lại cái tiêu đề cho nó dài dài để test thử cái ellipsis xem có ổn khum :)',
            Description: 'Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng??? Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???',
            CreatedTime: '2008-11-11T00:00:00',
            Like: 1082,
            Dislike: 0,
            Report: 0,
            Status: 123,
            Actived: true,
            RowVersion: 'AAAAAAAAZZo=',
            Categories: [
                {
                    Id: '52e6bfd6-91fc-4b49-8f2f-0d63db97ac1b',
                    Name: 'Học liệu',
                    Alias: 'hoc-lieu',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAAJxE=',
                },
                {
                    Id: '274f5e34-0cdf-4d13-ad03-68affcdf96f0',
                    Name: 'Hỏi đáp',
                    Alias: 'hoi-dap',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAARlE=',
                },
            ],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: 'ff52edca-085c-496e-bf47-48435379b014',
            Title: 'Sửa lại cái tiêu đề cho nó dài dài để test thử cái ellipsis xem có ổn khum :)',
            Description: '10 viên c6',
            CreatedTime: '2022-09-04T20:01:30.387',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAZZk=',
            Categories: [],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: '18a09e83-1510-4266-b0a6-423262e5ac3c',
            Title: 'Sửa lại cái tiêu đề cho nó dài dài để test thử cái ellipsis xem có ổn khum :)',
            Description: '10 viên c6',
            CreatedTime: '2022-09-04T20:02:25.283',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAZZg=',
            Categories: [],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: 'a5fcac3e-9657-427c-b95d-a15cb0ddc889',
            Title: 'Sửa lại cái tiêu đề cho nó dài dài để test thử cái ellipsis xem có ổn khum :)',
            Description: '10 viên c6',
            CreatedTime: '2022-09-04T20:03:06.187',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAZZs=',
            Categories: [],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: '33581cb9-36f2-45f3-b288-ad14a61e6c2d',
            Title: 'Tìm Nilou',
            Description: '10 viên c6',
            CreatedTime: '2022-09-05T14:16:35.397',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAZZw=',
            Categories: [],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: 'ee0bb48b-8143-4793-9330-07e780402c05',
            Title: 'Tìm Nilou',
            Description: '10 viên c6',
            CreatedTime: '2022-09-05T14:17:50.667',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAZZ0=',
            Categories: [
                {
                    Id: '52e6bfd6-91fc-4b49-8f2f-0d63db97ac1b',
                    Name: 'Học liệu',
                    Alias: 'hoc-lieu',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAAJxE=',
                },
                {
                    Id: '274f5e34-0cdf-4d13-ad03-68affcdf96f0',
                    Name: 'Hỏi đáp',
                    Alias: 'hoi-dap',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAARlE=',
                },
            ],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: '19beec5d-1137-41e5-b9a3-6eab2e55f344',
            Title: 'Anh Thắng đẹp zai',
            Description: 'Hello anh thắng',
            CreatedTime: '2022-09-06T14:41:37.757',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAZZ4=',
            Categories: [
                {
                    Id: '52e6bfd6-91fc-4b49-8f2f-0d63db97ac1b',
                    Name: 'Học liệu',
                    Alias: 'hoc-lieu',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAAJxE=',
                },
                {
                    Id: '274f5e34-0cdf-4d13-ad03-68affcdf96f0',
                    Name: 'Hỏi đáp',
                    Alias: 'hoi-dap',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAARlE=',
                },
            ],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: '0d0ee78b-96a5-4901-a024-230decbb94bb',
            Title: 'Genshin',
            Description:
                'Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???',
            CreatedTime: '2022-09-08T08:24:38.577',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAhNE=',
            Categories: [
                {
                    Id: '52e6bfd6-91fc-4b49-8f2f-0d63db97ac1b',
                    Name: 'Học liệu',
                    Alias: 'hoc-lieu',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAAJxE=',
                },
                {
                    Id: '274f5e34-0cdf-4d13-ad03-68affcdf96f0',
                    Name: 'Hỏi đáp',
                    Alias: 'hoi-dap',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAARlE=',
                },
            ],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: '07b01de3-869d-48e5-bd9c-e0b0a88c42f4',
            Title: 'Genshin',
            Description:
                'Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???',
            CreatedTime: '2022-09-09T00:00:00',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAhNM=',
            Categories: [
                {
                    Id: '52e6bfd6-91fc-4b49-8f2f-0d63db97ac1b',
                    Name: 'Học liệu',
                    Alias: 'hoc-lieu',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAAJxE=',
                },
                {
                    Id: '274f5e34-0cdf-4d13-ad03-68affcdf96f0',
                    Name: 'Hỏi đáp',
                    Alias: 'hoi-dap',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAARlE=',
                },
            ],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
        {
            Id: '18ea7216-b34e-4ba0-9a8f-c0dd9e4819ae',
            Title: 'Genshin',
            Description:
                'Trong đoạn hội thoại ở Sumeru, Paimon đã nói muốn đẩy nhanh tiến độ để đến Natlan. Vậy có thể hành trình tiếp theo sẽ đến Hoả Quốc chẳng???',
            CreatedTime: '2022-09-09T14:37:09.12',
            Like: 0,
            Dislike: 0,
            Report: 0,
            Status: 0,
            Actived: true,
            RowVersion: 'AAAAAAAAhNI=',
            Categories: [
                {
                    Id: '52e6bfd6-91fc-4b49-8f2f-0d63db97ac1b',
                    Name: 'Học liệu',
                    Alias: 'hoc-lieu',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAAJxE=',
                },
                {
                    Id: '274f5e34-0cdf-4d13-ad03-68affcdf96f0',
                    Name: 'Hỏi đáp',
                    Alias: 'hoi-dap',
                    Description: 'Tìm kiếm tài liệu',
                    Actived: true,
                    RowVersion: 'AAAAAAAARlE=',
                },
            ],
            Comments: [],
            PostHistories: [],
            Pictures: [],
            PostLikes: [],
        },
    ];
    const stickyTop = { top: 'calc(var(--header-height) + 32px)' };
    const viewPort = useViewPort();
    const isMobile = viewPort.width < 992;
    return (
        <>
            <Header></Header>
            <Container fluid='md'>
                <Row className='position-relative gx-lg-4 mt-lg-4 mt-3'>
                    {!isMobile && (
                        <Col lg={3}>
                            <div className='sticky-top' style={stickyTop}>
                                <Category />
                            </div>
                        </Col>
                    )}
                    <Col lg={6} className='mx-auto'>
                        {children}
                    </Col>
                    {!isMobile && (
                        <Col lg={3}>
                            <div className='sticky-top' style={stickyTop}>
                                <Popular>{posts.map((post) => {
                                    return <PopularPost key={post.Id} data={post} />
                                })}</Popular>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default DefaultLayout;
