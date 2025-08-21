import { useState, useEffect } from 'react'
import { Input } from '../../../shared/ui/Input.tsx'

type Props = {
  value: string
  onChange: (value: string) => void
  delay?: number
}

export default function SearchBar({ value, onChange, delay = 300 }: Props) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue)
    }, delay)

    return () => clearTimeout(handler)
  }, [localValue, onChange, delay])

  return (
    <Input
      placeholder="Поиск..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      style={{ width: 300 }}
    />
  )
}
