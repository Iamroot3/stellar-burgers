import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthStatus } from '../../services/slice/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getUserAuthStatus);

  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (isAuthenticated && onlyUnAuth) {
    const from = location.state?.from?.pathname || '/';
    if (location.pathname !== from) {
      return <Navigate to={from} replace />;
    }
  }

  return children;
};
