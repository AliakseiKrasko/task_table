import { Form, Input, DatePicker, InputNumber, Modal } from 'antd'
import type { Task } from '../../../types/table'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../../shared/constants/date.ts'

type Props = {
    open: boolean                 // состояние открытия/закрытия модального окна
    onCancel: () => void          // обработчик закрытия модалки
    onSubmit: (task: Task) => void // обработчик сохранения задачи
    initialValues?: Task | null   // начальные значения для редактирования (если есть)
}

export default function ModalForm({ open, onCancel, onSubmit, initialValues }: Props) {
  const [form] = Form.useForm<Task>()  // экземпляр формы Ant Design


    // При открытии модалки:
    // - если есть initialValues → заполнить поля (режим редактирования)
    // - если нет → сбросить форму (режим добавления новой задачи)
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : undefined,
      })
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  return (
    <Modal
      open={open}
      title={initialValues ? 'Редактировать задачу' : 'Добавить задачу'}
      okText={initialValues ? 'Сохранить' : 'Добавить'}
      cancelText="Отмена"
      onCancel={onCancel}
        // Сохранение
      onOk={() => {
        form.validateFields().then((values) => {
          const formattedDate =
            values.date && typeof values.date !== 'string'
              ? values.date.format(DATE_FORMAT)
              : values.date

          const task: Task = {
            id: initialValues?.id ?? Date.now(),
            name: values.name,
            date: formattedDate,
            value: values.value,
          }

          onSubmit(task)
          form.resetFields()
          onCancel()
        })
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            { required: true, message: 'Введите имя' },
            { min: 2, message: 'Имя должно содержать минимум 2 символа' },
          ]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Выберите дату' }]}>
          <DatePicker format={DATE_FORMAT} />
        </Form.Item>

        <Form.Item
          name="value"
          label="Значение"
          rules={[
            { required: true, message: 'Введите число' },
            { type: 'number', min: 1, message: 'Значение должно быть больше 0' },
          ]}
        >
          <InputNumber className="w-full" placeholder="Введите число" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
