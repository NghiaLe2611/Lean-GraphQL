import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
	return (
		<Col xs={12} sm={2} md={3} xl={4} className='mb-4'>
			<Card border='primary p-2' text='primary' className='text-center shadow'>
				<Card.Body>
					<Card.Title>
						<Link to={`/book/${item.id}`} style={{ textDecoration: 'none' }}>
							{item.name}
						</Link>
					</Card.Title>

					<Card.Text>
						<b>Author</b>:&nbsp;
						<Link to={`/author/${item.author.id}`} style={{ textDecoration: 'none' }}>
							{item.author.name}
						</Link>
						<br />
						<b>Genre</b>: {item.genre}
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Item;
