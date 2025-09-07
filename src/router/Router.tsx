import { createBrowserRouter, redirect } from 'react-router-dom';
import { Layout } from '../shared';
import { anonymous, auth } from '../guards';
import { HomeView, KaraokeView, LoginView, RankingView, RegisterView, ShareUrlView } from '../features';
import { HOME_PATH, KARAOKE_PATH, LOGIN_PATH, RANKING_PATH, REGISTER_PATH, SHARE_URL_PATH } from './routes.constant';

const Router = () => {
    return createBrowserRouter(
        [
            {
              id: 'not-found',
              path: '*',
              loader: () => redirect('/'),
              errorElement: <div>Error</div>,
            },
            {
                id: 'root',
                path: '/',
                Component: Layout,
                errorElement: <div>Error</div>,
                children: [
                    {
                        index: true,
                        id: 'home',
                        path: HOME_PATH,
                        loader: anonymous(),
                        element: <HomeView />,
                    },
                    {
                        index: true,
                        id: 'register',
                        path: REGISTER_PATH,
                        loader: anonymous(),
                        element: <RegisterView />,
                    },
                    {
                        index: true,
                        id: 'login',
                        path: LOGIN_PATH,
                        loader: anonymous(),
                        element: <LoginView />,
                    },
                    {
                        index: true,
                        id: 'shareUrl',
                        path: SHARE_URL_PATH,
                        loader: anonymous(),
                        element: <ShareUrlView />,
                    },
                    {
                        index: true,
                        id: 'ranking',
                        path: RANKING_PATH,
                        loader: auth(),
                        element: <RankingView />,
                    },
                    {
                        index: true,
                        id: 'karaoke',
                        path: KARAOKE_PATH,
                        loader: auth(),
                        element: <KaraokeView />,
                    },
                ],
            },
        ],
        {
            basename: import.meta.env.BASE_URL,
        },
    );
};

export { Router }