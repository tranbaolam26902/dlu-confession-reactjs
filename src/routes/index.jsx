import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Category from '../pages/Category';
import { ProfileLayout } from '../components/Layout';
import Search from '../pages/Search';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile/:profileId', component: Profile, layout: ProfileLayout },
    { path: '/category/:categoryId', component: Category },
    { path: '/search/:keyword', component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
