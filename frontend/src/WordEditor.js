import React, { useRef } from 'react';
import Quill from 'quill';
import * as mammoth from 'mammoth';

const WordEditor = () => {
	const editorRef = useRef(null);

	// Initialize Quill editor
	React.useEffect(() => {
		const quill = new Quill(editorRef.current);

		// Load DOCX file content
		const loadDocxContent = async (file) => {
			const result = await mammoth.extractRawText({ arrayBuffer: file });
			quill.clipboard.dangerouslyPasteHTML(result.value);
		};

		// Handle file upload
		const handleFileUpload = (e) => {
			const file = e.target.files[0];

			if (file) {
				const reader = new FileReader();
				reader.onload = (event) => {
					const arrayBuffer = event.target.result;
					loadDocxContent(arrayBuffer);
				};
				reader.readAsArrayBuffer(file);
			}
		};

		// Handle save
		const handleSave = async () => {
			const content = quill.root.innerHTML;
			const result = await mammoth.convertToBuffer(content, { styleMap: [] });
			const blob = new Blob([result], {
				type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			});
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'new_document.docx';
			link.click();
		};

		// Attach event listeners
		const fileInput = document.getElementById('file-input');
		fileInput.addEventListener('change', handleFileUpload);
		const saveButton = document.getElementById('save-button');
		saveButton.addEventListener('click', handleSave);

		return () => {
			// Clean up event listeners
			fileInput.removeEventListener('change', handleFileUpload);
			saveButton.removeEventListener('click', handleSave);
		};
	}, []);

	return (
		<div>
			<input type='file' id='file-input' />
			<div ref={editorRef} />
			<button id='save-button'>Save</button>
		</div>
	);
};

export default WordEditor;
