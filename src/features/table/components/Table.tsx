import type {Task} from '../../../types/table.ts'
import {Table} from 'antd'
import {Button} from "../../../shared/ui/Button.tsx";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

type Props = {
  data: Task[]
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
}

export default function TasksTable({ data, onDelete, onEdit }: Props) {
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: Task) => (
          <div className="flex gap-2">
              <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
              <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
          </div>
      ),
    },
  ]

  return <Table rowKey="id" dataSource={data} columns={columns} pagination={false} />
}
