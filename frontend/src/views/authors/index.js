import { useQuery } from '@apollo/client';
import { getAllAuthors } from 'graphql-queries/queries';
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import AddAuthor from './AddAuthor';
import AuthorList from './AuthorList';
import { Link } from 'react-router-dom';

const AuthorPage = () => {
	const { loading, error, data, refetch } = useQuery(getAllAuthors);
	const [authors, setAuthors] = useState([]);
	const [addAuthor, setAddAuthor] = useState(false);

	useEffect(() => {
		if (data && data.authors) {
			setAuthors(data.authors);
		}
	}, [data]);

	const handleAddBook = () => {
		setAddAuthor(true);
	};

	const handleClose = () => {
		setAddAuthor(false);
	};

	const handleNewData = (item) => {
		setAuthors((prevData) => {
			if (prevData) {
				return [
					...prevData,
					{
						id: item.id,
						name: item.name,
						age: item.age,
						books: item.books,
					},
				];
			}
			return null;
		});
		handleClose();
	};

	return (
		<Container className='mt-3'>
			<div className='mb-3' style={{ textAlign: 'right', position: 'relative' }}>
				{/* <Link
					to='/'
					style={{
						position: 'absolute',
						left: 0,
						top: '50%',
						transform: 'translateY(-50%)',
					}}>
					<Button variant='secondary'>Back</Button>
				</Link> */}
				<Button variant='info' onClick={() => refetch()}>
					<i className='bi bi-arrow-clockwise text-white'></i>
				</Button>
				<Button variant='success' onClick={handleAddBook} style={{ marginLeft: 5 }}>
					Add new author
				</Button>
			</div>
			<AuthorList loading={loading} error={error} data={authors} />
			<AddAuthor show={addAuthor} handleClose={handleClose} handleNewData={handleNewData} />
		</Container>
	);
};

export default AuthorPage;
