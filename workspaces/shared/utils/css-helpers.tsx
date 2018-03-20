export function color (hex: string) {
  const toRGB = (hexColor) => {
    const bigint = parseInt(hexColor, 16)
    // tslint:disable-next-line:no-bitwise
    const r = (bigint >> 16) & 255
    // tslint:disable-next-line:no-bitwise
    const g = (bigint >> 8) & 255
    // tslint:disable-next-line:no-bitwise
    const b = bigint & 255

    return `${r}, ${g}, ${b}`
  }

  const rgb = toRGB(hex.replace('#', ''))

  return {
    rgba: (alpha = 1) => `${rgb}, ${alpha}`,
    rgb,
    hex,
    toString: () => hex,
  }
}

export function spacing (value: number) {
  return {
    xxs: `${value / 8}px`,
    xs: `${value / 4}px`,
    sm: `${value / 2}px`,
    lg: `${value * 1.5}px`,
    xl: `${value * 2}px`,
    xxl: `${value * 4}px`,
    toString: () => `${value}px`,
  }
}
