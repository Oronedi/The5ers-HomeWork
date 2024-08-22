import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
  children: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectPath,
  children,
}) => {
  return isAuthenticated ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
