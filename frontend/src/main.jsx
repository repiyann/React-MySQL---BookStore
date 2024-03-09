import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import { AiOutlineClose } from 'react-icons/ai'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<SnackbarProvider
			action={(snackbarId) => (
				<button onClick={() => closeSnackbar(snackbarId)}>
					<AiOutlineClose className="text-white cursor-pointer" />
				</button>
			)}
		>
			<App />
		</SnackbarProvider>
	</BrowserRouter>
)
