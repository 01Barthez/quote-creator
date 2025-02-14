import DynamicPageLoader from '@/components/custom/utils/LazyCompoment'
import PrivateRoute from '@/components/custom/utils/PrivateRoute';
import { Outlet } from "react-router-dom";


const projetRoutes = {
    path: '',
    element: <Outlet />,
    children: [
        {
            path: '/new-projet',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/CreateProjet" />
                </PrivateRoute>
        },

        {
            path: '/details-projet/:slug',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/DetailProjet" />
                </PrivateRoute>
        },

        {
            path: '/validate-projet/:slug',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/ValidateProjet" />
                </PrivateRoute>
        },

        {
            path: '/dashboard-projet/:slug',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/DashboardProjet" />
                </PrivateRoute>
        },
    ]
}

export default projetRoutes;