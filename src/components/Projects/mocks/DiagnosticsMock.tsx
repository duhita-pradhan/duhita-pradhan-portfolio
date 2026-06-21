import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, CreditCard, User, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Option {
  icon: LucideIcon
  label: string
}

interface Step {
  question: string | null
  options: Option[]
  selected: number
  resolved: boolean
  message: string
}

const STEPS: Step[] = [
  {
    question: 'What type of issue are you experiencing?',
    options: [
      { icon: Wifi, label: 'Network / Connectivity' },
      { icon: CreditCard, label: 'Billing / Payments' },
      { icon: User, label: 'Account Access' },
    ],
    selected: 0,
    resolved: false,
    message: '',
  },
  {
    question: 'Is your connection indicator light blinking?',
    options: [
      { icon: CheckCircle2, label: 'Yes, blinking green' },
      { icon: CheckCircle2, label: 'No, solid red' },
      { icon: CheckCircle2, label: 'No light at all' },
    ],
    selected: 1,
    resolved: false,
    message: '',
  },
  {
    question: 'Have you restarted your router in the last 10 minutes?',
    options: [
      { icon: CheckCircle2, label: 'Yes, just did' },
      { icon: CheckCircle2, label: 'Let me try that now' },
    ],
    selected: 0,
    resolved: false,
    message: '',
  },
  {
    question: null,
    options: [],
    selected: 0,
    resolved: true,
    message: 'Issue resolved! Escalation prevented.',
  },
]

export default function DiagnosticsMock() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2300)
    return () => clearInterval(t)
  }, [])

  const current = STEPS[step]

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14]"
      aria-label="Diagnostics as a Service demo"
    >
      <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.08] flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
        <span className="text-white/45 text-[10px] font-mono">Diagnostics as a Service</span>
        <span className="ml-auto text-white/20 text-[10px] font-mono">
          {step + 1}/{STEPS.length}
        </span>
      </div>

      <div className="p-4 min-h-[172px]">
        {/* Progress bar */}
        <div className="flex gap-1 mb-4" role="progressbar" aria-valuenow={step + 1} aria-valuemax={STEPS.length}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded transition-all duration-500 ${
                i <= step ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {current.resolved ? (
            <motion.div
              key="resolved"
              className="flex flex-col items-center justify-center py-6 gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-400" aria-hidden="true" />
              </div>
              <p className="text-green-400 text-xs font-semibold text-center">{current.message}</p>
              <p className="text-white/25 text-[10px] font-mono">escalation_rate -= 1</p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28 }}
            >
              <p className="text-white text-xs font-semibold mb-3">{current.question}</p>
              <div className="space-y-2">
                {current.options.map((opt, i) => {
                  const Icon = opt.icon
                  const isSelected = i === current.selected
                  return (
                    <div
                      key={opt.label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-cyan-500/40 bg-cyan-500/[0.06]'
                          : 'border-white/[0.06] bg-white/[0.015]'
                      }`}
                    >
                      <Icon
                        size={11}
                        className={isSelected ? 'text-cyan-400' : 'text-white/25'}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-[10px] ${isSelected ? 'text-cyan-200' : 'text-white/45'}`}
                      >
                        {opt.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
