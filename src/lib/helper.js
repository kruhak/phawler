export function endsWith(srting, suffix) {
  return srting.indexOf(suffix, srting.length - suffix.length) !== -1;
}