import { Home } from './pages/Home.jsx';
import { SongApp } from './pages/SongApp.jsx';
import { SongDetails } from './pages/SongDetails.jsx';
import { Account } from './cmps/Account.jsx';
import { SingerProfile } from './pages/SingerProfile.jsx';

export const routes = [
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/song',
        component: SongApp,
    },
    {
        path: '/singer/:singerId',
        component: SingerProfile,
    },
    {
        path: '/song/:songId',
        component: SongDetails,
    },
    {
        path: '/account/:tab?',
        component: Account
    },
];