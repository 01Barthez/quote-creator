import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from '@/layouts/navbar/Navbar'
import Footer from '@/layouts/footer/Footer'
import authRoutes from './routes-config/authRoutes'
import ScrollToTop from '@/components/custom/utils/ScrollToTop'
import DynamicPageLoader from '@/components/custom/utils/LazyCompoment'
import projetRoutes from './routes-projet/projetRoutes'

/**
 * Creates a router with specified routes and elements for each route.
 * @param {Array} routes - An array of route objects containing path and element information.
 * @returns None
 */

const Router = createBrowserRouter([
	{
		path: '',
		element: (
			<>
				<Outlet />

				{/* To scroll to top each time that we change routes */}
				<ScrollToTop />
			</>
		),

		// Page erreur
		errorElement: <DynamicPageLoader pageKey="error/PageError" />,

		children: [
			{
				path: '/',
				element: <>
					<Navbar />
					<div className='py-10 md:py-20'>
						<Outlet />
					</div>
					<Footer />
				</>,
				children: [
					{
						path: '/',
						element: <DynamicPageLoader pageKey="home/Home" />
					},

					// routes projet
					projetRoutes,

					// Authentication routes part
					authRoutes,
				]
			},
		],
	},
])

export default Router
 