import { Home } from './pages/Home.jsx';
import { SongApp } from './pages/SongApp.jsx';
import { SongEdit } from './pages/SongEdit.jsx';
import { SongDetails } from './pages/SongDetails.jsx';
import { SongAdd } from './pages/SongAdd.jsx';
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
        path: '/song/edit/:songId',
        component: SongEdit,
    },
    {
        path: '/singer/:singerId',
        component: SingerProfile,
    },
    {
        path: '/song/add',
        component: SongAdd,
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