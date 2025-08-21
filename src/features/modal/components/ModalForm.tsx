import { Form, Input, DatePicker, InputNumber, Modal } from 'antd'
import type { Task } from '../../../types/table'
import { useEffect } from 'react'
import dayjs from "dayjs";

type Props = {
  open: boolean
  onCancel: () => void
  onSubmit: (task: Task) => void
  initialValues?: Task | null
}

export default function ModalForm({ open, onCancel, onSubmit, initialValues }: Props) {
  const [form] = Form.useForm<Task>()

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
      onOk={() => {
        form.validateFields().then((values) => {
          const formattedDate =
              values.date && typeof values.date !== "string"
                  ? values.date.format("YYYY-MM-DD")
                  : values.date;

          const task: Task = {
            id: initialValues?.id ?? Date.now(),
            name: values.name,
            date: formattedDate,
            value: values.value,
          };

          onSubmit(task);
          form.resetFields()
          onCancel();
        });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Выберите дату' }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="value"
          label="Значение"
          rules={[{ required: true, message: 'Введите число' }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
