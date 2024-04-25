import { Loader } from 'components/Loadable';
import { Row } from 'react-bootstrap';
import Item from './Item';
import { memo } from 'react';

const BookList = ({ loading, error, data }) => {
	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
				<Loader />
			</div>
		);
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<Row>
			{data && data.length ? (
				data.map((item) => <Item item={item} key={item.id} />)
			) : (
				<div>There is no book now</div>
			)}
		</Row>
	);
};

export default memo(BookList);
