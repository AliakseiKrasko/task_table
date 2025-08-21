import {TasksTable, useTableData} from "./features/table";


function App() {
    const { tasks, removeTask } = useTableData();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Таблица задач</h1>
            <TasksTable data={tasks} onDelete={removeTask} />
        </div>
    );
}

export default App;