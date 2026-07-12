import { createBrowserRouter } from 'react-router';
import videosRouter from './pages/videos/videosRouter';

const router = createBrowserRouter([...videosRouter]);

export default router;
