import DynamicPageLoader from '@/components/custom/utils/LazyCompoment'
import { Outlet } from "react-router-dom";


const authRoutes = {
    path: '',
    element: <Outlet />,
    children: [
        {
            path: '/register',
            element: <DynamicPageLoader pageKey="auth/Register" />,
        },

        {
            path: '/login',
            element: <DynamicPageLoader pageKey="auth/Login" />,
        },

        {
            path: '/verify-otp',
            element: <DynamicPageLoader pageKey="auth/VerifyOTP" />,
        },

        {
            path: '/forgot-password',
            element: <DynamicPageLoader pageKey="auth/ForgotPassword" />,
        },

        {
            path: '/change-password',
            element: <DynamicPageLoader pageKey="auth/ChangePassword" />,
        }
    ]
}

export default authRoutes;