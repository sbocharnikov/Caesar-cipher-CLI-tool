const fs = require('fs');
const path = require('path');

function createReadStream(pathToFile) {
  return new Promise((res, rej) => {
    if (pathToFile === undefined) {
      res(process.stdin);
    } else {
      const inputPath = path.resolve(__dirname, pathToFile);
      fs.promises
        .access(inputPath)
        .then(() => res(fs.createReadStream(inputPath)))
        .catch(() => {
          rej('Error: Input file is invalid or not accessible');
        });
    }
  });
}

function createWriteStream(pathToFile) {
  return new Promise((res, rej) => {
    if (pathToFile === undefined) {
      res(process.stdout);
    } else {
      const outputPath = path.resolve(__dirname, pathToFile);
      fs.promises
        .access(outputPath)
        .then(() => res(fs.createWriteStream(outputPath, { flags: 'a' })))
        .catch(() => {
          rej('Error: Output file is invalid or not accessible');
        });
    }
  });
}

module.exports = {
  createReadStream,
  createWriteStream,
};
