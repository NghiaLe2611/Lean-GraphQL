import Loadable from 'components/Loadable';
import { lazy } from 'react';

const HomePage = Loadable(lazy(() => import('views/home')));
const BookPage = Loadable(lazy(() => import('views/books')));
const AuthorPage = Loadable(lazy(() => import('views/authors')));
const DetailBook = Loadable(lazy(() => import('views/books/detail')));
const DetailAuthor = Loadable(lazy(() => import('views/authors/detail')));

export const routes = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/books',
		element: <BookPage />,
	},
	{
		path: '/book/:id',
		element: <DetailBook />,
	},
	{
		path: '/authors',
		element: <AuthorPage />,
	},
	{
		path: '/author/:id',
		element: <DetailAuthor />,
	},
	// {
	// 	path: '/contact',
	// 	element: <Contact />,
	// 	children: [
	// 		{
	// 			path: '/support',
	// 			element: <Support />,
	// 		},
	// 		{
	// 			path: '/sales',
	// 			element: <Sales />,
	// 		},
	// 	],
	// },
	{
		path: '*',
		element: (
			<div style={{ textAlign: 'center', padding: 20 }}>
				<h2>Page not found</h2>
			</div>
		),
	},
];