import { useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
	let showTheRingIntervalId: number;
	const [file, setFile] = useState<File | null>(null);
	const [showTheRing, setShowTheRing] = useState(true);

	useEffect(() => {
		showTheRingIntervalId = setInterval(() => {
			setShowTheRing((prevValue) => !prevValue);
		}, 5000);

		return () => clearInterval(showTheRingIntervalId);
	}, []);

	const renderTheRing = useMemo(() => {
		return (
			showTheRing && (
				<div className="animation-container">
					<div className="logo-container">
						<a>
							<img
								src="gold-ring.png"
								className="logo"
								width="75px"
								height="75px"
							/>
						</a>
					</div>
					<div className="animation-container-text">Сохранение..</div>
				</div>
			)
		);
	}, [showTheRing]);

	const onHandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const onHandleUpload = async () => {
		if (file) {
			console.log('Uploading file...');

			const formData = new FormData();
			formData.append('formFile', file);

			try {
				const result = await fetch('http://localhost:5299/main', {
					method: 'POST',
					body: formData,
				});

				const data = await result.json();

				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<>
			{renderTheRing}
			<div className="card">
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<label htmlFor="file" className="sr-only">
						Choose a file
					</label>
					<input id="file" type="file" onChange={onHandleFileChange} />
				</div>
				<div>
					{file && (
						<div style={{ textAlign: 'left' }}>
							File details:
							<ul>
								<li>Name: {file.name}</li>
								<li>Type: {file.type}</li>
								<li>Size: {file.size} bytes</li>
							</ul>
						</div>
					)}

					{file && <button onClick={onHandleUpload}>Upload a file</button>}
				</div>
			</div>
		</>
	);
}

export default App;
