import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import clsx from 'clsx'
import type { Toast, ToastType } from '../../types'

function genId() {
  return Math.random().toString(36).slice(2, 9)
}

const CONFIG = {
  success: {
    Icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/[0.08]',
    border: 'border-emerald-500/25',
    bar: 'bg-emerald-500',
    label: 'Success',
  },
  error: {
    Icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/[0.08]',
    border: 'border-red-500/25',
    bar: 'bg-red-500',
    label: 'Error',
  },
  warning: {
    Icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/[0.08]',
    border: 'border-amber-500/25',
    bar: 'bg-amber-400',
    label: 'Warning',
  },
  info: {
    Icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.08]',
    border: 'border-blue-500/25',
    bar: 'bg-blue-400',
    label: 'Info',
  },
} as const

const MESSAGES: Record<ToastType, string> = {
  success: 'Component published to Bit Cloud successfully.',
  error: 'Build failed: TypeScript strict mode violation in Button.tsx.',
  warning: 'Bundle size exceeds recommended 250 KB threshold.',
  info: 'New version of design tokens available, v2.4.1.',
}

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const cfg = CONFIG[toast.type]
  const { Icon } = cfg
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.max(0, 100 - (elapsed / toast.duration) * 100)
      setProgress(pct)
      if (pct === 0) {
        clearInterval(tick)
        onDismiss(toast.id)
      }
    }, 32)
    return () => clearInterval(tick)
  }, [toast.id, toast.duration, onDismiss])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 56, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 56, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className={clsx('relative rounded-xl border overflow-hidden', cfg.bg, cfg.border)}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3 p-3.5 pr-10">
        <Icon size={15} className={clsx('mt-0.5 flex-shrink-0', cfg.color)} aria-hidden="true" />
        <div>
          <p className={clsx('text-xs font-semibold mb-0.5', cfg.color)}>{cfg.label}</p>
          <p className="text-white/65 text-xs leading-relaxed">{toast.message}</p>
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="absolute top-3 right-3 text-white/25 hover:text-white/60 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={13} aria-hidden="true" />
      </button>
      <div className="h-[2px] w-full bg-white/[0.04]">
        <div
          className={clsx('h-full transition-none', cfg.bar)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}

const TOAST_TYPES: ToastType[] = ['success', 'error', 'warning', 'info']

export default function ToastDemo() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const fire = (type: ToastType) => {
    if (toasts.length >= 5) return
    setToasts((prev) => [
      ...prev,
      { id: genId(), type, message: MESSAGES[type], duration: 4000 },
    ])
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Trigger buttons */}
      <div className="glass rounded-xl p-6 flex flex-col gap-5">
        <p className="text-white/45 text-sm leading-relaxed">
          Click a button to fire a notification. Toasts slide in, show a progress bar, and
          auto-dismiss after 4s.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TOAST_TYPES.map((type) => {
            const cfg = CONFIG[type]
            return (
              <button
                key={type}
                onClick={() => fire(type)}
                className={clsx(
                  'py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all duration-150 hover:opacity-80',
                  cfg.bg,
                  cfg.border,
                  cfg.color,
                )}
              >
                {cfg.label}
              </button>
            )
          })}
        </div>
        <p className="text-white/20 text-[11px] font-mono">
          max 5 · 4s auto-dismiss · progress bar · stackable
        </p>
      </div>

      {/* Toast stack */}
      <div className="flex flex-col gap-2 min-h-[200px]" aria-label="Notification stack">
        <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-1">
          Notification stack
        </p>
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
        {toasts.length === 0 && (
          <div className="flex-1 flex items-center justify-center rounded-xl border border-dashed border-white/[0.07] text-white/20 text-sm">
            No active notifications
          </div>
        )}
      </div>
    </div>
  )
}
