import type { Task } from '../../../types/table.ts'
import { Table } from 'antd'
import { Button } from '../../../shared/ui/Button.tsx'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { ColumnsType } from 'antd/es/table'
import { DATE_FORMAT } from '../../../shared/constants/date.ts'

type Props = {
  data: Task[]
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
}

export default function TasksTable({ data, onDelete, onEdit }: Props) {
  // Конфигурация колонок таблицы
  const columns: ColumnsType<Task> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (date: string) => dayjs(date).format(DATE_FORMAT),
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: 'Действия',
      key: 'actions',
      // кастомный рендер для кнопок действий
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
