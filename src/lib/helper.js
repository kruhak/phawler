export function endsWith(srting, suffix) {
  return srting.indexOf(suffix, srting.length - suffix.length) !== -1;
}

export function dump(variable) {
  return JSON.stringify(variable, null, 4);
}