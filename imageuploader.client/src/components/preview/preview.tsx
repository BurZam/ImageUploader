import { MouseEventHandler, useEffect, useState } from 'react';
import Check from '../icons/check';
import './preview.css';
import { getImageName } from '../../utils/imageService';

function Preview() {
	const [image, setImage] = useState('');

	useEffect(() => {
		getImageName().subscribe((name: string) => {
			console.log(name);
			setImage(
				`https://localhost:7276/api/Uploader/GetImage?name=${name}`
			);
		});
	}, []);

	return (
		<div className='preview-container'>
			<div className='check-container'>
				<Check />
			</div>
			<label htmlFor='' className='preview-label'>
				Uploaded Successfully!
			</label>
			{image !== '' ? (
				<img src={image} alt='' className='preview-img' />
			) : null}
			<form action='' className='preview-form'>
				{image !== '' ? (
					<input
						type='text'
						value={image}
						readOnly={true}
						className='input-path'
					/>
				) : null}
				<button
					className='cta-button'
					onClick={(e) => {
						e.preventDefault();
						navigator.clipboard.writeText(image);
					}}
				>
					Copy Link
				</button>
			</form>
		</div>
	);
}

export default Preview;
