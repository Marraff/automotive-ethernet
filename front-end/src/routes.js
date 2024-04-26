import { lazy, Suspense } from 'react';
import React from 'react';

const Loadable = Component => props =>
	(
		<Suspense>
			<Component {...props} />
		</Suspense>
	);

const GuestGuard = Loadable(lazy(() => import('./components/guards/GuestGuard')));
const Login = Loadable(lazy(() => import('./pages/authentification/Login')));
const Register = Loadable(lazy(() => import('./pages/authentification/Register')));
const NotFound = Loadable(lazy(() => import('./components/NotFound')));
const AuthGuard = Loadable(lazy(() => import('./components/guards/AuthGuard')));

const DashBoard = Loadable(lazy(() => import('./pages/dashboard/DashBoard')));
const DashBoardLoggedIn = Loadable(lazy(() => import('./pages/dashboard/DashBoardLoggedIn')));
const Admin = Loadable(lazy(() => import('./pages/dashboard/Admin')));
const DashboardLayout = Loadable(lazy(() => import('./components/DashboardLayout')));

const routes = [
	{
		path: '/login',
		children: [
			{
				path: '',
				element: (
					//<GuestGuard>
						<Login />
					//</GuestGuard>
				)
			}
		]
	},
	{
		path: '/register',
		element: (
			//<GuestGuard>
				<Register />
			//</GuestGuard>
		)
	},
	{
		path: '/',
		element: (
			//<GuestGuard>
				<DashBoard />
			//</GuestGuard>
		)
	},
	{
		path: '/DashBoardLoggedIn',
		element: (
			//<AuthGuard>
				<DashBoardLoggedIn />
			//</AuthGuard>
		)
	},
	{
		path: '/Admin',
		element: (
			//<AuthGuard>
				<Admin />
			//</AuthGuard>
		)
	}
];

export default routes;