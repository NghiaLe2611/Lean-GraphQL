import { useQuery } from '@apollo/client';
import { Loader } from 'components/Loadable';
import { getAuthorDetail } from 'graphql-queries/queries';
import { useMemo } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Detail = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(getAuthorDetail, {
		variables: {
			id,
		},
	});

	const detail = useMemo(() => {
		if (data) return data.author;
		return null;
	}, [data]);

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
		<Container className='p-4 my-4 bg-info'>
			<div className='mb-5' style={{ position: 'relative' }}>
				<Link
					to='/'
					style={{
						position: 'absolute',
						left: 0,
						top: '50%',
						transform: 'translateY(-50%)',
					}}>
					<Button variant='secondary'>Back</Button>
				</Link>

				<h1 className='text-center text-light mr-auto'>Author Detail</h1>
			</div>
			{detail ? (
				<Card style={{ maxWidth: '50%', margin: '0 auto' }}>
					<Card.Body>
						<Card.Title>Name: {detail.name}</Card.Title>
						<Card.Text className='mb-1'>
							Age: {detail.age} <br />
							Works: &nbsp;
							{detail.books.length
								? detail.books.map((book, index) => (
										<span key={book.id}>
											{book.name}
											{index !== detail.books.length - 1 ? ', ' : null}
										</span>
								  ))
								: null}
						</Card.Text>
					</Card.Body>
				</Card>
			) : (
				<Card>
					<Card.Body>
						<Card.Text>This book is not exist.</Card.Text>
					</Card.Body>
				</Card>
			)}
		</Container>
	);
};

export default Detail;
