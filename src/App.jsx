import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useStore } from './store';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import { PostModal } from './components/PostComponents';
import MessageModal from './components/MessageModal';

function App() {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { postData } = states;
    useEffect(() => {
        document.title = 'Confession Trường Đại học Đà Lạt';
    }, []);

    return (
        <Router>
            <div className='App'>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <Login />
                <CreatePost />
                {postData.Id && <PostModal />}
                <MessageModal />
            </div>
        </Router>
    );
}

export default App;
