import React, { Profiler } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Uploader from './components/uploader/uploader';
import Loader from './components/loader/loader';
import Preview from './components/preview/preview';

const rootElement = document.getElementById('root')!;
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Profiler
				id='App'
				onRender={(id, phase) => {
					console.log('🚀 ~ App ~ phase:', phase);
					console.log('🚀 ~ App ~ id:', id);
				}}
			>
				<Uploader />
			</Profiler>
		),
	},
	{
		path: '/loader',
		element: (
			<Profiler
				id='loader'
				onRender={(id, phase) => {
					console.log('🚀 ~ loader ~ phase:', phase);
					console.log('🚀 ~ loader ~ id:', id);
				}}
			>
				<Loader />
			</Profiler>
		),
	},
	{
		path: '/preview',
		element: (
			<Profiler
				id='preview'
				onRender={(id, phase) => {
					console.log('🚀 ~ preview ~ phase:', phase);
					console.log('🚀 ~ preview ~ id:', id);
				}}
			>
				<Preview />
			</Profiler>
		),
	}
]);

createRoot(rootElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
