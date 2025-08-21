import { useSearch } from "./useSearch";
import { useFilteredTasks } from "./useFilteredTasks";
import type { Task } from "../../../types/table";

export function useSearchableTasks(tasks: Task[], debounceMs = 300) {
    const { searchText, inputValue, handleChange } = useSearch(debounceMs);
    const filteredTasks = useFilteredTasks(tasks, searchText);

    return {
        filteredTasks,
        inputValue,
        handleChange,
    };
}
