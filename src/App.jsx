import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useStore, actions } from './store';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import CreatePost from './components/CreatePost';
import { PostModal } from './components/PostComponents';
import MessageModal from './components/MessageModal';
import { SignIn, SignUp, ForgotPassword } from './components/Account';
import ChangePasswordModal from './components/ChangePasswordModal';
import ReportModal from './components/ReportModal';

function App() {
    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, postData, roles, avatarURL } = states;

    useEffect(() => {
        document.title = 'Confession Trường Đại học Đà Lạt';
        if (localStorage.getItem('token')) {
            fetch(`${apiURL}/api/useraccount/getinfo`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token').replace(/['"]+/g, ''),
                },
            })
                .then((response) => response.json())
                .then((responseAccountInformation) => {
                    dispatch(actions.setUserId(responseAccountInformation.Id));
                    dispatch(actions.setRoles(responseAccountInformation.RoleTemps));
                    dispatch(actions.setUserAvatar(`${avatarURL}${responseAccountInformation.UserProfile.Avatar}`));
                });
        }
        // eslint-disable-next-line
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
                    {roles && roles.includes('Manager')
                        ? privateRoutes.map((route, index) => {
                              if (route.path !== '/manage-reported-posts') return null;
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
                          })
                        : null}
                    {roles && roles.includes('Admin')
                        ? privateRoutes.map((route, index) => {
                              if (route.path !== '/manage-accounts') return null;
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
                          })
                        : null}
                </Routes>
                <SignIn />
                <SignUp />
                <ForgotPassword />
                <ChangePasswordModal />
                <ReportModal />
                <CreatePost />
                {postData.Id && <PostModal />}
                <MessageModal />
            </div>
        </Router>
    );
}

export default App;
