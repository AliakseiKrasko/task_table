import { useState } from 'react'
import type { Task } from '../../../types/table'

// Хук для управления состоянием модального окна с формой
export function useModalForm() {
  // Состояние: открыто ли модальное окно
  const [isOpen, setIsOpen] = useState(false)
  // Состояние: редактируемая задача (null — если создаём новую)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Открыть модалку (если передана задача — включить режим редактирования)
  const openModal = (task?: Task) => {
    if (task) {
      setEditingTask(task)
    }
    setIsOpen(true)
  }

  // Закрыть модалку и сбросить редактируемую задачу
  const closeModal = () => {
    setEditingTask(null)
    setIsOpen(false)
  }

  // Возврат данных и методов для использования в компоненте
  return {
    isOpen,        // состояние открытия модалки
    editingTask,   // текущая редактируемая задача
    openModal,     // функция открытия
    closeModal,    // функция закрытия
    setEditingTask // возможность вручную менять редактируемую задачу
  }
}
