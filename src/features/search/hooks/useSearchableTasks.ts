import {useState, useMemo} from 'react'
import type {Task} from '../../../types/table'
import dayjs from 'dayjs'
import {DATE_FORMAT} from '../../../shared/constants/date'

// Хук для поиска по задачам
export function useSearchableTasks(tasks: Task[]) {
    // локальное состояние для текста поиска
    const [inputValue, setInputValue] = useState('')

    // обработчик изменения значения поиска
    const handleChange = (value: string) => {
        setInputValue(value)
    }

    // Мемоизированный список задач, отфильтрованных по поисковому запросу
    const filteredTasks = useMemo(() => {
        // если строка поиска пустая → возвращаем все задачи
        if (!inputValue) return tasks

        // приводим строку поиска к нижнему регистру для нечувствительности к регистру
        const search = inputValue.toLowerCase()

        // фильтруем задачи
        return tasks.filter((task) => {
            return (
                // проверка по имени
                task.name.toLowerCase().includes(search) ||
                // проверка по дате (форматируем дату и ищем в строке)
                dayjs(task.date).format(DATE_FORMAT).toLowerCase().includes(search) ||
                // проверка по числовому значению (приводим к строке)
                String(task.value).includes(search)
            )
        })
    }, [tasks, inputValue]) // пересчёт фильтрации только при изменении tasks или inputValue

    // возвращаем готовые данные и обработчик для использования в компоненте
    return {filteredTasks, inputValue, handleChange}
}
