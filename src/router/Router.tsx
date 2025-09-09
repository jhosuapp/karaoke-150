import { createHashRouter } from 'react-router-dom';
import { Layout } from '../shared';
import { anonymous, auth } from '../guards';
import { HomeView, KaraokeView, LoginView, QrView, RankingView, RegisterView, ShareUrlView } from '../features';
import { HOME_PATH, KARAOKE_PATH, LOGIN_PATH, QR_PATH, RANKING_PATH, REGISTER_PATH, SHARE_URL_PATH } from './routes.constant';
import { LoaderSecondary } from '../shared/components';

const Router = () => {
    return createHashRouter(
        [
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
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
                    },
                    {
                        id: 'register',
                        path: REGISTER_PATH,
                        loader: anonymous(),
                        element: <RegisterView />,
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
                    },
                    {
                        id: 'login',
                        path: LOGIN_PATH,
                        loader: anonymous(),
                        element: <LoginView />,
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
                    },
                    {
                        id: 'shareUrl',
                        path: SHARE_URL_PATH,
                        loader: anonymous(),
                        element: <ShareUrlView />,
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
                    },
                    {
                        id: 'ranking',
                        path: RANKING_PATH,
                        loader: auth(),
                        element: <RankingView />,
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
                    },
                    {
                        id: 'karaoke',
                        path: KARAOKE_PATH,
                        loader: anonymous(),
                        element: <KaraokeView />,
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
                    },
                    {
                        id: 'qr',
                        path: QR_PATH,
                        loader: anonymous(),
                        element: <QrView />,
                        HydrateFallback: () => <LoaderSecondary key="loader-sec" />,
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