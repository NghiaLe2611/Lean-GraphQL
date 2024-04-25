import { useQuery } from '@apollo/client';
import { Loader } from 'components/Loadable';
import { getBookDetail } from 'graphql-queries/queries';
import { useMemo, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import EditModal from './EditModal';

const Detail = () => {
	const { id } = useParams();
	const [isEdit, setIsEdit] = useState(false);
	const { loading, error, data } = useQuery(getBookDetail, {
		variables: {
			id,
		},
	});
	const detail = useMemo(() => {
		if (data) return data.book;
		return null;
	}, [data]);

	const handleEdit = (status) => {
		setIsEdit(status);
	};

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

				<h1 className='text-center text-light mr-auto'>Book Detail</h1>
			</div>
			{detail ? (
				<>
					<Card style={{ maxWidth: '50%', margin: '0 auto' }}>
						<Card.Body>
							<Card.Title>Name: {detail.name}</Card.Title>
							<Card.Text>
								Author: {detail.author.name} <br />
								Genre: {detail.genre}
							</Card.Text>
							<Card.Text>
								<Button variant='info' className='text-white' onClick={() => handleEdit(true)}>
									Edit
								</Button>
							</Card.Text>
						</Card.Body>
					</Card>
					{isEdit ? <EditModal open={isEdit} handleClose={() => handleEdit(false)} item={detail} /> : null}
				</>
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
