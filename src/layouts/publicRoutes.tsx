import { Navigate } from "react-router";

interface publicRouteProps {
  children: React.ReactNode;

}

const PublicRoute: React.FC<publicRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authenticatedUser');

  return isAuthenticated ? <Navigate to='/dashboard' /> : <>{children}</>
}

export default PublicRoute;