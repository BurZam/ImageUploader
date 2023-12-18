import { DragEvent, useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from '../icons/image';
import './uploader.css';
import { setImageName } from '../../utils/imageService';

function Uploader() {
	const [isDragging, setIsDragging] = useState(false);
	const navigate = useNavigate();
	const inputFileRef = useRef<HTMLInputElement>(null);

	const dragHandler = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const dragEnterHandler = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	};

	const dragLeaveHandler = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const dropHandler = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const file = e.dataTransfer.files.item(0);

		if (file) {
			sendImage(file);
		}

		e.dataTransfer.clearData();
	};

	const onChooseClickHandler = () => {
		inputFileRef.current?.click();
	};

	const onChangeCaptureHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.item(0);

		if (file) {
			sendImage(file);
		}
	};

	const sendImage = (file: File) => {
		axios
			.post(
				'/api/uploader/uploadImage',
				{
					file: file,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then((response) => {
				setImageName(response.data)
				navigate('/loader');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='uploader-container'>
			<div className='header-container'>
				<h1 className='header-title'>Upload your image</h1>
				<p className='header-label'>File should be Jpeg, Png,...</p>
			</div>
			<div className='body-container'>
				<div
					id='drop-container'
					className={
						isDragging
							? 'drop-container drop-container-dragging'
							: 'drop-container'
					}
					draggable={true}
					onDragOver={dragHandler}
					onDragEnter={dragEnterHandler}
					onDragLeave={dragLeaveHandler}
					onDrop={dropHandler}
				>
					<Image />
					<p className='label' draggable={false}>
						Drag & Drop your image here
					</p>
				</div>
				<p className='label'>Or</p>
				<input
					ref={inputFileRef}
					type='file'
					name='file-chooser'
					id='file-chooser'
					style={{ display: 'none' }}
					onChangeCapture={onChangeCaptureHandler}
					accept='.jpg, .jpeg, .png'
					multiple={false}
				/>
				<button
					id='file-chooser-btn'
					className='cta-button'
					onClick={onChooseClickHandler}
				>
					Choose a file
				</button>
			</div>
		</div>
	);
}

export default Uploader;
