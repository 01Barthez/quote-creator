// import { useEffect, useState } from 'react';
// import { useStore } from '@/store'; 
// import { useCookies } from 'react-cookie';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const user = useStore((state) => state.user);
//   const accessToken = useStore((state) => state.accessToken);
//   const [cookies] = useCookies(['refreshToken']);

//   useEffect(() => {
//     if (accessToken) {
//       setIsAuthenticated(true);
//     } else {
     
//       const refreshToken = cookies.refreshToken;
//       if (refreshToken) {
//         setIsAuthenticated(true);
//       }
//     }
//   }, [accessToken, cookies]);

//   return isAuthenticated;
// };

// export default useAuth;
