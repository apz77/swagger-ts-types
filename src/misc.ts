/**
 * Convert number to string with zero-leading padding
 * @param {number} value
 * @param {number} pads
 * @return {string}
 */
export function zeroPadNumber(value: number, pads: number) {
  const s = ('0'.repeat(pads) + String(value));
  return s.substr(s.length - pads);
}
