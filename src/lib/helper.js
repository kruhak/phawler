/**
 * Check if string ends with suffix.
 *
 * @param {String} string String what will be checked.
 * @param {String} suffix Suffix for find.
 *
 * @return {boolean}
 */
export function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

/**
 * Stringify variable to JSON.
 *
 * @param {*} variable Any variable.
 */
export function stringify(variable) {
  return JSON.stringify(variable, null, 4);
}

/**
 * Dump variable to terminal.
 *
 * @param {*} variable Any variable.
 */
export function dump(variable) {
  console.log(stringify(variable));
}

/**
 * Extract value from object.
 *
 * @param {Object} object Object what will be used for extract value
 * @param {String} key Key for find.
 *
 * @return {*}
 */
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
