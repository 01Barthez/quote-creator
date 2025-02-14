// Implement the useAuthenticator

// import useAuth from '@/hooks/use-auth';
import type { IPrivateRouteProps } from '@/interface/interface';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute : React.FC<IPrivateRouteProps> = ({ children } ) => {
  // const isAuthenticated = useAuth();
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{ children }</>;
};

export default PrivateRoute;