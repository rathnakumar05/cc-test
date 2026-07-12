import { RouterProvider } from 'react-router';
import { reactQueryConfig } from '@/config/reactQueryConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from '@/router';
import { ThemeProvider } from './components/providers/ThemeProvider.tsx';

const queryClient = new QueryClient(reactQueryConfig);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
