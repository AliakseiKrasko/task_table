import type {Task} from "../../../types/table.ts";
import {Table} from "antd";


type Props = {
    data: Task[]
    onDelete: (id: number) => void
}

export default function TasksTable({ data, onDelete }: Props) {
    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Значение",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: unknown, record: Task) => (
                <button
                    onClick={() => onDelete(record.id)}
                    className="text-red-500 hover:underline"
                >
                    Удалить
                </button>
            ),
        },
    ];

    return <Table rowKey="id" dataSource={data} columns={columns} pagination={false} />;
}