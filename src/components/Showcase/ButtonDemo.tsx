import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowRight, Trash2, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

interface DemoState {
  variant: Variant
  size: Size
  loading: boolean
  disabled: boolean
  iconLeft: boolean
  iconRight: boolean
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-violet-600 hover:bg-violet-500 text-white border border-violet-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]',
  secondary: 'bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.12]',
  ghost: 'bg-transparent hover:bg-white/[0.05] text-white/70 hover:text-white border border-transparent',
  destructive: 'bg-red-600/80 hover:bg-red-500 text-white border border-red-500/80',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2 gap-2',
  lg: 'text-base px-6 py-3 gap-2.5',
}

const ICON_SIZE: Record<Size, number> = { sm: 12, md: 14, lg: 16 }

function DemoButton(props: DemoState & { label: string }) {
  const { variant, size, loading, disabled, iconLeft, iconRight, label } = props
  const Icon = variant === 'destructive' ? Trash2 : ArrowRight
  const sz = ICON_SIZE[size]

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
      )}
      disabled={disabled}
      aria-busy={loading}
    >
      {loading ? (
        <Loader2 size={sz} className="animate-spin" aria-hidden="true" />
      ) : iconLeft ? (
        <Icon size={sz} aria-hidden="true" />
      ) : null}
      {label}
      {!loading && iconRight && <ChevronRight size={sz} aria-hidden="true" />}
    </button>
  )
}

function tokenize(code: string) {
  // Very minimal JSX token highlighter for the specific code we generate
  return code
    .replace(/&lt;(\/?[\w]+)&gt;/g, '<span style="color:#A78BFA">&lt;$1&gt;</span>')
    .replace(/&lt;(\/?[\w]+)\s/g, '<span style="color:#A78BFA">&lt;$1</span> ')
    .replace(/(\w+)=/g, '<span style="color:#34D399">$1</span>=')
    .replace(/"([^"]*)"/g, '"<span style="color:#FCD34D">$1</span>"')
    .replace(/\{([^}]+)\}/g, '{<span style="color:#67E8F9">$1</span>}')
}

function buildCode(s: DemoState): string {
  const lines = ['<Button', `  variant="${s.variant}"`, `  size="${s.size}"`]
  if (s.loading) lines.push('  loading={true}')
  if (s.disabled) lines.push('  disabled')
  if (s.iconLeft) lines.push('  iconLeft={<ArrowRight />}')
  if (s.iconRight) lines.push('  iconRight={<ChevronRight />}')
  lines.push('>', '  Get Started', '</Button>')
  return lines.join('\n')
}

export default function ButtonDemo() {
  const [s, setS] = useState<DemoState>({
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    iconLeft: false,
    iconRight: false,
  })

  const set = <K extends keyof DemoState>(k: K, v: DemoState[K]) =>
    setS((prev) => ({ ...prev, [k]: v }))

  const VARIANTS: Variant[] = ['primary', 'secondary', 'ghost', 'destructive']
  const SIZES: Size[] = ['sm', 'md', 'lg']

  const escaped = buildCode(s).replace(/</g, '&lt;').replace(/>/g, '&gt;')

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Live preview + controls */}
      <div className="glass rounded-xl p-6 flex flex-col gap-6">
        <div className="flex-1 flex items-center justify-center min-h-[88px]">
          <DemoButton {...s} label="Get Started" />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">
              variant
            </p>
            <div className="flex flex-wrap gap-1.5">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => set('variant', v)}
                  className={clsx(
                    'text-[11px] px-2.5 py-1 rounded-md font-mono transition-all duration-150',
                    s.variant === v
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/[0.05] text-white/45 hover:text-white',
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">
              size
            </p>
            <div className="flex gap-1.5">
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => set('size', sz)}
                  className={clsx(
                    'text-[11px] px-2.5 py-1 rounded-md font-mono transition-all duration-150',
                    s.size === sz
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/[0.05] text-white/45 hover:text-white',
                  )}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">
              states &amp; slots
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ['loading', 'Loading'],
                  ['disabled', 'Disabled'],
                  ['iconLeft', 'Icon Left'],
                  ['iconRight', 'Icon Right'],
                ] as [keyof DemoState, string][]
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => set(k, !s[k])}
                  className={clsx(
                    'text-[11px] px-2.5 py-1 rounded-md font-mono transition-all duration-150',
                    s[k]
                      ? 'bg-cyan-600/25 text-cyan-300 border border-cyan-500/30'
                      : 'bg-white/[0.05] text-white/45 hover:text-white',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live code panel */}
      <div className="rounded-xl bg-[#0d0d14] border border-white/[0.07] p-4 font-mono text-xs overflow-auto">
        <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          <span className="ml-2 text-white/20 text-[10px]">Button.tsx</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.pre
            key={JSON.stringify(s)}
            className="text-white/55 leading-relaxed whitespace-pre text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12 }}
            aria-label="Component prop code"
            dangerouslySetInnerHTML={{ __html: tokenize(escaped) }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
