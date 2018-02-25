export function hashStr(str: string = '') {
  let hash = 0
  let i
  let chr
  if (str.length === 0) { return hash }
  str = String(str).repeat(4)
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    // tslint:disable-next-line:no-bitwise
    hash = (hash << 5) - hash + chr
    // tslint:disable-next-line:no-bitwise
    hash |= 0
  }
  return hash
}
