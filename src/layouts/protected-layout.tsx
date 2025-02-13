import { Outlet, useRouteError, Navigate } from 'react-router';
import NavItems from '../components/buttons/nav-item';
import ErrorPage from '../routes/error-page';

export default function ProtectedLayout() {
  const isAuthenticated = !!localStorage.getItem('authenticatedUser');

  const error = useRouteError();

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex h-screen shadow-lg">
      {/* Sidebar - Always visible */}
      <div className="w-[15%] flex-col rounded-lg bg-homebg p-4 text-sm">
        <NavItems />
      </div>

      <div className="flex-1 p-4">
        {error ? (
          <ErrorPage />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
