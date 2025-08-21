import {useEffect, useState} from "react";
import type {Task} from "../../../types/table.ts";
import {storage} from "../../../services/storage.ts";

export function useTableData() {
    const [tasks, setTasks] = useState<Task[]>([])


    useEffect(() => {
        setTasks(storage.getAllTasks())
    }, [])

    const addTask = (task: Task) => {
        storage.addTask(task)
        setTasks(storage.getAllTasks())
    }


    const removeTask = (id: number) => {
        storage.removeTask(id)
        setTasks(storage.getAllTasks())
    }

    return {tasks, setTasks, addTask, removeTask}


}