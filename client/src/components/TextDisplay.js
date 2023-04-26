import React from 'react';
import './TextDisplay.css';

const TextDisplay = ({ text, docInfo }) => {

  return (
    <div className="text-display-container">
    <div className="uploaded-doc-info">
    <h3>Uploaded Document: </h3>{docInfo.name && <h3>{docInfo.name}</h3>}
      {docInfo.previewUrl && (
        <>
          {docInfo.fileType === 'image' && (
            <img src={docInfo.previewUrl} alt="Uploaded document" />
          )}
          {docInfo.fileType === 'pdf' && (
            <embed
              src={docInfo.previewUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
          {docInfo.fileType === 'doc' && (
            <p>Preview not available</p>
          )}
        </>
      )}
    </div>
      <div className="parsed-text">
        <h3>Parsed Text:</h3>
        <pre className='parsed-text-content'>{text}</pre>
      </div>
    </div>
  );
};

export default TextDisplay;
