import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import HeroCanvas from './HeroCanvas'

// ─── Code token definitions ────────────────────────────────────────────────
// Each token has the raw text and an explicit color.
// Empty color '' falls back to the structural/dim color.
interface CodeToken {
  t: string
  c: string
}

const DIM = 'rgba(209,213,219,0.45)'

const CODE_TOKENS: CodeToken[] = [
  // const Duh = () => {
  { t: 'const', c: '#8B5CF6' },
  { t: ' ', c: DIM },
  { t: 'Duh', c: '#06B6D4' },
  { t: ' = () => {', c: DIM },
  { t: '\n', c: DIM },
  // indent const stack = [
  { t: '  ', c: DIM },
  { t: 'const', c: '#8B5CF6' },
  { t: ' stack = [', c: DIM },
  { t: '\n', c: DIM },
  //   "React", "TypeScript",
  { t: '    ', c: DIM },
  { t: '"React"', c: '#10B981' },
  { t: ', ', c: DIM },
  { t: '"TypeScript"', c: '#10B981' },
  { t: ',', c: DIM },
  { t: '\n', c: DIM },
  //   "CSS/SCSS", "Next.js"
  { t: '    ', c: DIM },
  { t: '"CSS/SCSS"', c: '#10B981' },
  { t: ', ', c: DIM },
  { t: '"Next.js"', c: '#10B981' },
  { t: '\n', c: DIM },
  //  ];
  { t: '  ];', c: DIM },
  { t: '\n\n', c: DIM },
  //  return (
  { t: '  ', c: DIM },
  { t: 'return', c: '#8B5CF6' },
  { t: ' (', c: DIM },
  { t: '\n', c: DIM },
  //    <Engineer
  { t: '    <', c: DIM },
  { t: 'Engineer', c: '#06B6D4' },
  { t: '\n', c: DIM },
  //      experience="5 years"
  { t: '      ', c: DIM },
  { t: 'experience', c: '#F8FAFC' },
  { t: '=', c: DIM },
  { t: '"5 years"', c: '#10B981' },
  { t: '\n', c: DIM },
  //      components={100}
  { t: '      ', c: DIM },
  { t: 'components', c: '#F8FAFC' },
  { t: '={', c: DIM },
  { t: '100', c: '#F59E0B' },
  { t: '}', c: DIM },
  { t: '\n', c: DIM },
  //      stack={stack}
  { t: '      ', c: DIM },
  { t: 'stack', c: '#F8FAFC' },
  { t: '={', c: DIM },
  { t: 'stack', c: '#F8FAFC' },
  { t: '}', c: DIM },
  { t: '\n', c: DIM },
  //      currently="MS CS @ IU"
  { t: '      ', c: DIM },
  { t: 'currently', c: '#F8FAFC' },
  { t: '=', c: DIM },
  { t: '"MS CS @ IU"', c: '#10B981' },
  { t: '\n', c: DIM },
  //      open="Fall 2026 · Full-time 2027"
  { t: '      ', c: DIM },
  { t: 'open', c: '#F8FAFC' },
  { t: '=', c: DIM },
  { t: '"Fall 2026 · Full-time 2027"', c: '#10B981' },
  { t: '\n', c: DIM },
  //    />
  { t: '    />', c: '#06B6D4' },
  { t: '\n', c: DIM },
  //  );
  { t: '  );', c: DIM },
  { t: '\n', c: DIM },
  // };
  { t: '};', c: DIM },
]

const CODE_LEN = CODE_TOKENS.reduce((acc, tok) => acc + tok.t.length, 0)

const HEADLINE = "I've shipped the components you've clicked a thousand times."
const HEADLINE_LEN = HEADLINE.length

// ─── Phase state machine ───────────────────────────────────────────────────
type Phase =
  | 'idle'
  | 'typing-headline'
  | 'cursor-blink'
  | 'show-subtext'
  | 'show-buttons'
  | 'show-card'
  | 'typing-code'
  | 'done'

// ─── Token renderer ────────────────────────────────────────────────────────
function renderTokens(charCount: number): ReactNode[] {
  let remaining = charCount
  const nodes: ReactNode[] = []
  for (let i = 0; i < CODE_TOKENS.length && remaining > 0; i++) {
    const { t, c } = CODE_TOKENS[i]
    const shown = t.slice(0, remaining)
    nodes.push(
      <span key={i} style={{ color: c }}>
        {shown}
      </span>,
    )
    remaining -= t.length
  }
  return nodes
}

