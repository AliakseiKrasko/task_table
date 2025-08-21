import { TasksTable, useTableData } from './features/table'
import { Button } from './shared/ui/Button.tsx'
import {useState} from "react";
import type {Task} from "./types/table.ts";
import ModalForm from "./features/modal/components/ModalForm.tsx";

function App() {
  const { tasks, addTask, removeTask, updateTask } = useTableData()
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAdd = (task: Task) => {
        addTask(task);
    };

    const handleEdit = (task: Task) => {
        updateTask(task);
    };


    return (
        <div className="p-6">
            <div className="mb-4">
                <Button type="primary" onClick={() => setModalOpen(true)}>
                    Добавить
                </Button>
            </div>

            <TasksTable
                data={tasks}
                onDelete={removeTask}
                onEdit={(task) => {
                    setEditingTask(task);
                    setModalOpen(true);
                }}
            />

            <ModalForm
                open={isModalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                }}
                onSubmit={(task) => {
                    if (editingTask) {
                        handleEdit(task);
                    } else {
                        handleAdd(task);
                    }
                }}
                initialValues={editingTask}
            />
        </div>
    );
}

export default App;