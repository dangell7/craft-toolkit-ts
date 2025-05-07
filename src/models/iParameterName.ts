import { convertHexToString, convertStringToHex } from 'xrpl'

export class iParameterName {
  value: string
  isHex: boolean

  constructor(value: string, isHex?: boolean) {
    this.value = value
    this.isHex = isHex ? isHex : false
  }

  static fromHex(hexValue: string): iParameterName {
    return new iParameterName(convertHexToString(hexValue))
  }

  toHex(): string {
    return convertStringToHex(this.value)
  }
}
