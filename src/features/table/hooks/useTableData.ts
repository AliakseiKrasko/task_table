import { useEffect, useState } from 'react'
import type { Task } from '../../../types/table.ts'
import { storage } from '../../../services/storage.ts'

// Кастомный хук для работы с данными таблицы
export function useTableData() {
  // Локальное состояние для хранения списка задач
  const [tasks, setTasks] = useState<Task[]>([])

  // Загружаем все задачи из storage при первом рендере
  useEffect(() => {
    setTasks(storage.getAllTasks())
  }, [])

  // Добавление новой задачи
  const addTask = (task: Task) => {
    storage.addTask(task)
    setTasks(storage.getAllTasks())
  }

  // Удаление задачи по id
  const removeTask = (id: number) => {
    storage.removeTask(id)
    setTasks(storage.getAllTasks())
  }

  // Обновление задачи (например, при редактировании)
  const updateTask = (task: Task) => {
    storage.updateTask(task)
    setTasks(storage.getAllTasks())
  }

  // Возвращаем наружу список задач и методы для работы с ними
  return { tasks, setTasks, addTask, removeTask, updateTask }
}
