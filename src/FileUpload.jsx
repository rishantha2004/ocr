import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [ocrMessage, setOcrMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const textareaRef = useRef(null);

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      alert('Text copied to clipboard!');
    }
  };

    const handleSubmit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('images', file);

        setUploading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/ocr/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            alert('File uploaded successfully');
            setOcrMessage(response.data.data);
            console.log(response.data)
           
            
        } catch (err) {
            setError(true);
            console.log(err)
        } finally {
            setUploading(false);
        }
    };


    return (
        <div>
            <input type='file'accept='images/*' onChange={handleFileChange} name="images" />
            <button onClick={handleSubmit} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {error ? "Error": " "}
           -
            <div className="container" style={{ margin: '20px' }}>
          <textarea
            ref={textareaRef}
            defaultValue= {ocrMessage}
            style={{
              width: '100%',
              height: '150px',
              fontSize: '16px',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={copyToClipboard}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
            }}
          >
            Copy Text
          </button>
        </div>
      </div>
    );
};

export default FileUpload;
