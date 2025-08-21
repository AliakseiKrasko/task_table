import type {Task} from "../types/table.ts";

const   STORAGE_KEY = "tasks"


export const storage = {
    getAllTasks: (): Task[] => {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    },


    addTask(task: Task): void {
        const tasks = storage.getAllTasks()
        tasks.push(task)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    },

    removeTask(id: number): void {
        const tasks = storage.getAllTasks().filter(t => t.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
}