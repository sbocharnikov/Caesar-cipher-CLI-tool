function cipher(chunk, shift, action) {
  const transform = action === 'decode' ? decode : encode;
  for (let i = 0; i < chunk.length; i++) {
    if (isLowercaseLetter(chunk[i])) {
      chunk[i] = transform(chunk[i], shift, true);
    } else if (isUppercaseLetter(chunk[i])) {
      chunk[i] = transform(chunk[i], shift, false);
    }
  }
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
