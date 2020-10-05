const { program } = require('commander');
const { pipeline } = require('stream');
const { CaesarTransform } = require('./caesar-transform');
const { createReadStream, createWriteStream } = require('./create-stream');
let input;
let output;

program
  .storeOptionsAsProperties(false)
  .requiredOption('-a, --action <type>', 'action: encode or decode')
  .requiredOption('-s, --shift <number>', 'shift')
  .option('-i, --input <path>', 'input file')
  .option('-o, --output <path>', 'output file');

const programOpts = program.parse(process.argv).opts();

if (programOpts.shift < 0 || isNaN(programOpts.shift)) {
  process.stderr.write('Error: Shift should be a positive number');
  process.exit(1);
}

if (programOpts.action !== 'encode' && programOpts.action !== 'decode') {
  process.stderr.write('Error: Action should be encode or decode');
  process.exit(1);
}

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
    if (error) console.log('Error: ', error);
    console.log('Finished successfully');
  });
}
