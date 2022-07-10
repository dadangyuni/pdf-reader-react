
import React, { useEffect, useRef } from 'react';
import "./index.css";

const App = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
		(async function () {
			// We import this here so that it's only loaded during client-side rendering.
			const pdfJS = await import('pdfjs-dist/build/pdf');
			pdfJS.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js';
			const pdf = await pdfJS.getDocument(`${process.env.PUBLIC_URL}/assets/doc/javascript_tutorial.pdf`).promise;

			const page = await pdf.getPage(1);
			const viewport = page.getViewport({ scale: 1 });

			// Prepare canvas using PDF page dimensions.
			const canvas = canvasRef.current;
			const canvasContext = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			// Render PDF page into canvas context.
			const renderContext = { canvasContext, viewport };
			page.render(renderContext);
		})();
	}, []);

    return <canvas ref={canvasRef} style={{ height: '100vh' }} />
}

export default App