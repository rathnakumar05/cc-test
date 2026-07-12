import type { RouteObject } from 'react-router';
import Layout from '@/components/layouts/Layout';
import VideosList from './VideosList';
import VideoView from './VideoView';
import VideoEdit from './VideoEdit';

const videosRouter: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <VideosList />,
      },
      {
        path: 'videos/:id',
        element: <VideoView />,
      },
      {
        path: 'videos/:id/edit',
        element: <VideoEdit />,
      },
    ],
  },
];

export default videosRouter;
