import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Category from '../pages/Category';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/category', component: Category },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
