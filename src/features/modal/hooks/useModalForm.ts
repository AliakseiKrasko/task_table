import { useState } from "react";
import type { Task } from "../../../types/table";

export function useModalForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const openModal = (task?: Task) => {
        if (task) {
            setEditingTask(task);
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setEditingTask(null);
        setIsOpen(false);
    };

    return {
        isOpen,
        editingTask,
        openModal,
        closeModal,
        setEditingTask,
    };
}
