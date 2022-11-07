import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Category from '../pages/Category';
import Search from '../pages/Search';
import ManageReportedPosts from '../pages/ManageReportedPosts';
import ManageAccounts from '../pages/ManageAccounts';

import { ProfileLayout } from '../components/Layout';
import { HeaderOnly } from '../components/Layout';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile/:profileId', component: Profile, layout: ProfileLayout },
    { path: '/category/:categoryId', component: Category },
    { path: '/search/:keyword', component: Search },
];

const privateRoutes = [
    { path: '/manage-reported-posts', component: ManageReportedPosts, layout: HeaderOnly },
    { path: '/manage-accounts', component: ManageAccounts, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
