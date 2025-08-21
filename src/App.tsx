import { TasksTable, useTableData } from './features/table'
import { Button } from './shared/ui/Button.tsx'
import ModalForm from './features/modal/components/ModalForm.tsx'
import { useModalForm } from './features/modal/hooks/useModalForm.ts'
import SearchBar from './features/search/components/SearchBar.tsx'
import { useSearchableTasks } from './features/search/hooks/useSearchableTasks.ts'

function App() {
  const { tasks, addTask, removeTask, updateTask } = useTableData()
  const { isOpen, editingTask, openModal, closeModal } = useModalForm()
  const { filteredTasks, inputValue, handleChange } = useSearchableTasks(tasks)

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4">
        <Button type="primary" onClick={() => openModal()}>
          Добавить
        </Button>
        <SearchBar value={inputValue} onChange={handleChange} />
      </div>

      <TasksTable data={filteredTasks} onDelete={removeTask} onEdit={openModal} />

      <ModalForm
        open={isOpen}
        initialValues={editingTask}
        onCancel={closeModal}
        onSubmit={(task) => {
          editingTask ? updateTask(task) : addTask(task)
        }}
      />
    </div>
  )
}

export default App
