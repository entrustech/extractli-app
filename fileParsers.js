const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const textract = require("textract");
const fs = require("fs");

async function parseImage(file) {
  try {
    const { data } = await Tesseract.recognize(file.buffer, "eng");
    return data.text;
  } catch (err) {
    console.error("Error processing image:", err);
    throw err;
  }
}

async function parsePdf(file) {
  try {
    const data = await pdfParse(file.buffer);
    return data.text;
  } catch (err) {
    console.error("Error processing PDF:", err);
    throw err;
  }
}

async function parseWord(file, isDocx) {
  try {
    if (isDocx) {
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return value;
    } else {
      const tmpFilePath = "temp.doc";
      await fs.promises.writeFile(tmpFilePath, file.buffer);

      const textractOptions = {
        preserveLineBreaks: true,
        preserveOnlyMultipleLineBreaks: false,
      };

      return new Promise((resolve, reject) => {
        textract.fromFileWithPath(tmpFilePath, textractOptions, (err, text) => {
          fs.promises.unlink(tmpFilePath);
          if (err) {
            reject(err);
          } else {
            resolve(text);
          }
        });
      });
    }
  } catch (err) {
    console.error("Error processing Word document:", err);
    throw err;
  }
}

module.exports = {
  parseImage,
  parsePdf,
  parseWord,
};
