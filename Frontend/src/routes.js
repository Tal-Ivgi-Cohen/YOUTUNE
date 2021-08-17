import { Home } from './pages/util/Home.jsx';
import { About } from './pages/util/About.jsx';
import { SongApp } from './pages/art/SongApp.jsx';
import { ArtEdit } from './pages/art/ArtEdit.jsx';
import { SongDetails } from './pages/SongDetails.jsx';
import { ArtAdd } from './pages/art/ArtAdd.jsx';
import { Account } from './pages/user/Account.jsx';
import { ArtCart } from './pages/art/ArtCart.jsx';
import { Checkout } from './pages/art/Checkout.jsx';
import { SingerProfile } from './pages/singer/SingerProfile.jsx';
import { Wishlist } from './pages/art/Wishlist.jsx';




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
        path: '/art/edit/:artId',
        component: ArtEdit,
    },
    {
        path: '/singer/:singerId',
        component: SingerProfile,
    },
    {
        path: '/art/add',
        component: ArtAdd,
    },
    {
        path: '/song/:songId',
        component: SongDetails,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/cart',
        component: ArtCart,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/account/:tab?',
        component: Account
    },
    {
        path: '/wishlist',
        component: Wishlist
    }
];