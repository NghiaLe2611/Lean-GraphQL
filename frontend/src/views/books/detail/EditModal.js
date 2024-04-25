import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { editBook, getAllAuthors, getAllBooks, getBookDetail } from 'graphql-queries/queries';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	genre: yup.string().required(),
	authorId: yup.string().notOneOf(['0', 'Author must not be empty']).required(),
});

const EditModal = ({ open, handleClose, item }) => {
	const { data } = useQuery(getAllAuthors);
	const [editBookQuery] = useMutation(editBook, {
		refetchQueries: [{ query: getAllBooks }, { query: getBookDetail, variables: { id: item.id } }],
	});
	const initialValues = useMemo(() => {
		if (item) {
			return {
				name: item.name,
				genre: item.genre,
				authorId: item.author.id,
			};
		}

		return {
			name: '',
			genre: '',
			authorId: '0',
		};
	}, [item]);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
	});

	const { enqueueSnackbar } = useSnackbar();

	const onSubmit = async (values) => {
		// return;
		try {
			const { data } = await editBookQuery({
				variables: {
					id: item.id,
					name: values.name,
					genre: values.genre,
					authorId: values.authorId,
				},
			});
			if (data.editBook)  {
				enqueueSnackbar('Edit book successful', { variant: 'success' });
                handleClose();
			}
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
		}
	};

	if (!item) {
		return null;
	}

	return (
		<Modal show={open} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Edit book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className='mb-1' controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control {...register('name')} type='text' className={errors.name ? 'is-invalid' : ''} />
					</Form.Group>
					<Form.Group className='mb-1' controlId='genre'>
						<Form.Label>Genre</Form.Label>
						<Form.Control {...register('genre')} type='text' className={errors.genre ? 'is-invalid' : ''} />
					</Form.Group>
					<Form.Group className='mb-1' controlId='author'>
						<Form.Label>Author</Form.Label>
						<Form.Select
							{...register('authorId')}
							value={watch('authorId')}
							onChange={(e) => {
								setValue('authorId', e.target.value);
							}}
							className={errors.authorId ? 'is-invalid' : ''}
							aria-label='Select author'>
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
							Update
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditModal;
