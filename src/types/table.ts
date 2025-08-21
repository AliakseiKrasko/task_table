import type {Dayjs} from "dayjs";

export type Task = {
  id: number
  name: string
  date: string | Dayjs
  value: number
}
