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

const routes = [
	{
		path: '/login',
		children: [
			{
				path: '',
				element: (
					<GuestGuard>
						<Login />
					</GuestGuard>
				)
			}
		]
	},
	{
		path: '/register',
		element: (
			<GuestGuard>
				<Register />
			</GuestGuard>
		)
	}
];

export default routes;