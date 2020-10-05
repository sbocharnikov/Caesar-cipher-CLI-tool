const { parseArguments } = require('./parse-args');
const { pipeline } = require('stream');
const { CaesarTransform } = require('./caesar-transform');
const { createReadStream, createWriteStream } = require('./create-stream');
let input;
let output;

const programOpts = parseArguments(process.argv);

const caesarTransform = new CaesarTransform(
  programOpts.shift,
  programOpts.action
);

createReadStream(programOpts.input)
  .then((readStream) => {
    input = readStream;
    return createWriteStream(programOpts.output);
  })
  .then((writeStream) => {
    output = writeStream;
    createPipeline();
  })
  .catch((err) => {
    process.stderr.write(err);
    process.exit(1);
  });

function createPipeline() {
  pipeline(input, caesarTransform, output, (error) => {
    if (error) process.stderr.write(`Error: ${error}`);
    process.stdout.write('Finished successfully');
  });
}
