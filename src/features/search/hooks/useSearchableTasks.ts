import { useState, useMemo } from 'react'
import type { Task } from '../../../types/table'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../../shared/constants/date'

export function useSearchableTasks(tasks: Task[]) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (value: string) => {
    setInputValue(value)
  }

  const filteredTasks = useMemo(() => {
    if (!inputValue) return tasks

    const search = inputValue.toLowerCase()

    return tasks.filter((task) => {
      return (
        task.name.toLowerCase().includes(search) ||
        dayjs(task.date).format(DATE_FORMAT).toLowerCase().includes(search) ||
        String(task.value).includes(search)
      )
    })
  }, [tasks, inputValue])

  return { filteredTasks, inputValue, handleChange }
}
