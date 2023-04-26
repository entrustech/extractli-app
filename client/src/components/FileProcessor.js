import React, { useState } from 'react';
import Dropzone from './Dropzone';
import TextDisplay from './TextDisplay';

const FileProcessor = () => {
  const [text, setText] = useState('');
  const [docInfo, setDocInfo] = useState({ name: '', previewUrl: '', fileType: '' });

  const updateDisplay = (text, name, previewUrl, fileType) => {
    setText(text);
    setDocInfo({ name, previewUrl, fileType });
  };

  return (
    <div>
      <Dropzone updateDisplay={updateDisplay} />
      <TextDisplay text={text} docInfo={docInfo} />
    </div>
  );
};

export default FileProcessor;
