import { Parameter } from 'xrpl'
import { iParameterFlag } from './iParameterFlag'
import { iParameterName } from './iParameterName'
import { iParameterType } from './iParameterType'

export class iFunctionParameter {
  flag: iParameterFlag
  name: iParameterName
  type: iParameterType

  constructor(
    flag: iParameterFlag,
    name: iParameterName,
    type: iParameterType
  ) {
    this.flag = flag
    this.name = name
    this.type = type
  }

  fromHex(flag: number, name: string, value: string) {
    this.flag = new iParameterFlag(flag)
    this.name = new iParameterName(name)
    this.type = new iParameterType(value)
  }

  toXrpl(): Parameter {
    return {
      Parameter: {
        ParameterFlag: this.flag.value,
        ParameterName: !this.name.isHex ? this.name.toHex() : this.name.value,
        ParameterType: {
          type: this.type.value,
        },
      },
    } as Parameter
  }
}
