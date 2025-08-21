import type { Task } from "../../../types/table";

export function useFilteredTasks(tasks: Task[], searchText: string) {
    if (!searchText) return tasks;

    return tasks.filter((task) =>
        Object.values(task).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );
}