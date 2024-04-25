// import { GraphQLObjectType, GraphQLString } from 'graphql';
// const UserType = new GraphQLObjectType({
// 	name: 'User',
// 	fields: () => ({
// 		id: { type: GraphQLString },
// 		name: { type: GraphQLString },
// 		age: { type: GraphQLString },
// 		gender: { type: GraphQLString },
// 	}),
// });

import { Types } from 'mongoose';
import Author from '../models/Author';
import Book from '../models/Book';

export const typeDefs = `#graphql
	type Book {
		id: ID
		name: String
		genre: String
		author: Author
	}

	type Author {
		id: ID!
		name: String
		age: Int
		books: [Book]
	}

	# ROOT TYPE
	type Query {
		books: [Book],
		book(id: ID!): Book,
		authors: [Author]
		author(id: ID!): Author
	}

	type Mutation {
		createAuthor(name: String, age: Int): Author
		createBook(name: String, genre: String, authorId: ID!): Book
		editBook(id: ID!, name: String, genre: String, authorId: ID): Book
	}
`;

export const resolvers = {
	// QUERY
	Query: {
		books: async (parent, args, context) => await context.service.getBooks(),
		book: async (parent, { id }, context) => {
			if (!Types.ObjectId.isValid(id)) {
				console.log('ID is not a valid ObjectId');
				return;
			}
			return await context.service.getBookById(id);
		},
		authors: async (parent, args, context) => await context.service.getAuthors(),
		author: async (parent, { id }, context) => {
			if (!Types.ObjectId.isValid(id)) {
				console.log('ID is not a valid ObjectId');
				return;
			}
			return await context.service.getAuthorById(id);
		},
	},
	Book: {
		// Get author of book
		author: async (parent, args, context) => {
			return await context.service.getAuthorById(parent.authorId);
		},
	},
	Author: {
		// List book by author
		books: async (parent, args, context) => {
			const books = await context.service.getBooks();
			return books.filter((book) => book.authorId.toString() === parent.id);
		},
	},

	// MUATATION
	Mutation: {
		createAuthor: async (parent, args) => {
			const existingAuthor = await Author.findOne({ name: args.name });
			if (existingAuthor) {
				throw new Error('Author already exists');
			}

			const newAuthor = new Author(args);
			return await newAuthor.save();
		},
		createBook: async (parent, args) => {
			// Check if a book with the same name already exists
			const existingBook = await Book.findOne({ name: args.name });
			if (existingBook) {
				throw new Error('Book already exists');
			}

			const newBook = new Book(args);
			return await newBook.save();
		},
		editBook: async (parent, args) => {
			// Check author exists
			const existingAuthor = await Author.findOne({ _id: args.authorId });
			if (!existingAuthor) {
				throw new Error('Author does not exist');
			}

			// Find the book to be edited
			const book = await Book.findById(args.id);
			if (!book) {
				throw new Error('Book not found');
			}

			// Check name
			if (book.name !== args.name) {
				// Check if a book with the same name already exists
				const existingBook = await Book.findOne({ name: args.name });
				if (existingBook) {
					throw new Error('Book already exists');
				}
			}

			// Update the book fields
			book.name = args.name;
			book.genre = args.genre;
			book.authorId = args.authorId;

			// Save the updated book
			const updatedBook = await book.save();
			return updatedBook;
		},
	},
};
