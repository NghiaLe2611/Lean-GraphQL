import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
	return (
		<Col xs={12} sm={2} md={3} xl={4} className='mb-4'>
			<Link to={`/author/${item.id}`} style={{ textDecoration: 'none' }}>
				<Card border='primary p-2' text='primary' className='text-center shadow'>
					<Card.Body>
						<Card.Title>{item.name}</Card.Title>
						<Card.Text>
							<b>Age</b>: {item.age} <br />
						</Card.Text>
					</Card.Body>
				</Card>
			</Link>
		</Col>
	);
};

export default Item;
