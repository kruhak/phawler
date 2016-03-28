export function endsWith(srting, suffix) {
  return srting.indexOf(suffix, srting.length - suffix.length) !== -1;
}

export function stringify(variable) {
  return JSON.stringify(variable, null, 4);
}

export function dump(variable) {
  console.log(stringify(variable));
}

export function extractValue(object, key) {
  var keyChain = Array.isArray(key) ? key : key.split('.'),
    objectHasKey = keyChain[0] in object,
    keyHasValue = typeof object[keyChain[0]] !== 'undefined';

  if (objectHasKey && keyHasValue) {
    if (keyChain.length > 1) {
      return extractValue(object[keyChain[0]], keyChain.slice(1));
    }

    return object[keyChain[0]];
  }
  else {
    return {};
  }
}
