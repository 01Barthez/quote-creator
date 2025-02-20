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
            path: '/details-projet',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/DetailProjet" />
                </PrivateRoute>
        },

        {
            path: '/validate-projet',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/ValidateProjet" />
                </PrivateRoute>
        },

        {
            path: '/success-creation-projet',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/SuccessCreationProjet" />
                </PrivateRoute>
        },
        
        {
            path: '/dashboard-projet',
            element:
                <PrivateRoute>
                    <DynamicPageLoader pageKey="projet/DashboardProjet" />
                </PrivateRoute>
        },
    ]
}

export default projetRoutes;