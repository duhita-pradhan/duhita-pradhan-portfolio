export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
}

export interface SkillItem {
  name: string
  descriptor: string
}

export interface SkillCategory {
  label: string
  skills: SkillItem[]
}
