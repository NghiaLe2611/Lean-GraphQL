import { gql } from '@apollo/client';

const getAllBooks = gql`
	query getAllBooks {
		books {
			id
			name
			genre
			author {
				id
				name
			}
		}
	}
`;

const getAllAuthors = gql`
	query getAllAuthors {
		authors {
			id
			name
			age
			books {
				id
				name
				genre
			}
		}
	}
`;

const getBookDetail = gql`
	query getBookDetailQuery($id: ID!) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
			}
		}
	}
`;

const getAuthorDetail = gql`
	query getAuthorDetailQuery($id: ID!) {
		author(id: $id) {
			id
			name
			age
			books {
				id
				name
			}
		}
	}
`;

const createBook = gql`
	mutation createBookQuery($name: String!, $genre: String!, $authorId: ID!) {
		createBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
			author {
				name
			}
		}
	}
`;

const editBook = gql`
	mutation editBookQuery($id: ID!, $name: String!, $genre: String!, $authorId: ID) {
		editBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
			id
			name
			author {
				name
			}
		}
	}
`;

const createAuthor = gql`
	mutation createAuthorQuery($name: String!, $age: Int!) {
		createAuthor(name: $name, age: $age) {
			id
			name
			age
			books {
				name
			}
		}
	}
`;

export { getBookDetail, getAuthorDetail, getAllBooks, getAllAuthors, createBook, createAuthor, editBook };
