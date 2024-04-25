import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import { MongoService } from './data';

const port = process.env.port || 5000;
const DB_URL = 'mongodb://127.0.0.1:27017/node';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
});

// Connect DB
const connectDB = async () => {
	try {
		await mongoose.connect(DB_URL).then(() => console.log('MongoDB connected!'));
	} catch (err) {
		console.log(err);
	}
};

connectDB();

// @ts-ignore
const { url } = await startStandaloneServer(server, {
	context: () => {
		return {
			service: MongoService,
		};
	},
	// context: async ({ req }) => ({ token: req.headers.token }),
	listen: { port: port },
});

// server.applyMiddleware({ app });
console.log(`🚀 Server ready at ${url}`);
// app.listen(port, () => {
// 	console.log(`Running a GraphQL API server at port ${port}`);
// });
