import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { keyframes, styled } from 'styled-components';

const spin = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
	border: 5px solid #f3f3f3;
	border-top: 5px solid #007bff;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: ${spin} 1s linear infinite;
`;

// export const Loader = () => <LoaderContainer />;
export const Loader = () => <Spinner animation='border' variant='primary' />;
const Loadable = (Component) => (props) =>
	(
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
