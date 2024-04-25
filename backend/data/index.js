// export const books = [
// 	{
// 		id: 1,
// 		name: 'Tat den',
// 		genre: 'Truyen ngan',
// 		authorId: 1
// 	},
// 	{
// 		id: 2,
// 		name: 'Chi Pheo',
// 		genre: 'Truyen ngan',
// 		authorId: 2
// 	},
//     {
// 		id: 3,
// 		name: 'Voi Vang',
// 		genre: 'Tho',
// 		authorId: 3
// 	},
// 	{
// 		id: 4,
// 		name: 'Song mon',
// 		genre: 'Truyen ngan',
// 		authorId: 2
// 	},
// ];

// export const authors = [
// 	{
// 		id: 1,
// 		name: 'Ngo Tat To',
// 		age: '50',
// 	},
// 	{
// 		id: 2,
// 		name: 'Nam Cao',
// 		genre: '43',
// 	},
// 	{
// 		id: 3,
// 		name: 'Xuan Dieu',
// 		genre: '66',
// 	},
// ];

import Book from '../models/Book';
import Author from '../models/Author';

export const MongoService = {
	getBooks: async () => await Book.find(),
	getBookById: async (id) => await Book.findById(id),
	getAuthors: async () => await Author.find(),
	getAuthorById: async (id) => await Author.findById(id),
	createAuthor: async (args) => {
		const newAuthor = new Author(args);
		return await newAuthor.save();
	},
	createBook: async (args) => {
		const newBook = new Book(args);
		return await newBook.save();
	},
};