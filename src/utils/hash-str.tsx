export function hashStr(str: string = '') {
  let hash = 0
  let i
  let chr

  if (str.length === 0) { return hash }

  const res = String(str).repeat(4)

  for (i = 0; i < res.length; i++) {
    chr = res.charCodeAt(i)
    // tslint:disable-next-line:no-bitwise
    hash = (hash << 5) - hash + chr
    // tslint:disable-next-line:no-bitwise
    hash |= 0
  }

  return hash
}
