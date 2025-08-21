import { Input as AntdInput } from 'antd'
import type { InputProps as AntdInputProps } from 'antd'

export type InputProps = AntdInputProps

export function Input(props: InputProps) {
  return <AntdInput {...props} />
}
