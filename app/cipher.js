function cipher(chunk, shift, action) {
  const transform = getCipherFunction(shift, action);
  shift = Math.abs(shift);
  for (let i = 0; i < chunk.length; i++) {
    if (isLowercaseLetter(chunk[i])) {
      chunk[i] = transform(chunk[i], shift, true);
    } else if (isUppercaseLetter(chunk[i])) {
      chunk[i] = transform(chunk[i], shift, false);
    }
  }
}

function getCipherFunction(shift, action) {
  let transform = encode;
  if (action === 'encode' && shift >= 0) {
    transform = encode;
  } else if (action === 'encode' && shift < 0) {
    transform = decode;
  } else if (action === 'decode' && shift >= 0) {
    transform = decode;
  } else if (action === 'decode' && shift < 0) {
    transform = encode;
  }
  return transform;
}

function isUppercaseLetter(char) {
  return char >= 65 && char <= 90;
}

function isLowercaseLetter(char) {
  return char >= 97 && char <= 122;
}

function encode(char, shift, isLowercase) {
  let code;
  if (isLowercase) {
    code = 97;
  } else {
    code = 65;
  }
  return ((char - code + shift) % 26) + code;
}

function decode(char, shift, isLowercase) {
  let code;
  if (isLowercase) {
    code = 122;
  } else {
    code = 90;
  }
  return ((char - code - shift) % 26) + code;
}

module.exports.cipher = cipher;
