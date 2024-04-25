import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AuthorPage from 'views/authors';
import BookPage from 'views/books';

const HomePage = () => {
	const [key, setKey] = useState('books');

	return (
		<Container className='p-4 my-4 bg-light'>
			<h1 className='text-center mb-5 text-primary'>Book Management</h1>
			<Tabs className='mb-3' activeKey={key} onSelect={(k) => setKey(k)}>
				<Tab eventKey='books' title='Book'>
					<BookPage />
				</Tab>
				<Tab eventKey='authors' title='Author'>
					<AuthorPage />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default HomePage;
