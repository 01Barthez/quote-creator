// Implement the useAuthenticator

import useAuth from '@/hooks/use-auth';
import type { IPrivateRouteProps } from '@/interface/interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute : React.FC<IPrivateRouteProps> = ({ children } ) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    navigate('/login ', { replace: true });
    return <></>;
  }

  return <>{ children }</>;
};

export default PrivateRoute