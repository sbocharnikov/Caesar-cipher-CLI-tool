const { program } = require('commander');

function parseArguments(args) {
  program
    .storeOptionsAsProperties(false)
    .requiredOption('-a, --action <type>', 'action: encode or decode')
    .requiredOption('-s, --shift <number>', 'shift')
    .option('-i, --input <path>', 'input file')
    .option('-o, --output <path>', 'output file');

  const programOpts = program.parse(args).opts();

  if (isNaN(programOpts.shift)) {
    process.stderr.write('Error: Shift should be a number');
    process.exit(1);
  }

  if (programOpts.action !== 'encode' && programOpts.action !== 'decode') {
    process.stderr.write('Error: Action should be encode or decode');
    process.exit(1);
  }
  return programOpts;
}

module.exports.parseArguments = parseArguments;
