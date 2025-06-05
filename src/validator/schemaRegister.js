import * as Yup from 'yup'

export const schemaRegister = Yup.object({
  username: Yup.string().min(6).max(20).required("Email is required"),
  password: Yup.string().min(6).max(20).required("Password is requird"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"),null]).required("Confirm Password is required")
})

export const schemaLogin = Yup.object({
  username: Yup.string().min(6).max(20).required("Email is required"),
  password: Yup.string().min(6).max(20).required("Password is required")
})