import { TasksTable, useTableData } from './features/table'
import { Button } from './shared/ui/Button.tsx'
import ModalForm from './features/modal/components/ModalForm.tsx'
import { useModalForm } from './features/modal/hooks/useModalForm.ts'
import SearchBar from './features/search/components/SearchBar.tsx'
import { useSearchableTasks } from './features/search/hooks/useSearchableTasks.ts'

function App() {
    // Хук для работы с данными таблицы (чтение, добавление, обновление, удаление задач)
  const { tasks, addTask, removeTask, updateTask } = useTableData()
    // Хук для управления состоянием модального окна (открыть/закрыть + редактируемая задача)
  const { isOpen, editingTask, openModal, closeModal } = useModalForm()
    // Хук для поиска по задачам (отслеживает введённый текст и фильтрует задачи)
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
        open={isOpen}  // управляет видимостью модалки
        initialValues={editingTask}  // если передано — редактирование, иначе добавление
        onCancel={closeModal}  // закрытие модалки
        onSubmit={(task) => {  // при сохранении
          editingTask ? updateTask(task) : addTask(task)  // если редактировали → обновляем, иначе добавляем
        }}
      />
    </div>
  )
}

export default App
