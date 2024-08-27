import { postFormData } from '@/shared'

export const changePassword = (password: string) =>
  postFormData('change-password', { password })
