import { createBrowserRouter, redirect } from 'react-router-dom';
import { Layout } from '../shared';
import { anonymous } from '../guards';
import { KaraokeView, HomeView,  ScoreView } from '../features';
import { HOME_PATH } from './routes.constant';

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
                ],
            },
            {
                id: 'karaoke',
                path: '/karaoke',
                Component: Layout,
                errorElement: <div>Error</div>,
                children: [
                    {
                        index: true,
                        id: 'karaoke_home',
                        path: '',
                        loader: anonymous(),
                        element: <KaraokeView />,
                    },
                ],
            },
             {
                id: 'score',
                path: '/score',
                Component: Layout,
                errorElement: <div>Error</div>,
                children: [
                    {
                        index: true,
                        id: 'score_home',
                        path: '',
                        loader: anonymous(),
                        element: <ScoreView />,
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