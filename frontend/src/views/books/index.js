import { Button, Container } from 'react-bootstrap';
import BookList from './BookList';
import { useState, useEffect } from 'react';
import AddBook from './AddBook';
import { useQuery } from '@apollo/client';
import { getAllBooks } from 'graphql-queries/queries';
import { Link } from 'react-router-dom';

const BookPage = () => {
	const { loading, error, data, refetch } = useQuery(getAllBooks);
	const [books, setBooks] = useState([]);
	const [addBook, setAddBook] = useState(false);

	useEffect(() => {
		if (data && data.books) {
			setBooks(data.books);
		}
	}, [data]);

	const handleAddBook = () => {
		setAddBook(true);
	};

	const handleClose = () => {
		setAddBook(false);
	};

	const handleNewData = (item) => {
		setBooks((prevData) => {
			if (prevData) {
				return [
					...prevData,
					{
						id: item.id,
						name: item.name,
						genre: item.genre,
						author: item.author,
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
					Add new book
				</Button>
			</div>
			<BookList loading={loading} error={error} data={books} />
			<AddBook show={addBook} handleClose={handleClose} handleNewData={handleNewData} />
		</Container>
	);
};

export default BookPage;
