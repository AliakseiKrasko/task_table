import type { Task } from '../types/table.ts'

// Ключ, под которым задачи будут храниться в localStorage
const STORAGE_KEY = 'tasks'

// Объект-утилита для работы с localStorage
export const storage = {
  // Получение всех задач
  getAllTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  // Добавление новой задачи
  addTask(task: Task): void {
    const tasks = storage.getAllTasks()
    tasks.push(task)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },

  // Удаление задачи по id
  removeTask(id: number): void {
    const tasks = storage.getAllTasks().filter((t) => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },

  // Обновление существующей задачи
  updateTask(updatedTask: Task) {
    const tasks = storage.getAllTasks()
    const index = tasks.findIndex((t) => t.id === updatedTask.id)
    if (index !== -1) {
      tasks[index] = updatedTask
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  },
}
