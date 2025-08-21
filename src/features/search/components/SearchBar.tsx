import { useState, useEffect } from 'react'
import { Input } from '../../../shared/ui/Input.tsx'

type Props = {
  value: string
  onChange: (value: string) => void
  delay?: number
}

// Компонент строки поиска с "debounce" (задержкой перед вызовом onChange)
export default function SearchBar({ value, onChange, delay = 300 }: Props) {
  // Локальное состояние для ввода текста
  const [localValue, setLocalValue] = useState(value)

  // Эффект: задержка перед вызовом onChange (debounce)
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue)
    }, delay)

    // Очистка таймера при изменении текста или размонтировании
    return () => clearTimeout(handler)
  }, [localValue, onChange, delay])


  return (
    <Input
      placeholder="Поиск..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)} // обновляем локальное состояние
      style={{ width: 300 }}
    />
  )
}
