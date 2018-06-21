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

  const toHSL = (_r, _g, _b) => {
    const r = _r / 255
    const g = _g / 255
    const b = _b / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = (max + min) / 2
    let s = h
    const l = h

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: break
      }

      h /= 6
    }

    return `${Math.floor(h * 360)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%`
  }

  const rgb = toRGB(hex.replace('#', ''))
  const rgbArr = rgb.split(', ')
  const hsl = toHSL(rgbArr[0], rgbArr[1], rgbArr[2])

  return {
    rgba: (alpha = 1) => `${rgb}, ${alpha}`,
    hsla: (alpha = 1) => `${hsl}, ${alpha}`,
    hsl,
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
