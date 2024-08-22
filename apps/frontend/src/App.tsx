import { useEffect, FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import UserStocks from './pages/UserStocks/UserStocks';
import Future from './pages/Future/Future';
import Stock from './pages/Stock/Stock';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import RedirectAuthenticated from './components/RedirectAuthenticated';
import userStore from './stores/userStore';

const App: FC = observer(() => {
  useEffect(() => {
    userStore.initializeAuthState();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Navigate to={userStore.isAuthenticated ? '/user' : '/auth'} replace />
      ),
    },
    {
      path: '/',
      element: (
        <ProtectedRoute
          isAuthenticated={userStore.isAuthenticated}
          redirectPath="/login"
        >
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'user',
          element: (
            <ProtectedRoute
              isAuthenticated={userStore.isAuthenticated}
              redirectPath="/auth"
            >
              <UserStocks />
            </ProtectedRoute>
          ),
        },
        {
          path: 'stock/:symbol',
          element: (
            <ProtectedRoute
              isAuthenticated={userStore.isAuthenticated}
              redirectPath="/auth"
            >
              <Stock />
            </ProtectedRoute>
          ),
        },
        {
          path: 'stocks',
          element: (
            <ProtectedRoute
              isAuthenticated={userStore.isAuthenticated}
              redirectPath="/auth"
            >
              <Future />
            </ProtectedRoute>
          ),
        },
        {
          path: 'settings',
          element: (
            <ProtectedRoute
              isAuthenticated={userStore.isAuthenticated}
              redirectPath="/auth"
            >
              <Future />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: 'auth',
      element: (
        <RedirectAuthenticated isAuthenticated={userStore.isAuthenticated}>
          <Auth />
        </RedirectAuthenticated>
      ),
    },
    {
      path: '*',
      element: userStore.isAuthenticated ? (
        <Navigate to="/user" />
      ) : (
        <Navigate to="/auth" />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
});

export default App;
