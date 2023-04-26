const Tesseract = require('tesseract.js');

async function parseImage(file) {
  try {
    const { data } = await Tesseract.recognize(
      file.buffer,
      'eng',
      { logger: m => console.log(m) }
    );
    return data.text;
  } catch (err) {
    console.error('Error processing image:', err);
    throw err;
  }
}

module.exports = {
  parseImage
};