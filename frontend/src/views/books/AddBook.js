import { useMutation, useQuery } from '@apollo/client';
import { createBook, getAllAuthors } from 'graphql-queries/queries';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	genre: yup.string().required(),
	authorId: yup.string().notOneOf(['0', 'Author must not be empty']).required(),
});

const AddBook = ({ show, handleClose, handleNewData }) => {
	const { data } = useQuery(getAllAuthors);
	const [createNewBook] = useMutation(createBook);

	const initialValues = {
		name: '',
		genre: '',
		authorId: '0',
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	});

	const { enqueueSnackbar } = useSnackbar();
 
	const onSubmit = async (values) => {
		console.log('Values: ', values);
		try {
			const { data } = await createNewBook({
				variables: {
					name: values.name,
					genre: values.genre,
					authorId: values.authorId,
				},
			});
			const res = data.createBook;
			if (res.id)  {
				handleNewData({
					id: res.id,
					name: res.name,
					genre: res.genre,
					author: res.author
				});
				enqueueSnackbar('Book added successful', { variant: 'success' })
			}
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' })
		}
	};

	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add new book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className='mb-1' controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							className={errors.name ? 'is-invalid' : ''}
							placeholder='Name'
							{...register('name')}
						/>
						{/* {errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>} */}
					</Form.Group>
					<Form.Group className='mb-1' controlId='genre'>
						<Form.Label>Genre</Form.Label>
						<Form.Control
							type='text'
							className={errors.genre ? 'is-invalid' : ''}
							placeholder='Genre'
							{...register('genre')}
						/>
					</Form.Group>
					<Form.Group className='mb-1' controlId='author'>
						<Form.Label>Author</Form.Label>
						<Form.Select
							className={errors.authorId ? 'is-invalid' : ''}
							aria-label='Select author'
							{...register('authorId')}>
							<option value='0'>Select author</option>
							{data && data.authors?.length
								? data.authors.map((author) => (
										<option key={author.id} value={author.id}>
											{author.name}
										</option>
								  ))
								: null}
						</Form.Select>
					</Form.Group>
					<div className='my-3'>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='primary' type='submit' style={{ marginLeft: 10 }}>
							Add
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AddBook;