// ─── Component ────────────────────────────────────────────────────────────
export default function Hero() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [headlineCount, setHeadlineCount] = useState(0)
  const [codeCount, setCodeCount] = useState(0)

  // Non-typing phase transitions: each phase waits N ms then moves to next
  useEffect(() => {
    const schedule: Partial<Record<Phase, [number, Phase]>> = {
      idle: [800, 'typing-headline'],
      'cursor-blink': [2000, 'show-subtext'],
      'show-subtext': [400, 'show-buttons'],
      'show-buttons': [300, 'show-card'],
      'show-card': [500, 'typing-code'],
    }
    const entry = schedule[phase]
    if (!entry) return
    const [delay, next] = entry
    const t = setTimeout(() => setPhase(next), delay)
    return () => clearTimeout(t)
  }, [phase])

  // Headline typing: 60ms per character
  useEffect(() => {
    if (phase !== 'typing-headline') return
    if (headlineCount < HEADLINE_LEN) {
      const t = setTimeout(() => setHeadlineCount((n) => n + 1), 60)
      return () => clearTimeout(t)
    }
    setPhase('cursor-blink')
  }, [phase, headlineCount])

  // Code typing: 22ms per character
  useEffect(() => {
    if (phase !== 'typing-code') return
    if (codeCount < CODE_LEN) {
      const t = setTimeout(() => setCodeCount((n) => n + 1), 22)
      return () => clearTimeout(t)
    }
    setPhase('done')
  }, [phase, codeCount])

  // Derived visibility flags
  const showCursor = phase === 'typing-headline' || phase === 'cursor-blink'
  const cursorBlinking = phase === 'cursor-blink'
  const showSubtext = phase !== 'idle' && phase !== 'typing-headline' && phase !== 'cursor-blink'
  const showButtons = showSubtext && phase !== 'show-subtext'
  const showCard = showButtons && phase !== 'show-buttons'
  const showCodeCursor = phase === 'typing-code'

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Particle canvas at reduced opacity */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <HeroCanvas />
      </div>

      {/* Left-biased radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 25% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Two-column content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 xl:gap-24 items-center py-28 lg:py-0 min-h-screen">

        {/* ── Left column: headline + subtext + CTAs ── */}
        <div className="flex flex-col">
          {/* Monospace label */}
          <motion.p
            className="font-mono text-cyan-500 text-xs mb-5 tracking-wider"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            aria-hidden="true"
          >
            // frontend engineer
          </motion.p>

          {/* Typing headline */}
          <h1
            className="font-extrabold text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(30px, 3.8vw, 54px)' }}
            aria-label={HEADLINE}
          >
            <span aria-hidden="true">{HEADLINE.slice(0, headlineCount)}</span>
            {/* Blinking cursor */}
            {showCursor && (
              <motion.span
                aria-hidden="true"
                className="inline ml-0.5 text-violet-500 font-light"
                animate={
                  cursorBlinking
                    ? { opacity: [1, 1, 0, 0] }
                    : { opacity: 1 }
                }
                transition={
                  cursorBlinking
                    ? { duration: 0.85, repeat: Infinity, times: [0, 0.45, 0.5, 1] }
                    : {}
                }
              >
                |
              </motion.span>
            )}
          </h1>

          {/* Subtext — fades in after headline */}
          <AnimatePresence>
            {showSubtext && (
              <motion.p
                key="subtext"
                className="text-white/45 text-base leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                Frontend engineer · 5 years Accenture · MS CS @ Indiana University
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTAs — fade up after subtext */}
          <AnimatePresence>
            {showButtons && (
              <motion.div
                key="buttons"
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_28px_rgba(124,58,237,0.45)]"
                >
                  See my work
                  <ArrowDown size={14} aria-hidden="true" />
                </a>
                <a
                  href="/Duhita_Pradhan_Resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/22 font-semibold text-sm transition-all duration-200"
                >
                  <Download size={14} aria-hidden="true" />
                  Download Resume
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right column: floating code card ── */}
        <div className="flex items-center justify-center lg:justify-end">
          <AnimatePresence>
            {showCard && (
              /* Entrance slide-in from right */
              <motion.div
                key="card"
                initial={{ opacity: 0, x: 52 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm lg:max-w-none"
              >
                {/* Idle float loop */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Card */}
                  <motion.div
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: '#0D0D14',
                      border: '1px solid rgba(124,58,237,0.28)',
                      boxShadow: '0 0 40px rgba(124,58,237,0.13), 0 0 0 0 rgba(124,58,237,0)',
                    }}
                    whileHover={{
                      boxShadow:
                        '0 0 60px rgba(124,58,237,0.28), 0 8px 40px rgba(0,0,0,0.4)',
                      borderColor: 'rgba(124,58,237,0.48)',
                    }}
                    transition={{ duration: 0.25 }}
                    role="img"
                    aria-label="Code snippet showing Duh component definition"
                  >
                    {/* macOS title bar */}
                    <div
                      className="flex items-center gap-1.5 px-4 py-3"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: 'rgba(255,95,86,0.75)' }}
                        aria-hidden="true"
                      />
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: 'rgba(255,189,46,0.75)' }}
                        aria-hidden="true"
                      />
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: 'rgba(39,201,63,0.75)' }}
                        aria-hidden="true"
                      />
                      <span className="ml-3 font-mono text-xs text-white/22">duh.tsx</span>
                    </div>

                    {/* Code body */}
                    <div className="px-5 py-4">
                      <pre
                        className="font-mono text-[13px] leading-[1.7]"
                        style={{ whiteSpace: 'pre', overflowX: 'auto' }}
                      >
                        {renderTokens(codeCount)}
                        {/* Typing cursor inside code */}
                        {showCodeCursor && (
                          <motion.span
                            aria-hidden="true"
                            className="inline-block align-text-bottom"
                            style={{
                              width: '2px',
                              height: '1em',
                              background: '#7C3AED',
                              marginLeft: '1px',
                            }}
                            animate={{ opacity: [1, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: 'reverse',
                            }}
                          />
                        )}
                      </pre>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
