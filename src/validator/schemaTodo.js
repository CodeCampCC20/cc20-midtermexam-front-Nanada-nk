import * as Yup from 'yup'

export const schemaTodo = Yup.object({
  taskName: Yup.string().min(3).max(100).required("New task is required!!")
})