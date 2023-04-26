const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { parseImage, parsePdf, parseWord } = require('./fileParsers');

const app = express();
app.use(cors());

app.post('/upload/image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const text = await parseImage(file);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while processing the file' });
  }
});

app.post('/upload/pdf', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const text = await parsePdf(file);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while processing the file' });
  }
});

app.post('/upload/word', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const isDocx = file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const text = await parseWord(file, isDocx);
      res.json({ text });
    } catch (err) {
      console.error('Error occurred while processing the file:', err);
      res.status(500).json({ error: 'An error occurred while processing the file', details: err.message });
    }
  });
 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
