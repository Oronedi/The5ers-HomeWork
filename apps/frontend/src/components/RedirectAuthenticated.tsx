import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface RedirectAuthenticatedProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const RedirectAuthenticated: FC<RedirectAuthenticatedProps> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default RedirectAuthenticated;
