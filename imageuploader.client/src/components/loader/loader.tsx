import { useNavigate } from 'react-router-dom';
import './loader.css';

function Loader() {

	const navigate = useNavigate();

	setTimeout(() => {
		navigate('/preview');
	}, 5000)

	return (
		<div className='loader-container'>
			<label className='label-loader'>Uploading...</label>
			<div className='loader'></div>
		</div>
	);
}

export default Loader;
