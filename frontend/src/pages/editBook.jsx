import { useState, useEffect } from 'react'
import BackButton from '../components/backButton'
import Spinner from '../components/spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [publishYear, setPublishYear] = useState('')
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	const navigate = useNavigate()
	useEffect(() => {
		setLoading(true)
		axios
			.get(`http://localhost:8080/books/edit/${id}`)
			.then((response) => {
				setTitle(response.data.book.title)
				setAuthor(response.data.book.author)
				setPublishYear(response.data.book.publishYear)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
				alert('An error happened. Please check console!')
			})
	}, [id])
	const handleEditBook = () => {
		const data = {
			title,
			author,
			publishYear
		}
		setLoading(true)
		axios
			.put(`http://localhost:8080/books/edited/${id}`, data)
			.then(() => {
				setLoading(false)
				navigate('/')
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
				alert('An error happened. Please check console!')
			})
	}

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>
			{loading ? <Spinner /> : ''}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Author</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Publish Year</label>
					<input
						type="number"
						value={publishYear}
						onChange={(e) => setPublishYear(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<button
					className="p-2 bg-sky-300 m-8"
					onClick={handleEditBook}
				>
					Edit
				</button>
			</div>
		</div>
	)
}

export default EditBook
