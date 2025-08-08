import { createBrowserRouter, redirect } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '../shared';
import { anonymous } from '../guards';
import { KaraokeView } from '../features';
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
                        element: <KaraokeView />,
                        HydrateFallback: () => (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="hydrate-fallback"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                                    className="h-[100vh] fixed left-0 top-0 flex items-center justify-center w-full text-[5vw]"
                                >
                                Loading...
                                </motion.div>
                            </AnimatePresence>
                        ),
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