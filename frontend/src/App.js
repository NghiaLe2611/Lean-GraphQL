import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'routes';

const App = () => {
	return (
		<SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }} autoHideDuration={2000}>
			<Routes>
				{routes.map((route, index) => (
					<Route key={index} path={route.path} element={route.element}>
						{route.children && (
							<Routes>
								{route.children.map((childRoute, childIndex) => (
									<Route key={childIndex} path={childRoute.path} element={childRoute.element} />
								))}
							</Routes>
						)}
					</Route>
				))}
			</Routes>
		</SnackbarProvider>
	);
};

export default App;
