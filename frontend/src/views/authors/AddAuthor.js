import { useMutation, useQuery } from '@apollo/client';
import { createAuthor, getAllAuthors } from 'graphql-queries/queries';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	age: yup.number().required(),
});

const AddAuthor = ({ show, handleClose, handleNewData }) => {
	const [createNewAuthor] = useMutation(createAuthor);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema)
	});

	const { enqueueSnackbar } = useSnackbar();
 
	const onSubmit = async (values) => {
		try {
			const { data } = await createNewAuthor({
				variables: {
					name: values.name,
					age: values.age,
				},
			});
			const res = data.createAuthor;
			if (res.id)  {
				handleNewData({
					id: res.id,
					name: res.name,
					age: res.age,
					books: res.books
				});
				enqueueSnackbar('Author added successful', { variant: 'success' })
			}
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' })
		}
	};

	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add new author</Modal.Title>
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
						<Form.Label>Age</Form.Label>
						<Form.Control
							type='text'
							className={errors.genre ? 'is-invalid' : ''}
							placeholder='Age'
							{...register('age')}
						/>
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

export default AddAuthor;
